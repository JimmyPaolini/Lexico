import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('VerbInflectionInput')
export default class VerbInflection {
  @Field()
  conjugation: VerbConjugation = ''

  @Field()
  other?: string = ''

  constructor(conjugation: VerbConjugation = '', other = '') {
    this.conjugation = conjugation
    this.other = other
  }
}

export type VerbConjugation =
  | 'first'
  | 'second'
  | 'third'
  | 'third-io'
  | 'fourth'
  | ''
export const verbConjugationRegex =
  /(first)|(second)|(third)|(third-io)|(fourth)/
