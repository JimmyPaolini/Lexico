import { Field, ObjectType } from "type-graphql"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import Book from "./Book"
import Text from "./Text"

@Entity()
@ObjectType()
export default class Author {
  @PrimaryColumn("varchar", { length: 64 })
  @Field()
  name!: string

  @Column("varchar", { length: 64 })
  @Field()
  nickname!: string

  @Column("date", { nullable: true })
  @Field(() => Date, { nullable: true })
  birthDate?: Date

  @Column("date", { nullable: true })
  @Field(() => Date, { nullable: true })
  deathDate?: Date

  @Column("varchar", { length: 2047, nullable: true })
  @Field({ nullable: true })
  biography?: string

  @OneToMany(() => Text, (work) => work.author, {
    cascade: true,
  })
  @Field(() => [Text])
  texts: Text[]

  @OneToMany(() => Book, (book) => book.author, {
    cascade: true,
  })
  @Field(() => [Book])
  books: Book[]
}
