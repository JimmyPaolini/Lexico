import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { getConnection } from 'typeorm'

import log from '../../../utils/log'
import fetchFacebookUser from '../authentication/facebook'
import fetchGoogleUser from '../authentication/google'
import { Authenticate } from '../authentication/middleware'
import { createAccessToken } from '../authentication/token'
import User from '../entity/user/User'
import { ResolverContext } from '../utils/ResolverContext'

@Resolver(User)
export default class AuthenticationResolver {
  Users = getConnection().getRepository(User)

  @Query(() => User)
  async google(
    @Arg('code') code: string,
    @Ctx() { req, res }: ResolverContext,
  ): Promise<User> {
    const profile = await fetchGoogleUser(code, req.hostname)
    let user = await this.Users.findOne({ googleId: profile.id })
    if (!user) {
      user = await this.Users.save({
        googleId: profile.id,
        email: profile.email,
      })
    }
    log.info('login google user', user)
    res.cookie('accessToken', createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => User)
  async facebook(
    @Arg('code') code: string,
    @Ctx() { req, res }: ResolverContext,
  ): Promise<User> {
    const profile = await fetchFacebookUser(code, req.hostname)
    let user = await this.Users.findOne({ facebookId: profile.id })
    if (!user) {
      user = await this.Users.save({
        facebookId: profile.id,
        email: profile.email,
      })
    }
    log.info('login facebook user', user)
    res.cookie('accessToken', createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => Boolean)
  @UseMiddleware(Authenticate)
  logout(@Ctx() { user, res }: ResolverContext): boolean {
    log.info('logout user', user)
    res.clearCookie('accessToken')
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unregister(@Ctx() { user }: ResolverContext): Promise<boolean> {
    await this.Users.delete(user.id)
    log.info('unregister user', user)
    return true
  }
}
