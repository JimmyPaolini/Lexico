import AdjectiveInflection from "../../../../../entity/dictionary/word/inflection/AdjectiveInflection"
import AdverbInflection from "../../../../../entity/dictionary/word/inflection/AdverbInflection"
import NounInflection from "../../../../../entity/dictionary/word/inflection/NounInflection"
import PrepositionInflection from "../../../../../entity/dictionary/word/inflection/PrepositionInflection"
import Uninflected from "../../../../../entity/dictionary/word/inflection/Uninflected"
import VerbInflection from "../../../../../entity/dictionary/word/inflection/VerbInflection"
import { Inflection } from "../../../graphql/generated"

export default function inflectionToString(
  inflection: Inflection | null | undefined,
  partOfSpeech: string,
): string {
  const isNoun = ["noun", "properNoun"].includes(partOfSpeech)
  const isAdjective = ["adjective", "participle", "numeral", "suffix"].includes(
    partOfSpeech,
  )
  if (isNoun) {
    const declension = (inflection as NounInflection)?.declension
    const gender = (inflection as NounInflection)?.gender
    if (declension && gender) return declension + " declension, " + gender
    if (declension) return declension + " declension"
    if (gender) return gender
  } else if (partOfSpeech === "verb") {
    const conjugation = (inflection as VerbInflection)?.conjugation
    if (conjugation) return conjugation + " conjugation"
  } else if (isAdjective) {
    const declension = (inflection as AdjectiveInflection)?.declension
    const degree = (inflection as AdjectiveInflection)?.degree
    if (declension && degree) return declension + " declension, " + degree
    if (declension) return declension + " declension"
    if (degree) return degree
  } else if (partOfSpeech === "adverb") {
    const type = (inflection as AdverbInflection)?.type
    const degree = (inflection as AdverbInflection)?.degree
    if (type && degree) return type + ", " + degree
    if (type) return type
    if (degree) return degree
  } else if (partOfSpeech === "preposition") {
    const case_ = (inflection as PrepositionInflection)?.case
    return case_
  } else {
    const other = (inflection as Uninflected)?.other
    return other
  }
  return ""
}
