import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('SubjunctivePersonInput')
export class SubjunctivePerson {
  @Field(() => [String], { nullable: true })
  first: string[] = []

  @Field(() => [String], { nullable: true })
  second: string[] = []

  @Field(() => [String], { nullable: true })
  third: string[] = []
}

@ObjectType()
@InputType('SubjunctiveNumberInput')
export class SubjunctiveNumber {
  @Field(() => SubjunctivePerson, { nullable: true })
  singular: SubjunctivePerson = new SubjunctivePerson()

  @Field(() => SubjunctivePerson, { nullable: true })
  plural: SubjunctivePerson = new SubjunctivePerson()
}

@ObjectType()
@InputType('SubjunctiveTenseInput')
export class SubjunctiveTense {
  @Field(() => SubjunctiveNumber, { nullable: true })
  'present': SubjunctiveNumber = new SubjunctiveNumber()

  @Field(() => SubjunctiveNumber, { nullable: true })
  'imperfect': SubjunctiveNumber = new SubjunctiveNumber()

  @Field(() => SubjunctiveNumber, { nullable: true })
  'perfect': SubjunctiveNumber = new SubjunctiveNumber()

  @Field(() => SubjunctiveNumber, { nullable: true })
  'pluperfect': SubjunctiveNumber = new SubjunctiveNumber()
}

@ObjectType()
@InputType('SubjunctiveInput')
export default class Subjunctive {
  @Field(() => SubjunctiveTense, { nullable: true })
  active: SubjunctiveTense = new SubjunctiveTense()

  @Field(() => SubjunctiveTense, { nullable: true })
  passive: SubjunctiveTense = new SubjunctiveTense()
}
