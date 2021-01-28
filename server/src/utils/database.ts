import { exec } from "child_process"
import { getConnection } from "typeorm"
import { PartOfSpeech } from "../entity/dictionary/word/PartOfSpeech"
import logger from "./log"
import { timestampFormated } from "./string"

const log = logger.getChildLogger()

export const backupFileNameExtension = ".zip"

export async function backupDatabase(name: string) {
  log.info("backing up database")
  const fileKey = `data/backup/${timestampFormated()}_${name}`
  const command = `pg_dump --dbname lexico --format c --compress 9 > "${fileKey}${backupFileNameExtension}"`
  return await execute(command, "backed up database")
}

export async function restoreDatabase(backupName: string) {
  log.info("restoring database")
  const fileKey = `data/backup/${backupName}`
  const command = `pg_restore --dbname lexico --format c --clean "${fileKey}${backupFileNameExtension}"`
  return await execute(command, "restored database")
}

async function execute(command: string, successMessage: string) {
  log.info(command)
  return await new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        log.error(error.message)
        reject(error)
      } else {
        log.info(successMessage)
        resolve(successMessage)
      }
    })
  })
}

export async function createDbViews() {
  await getConnection().query(`
    CREATE OR REPLACE VIEW untranslated AS
    SELECT "word", "partOfSpeech", "principalParts", "inflection", "translation", "forms", "etymology", "pronunciation"
    FROM entry
    LEFT OUTER JOIN translation
    ON (entry."id" = translation."entryId")
    WHERE translation."entryId" IS NULL;`)

  async function createCountView(tableName: string) {
    await getConnection().query(`CREATE OR REPLACE VIEW ${tableName}_count AS
    SELECT count(*) FROM ${tableName}`)
  }

  await createCountView("entry")
  await createCountView("word")
  await createCountView("translation")
  await createCountView("author")
  await createCountView("book")
  await createCountView("text")
  await createCountView("line")

  async function createPartOfSpeechView(partOfSpeech: PartOfSpeech) {
    await getConnection().query(`CREATE OR REPLACE VIEW ${partOfSpeech} AS
    SELECT * FROM entry WHERE "partOfSpeech"='${partOfSpeech}'`)
  }

  await createPartOfSpeechView("noun")
  await createPartOfSpeechView("verb")
  await createPartOfSpeechView("adjective")
  await createPartOfSpeechView("adverb")

  async function createCountsView(
    name: string,
    selector: string,
    table: string,
    groupBy: string,
  ) {
    await getConnection().query(
      `CREATE OR REPLACE VIEW ${name}_counts AS ` +
        `SELECT ${selector}, ` +
        `COUNT(DISTINCT(word)) as count, ` +
        `COUNT(DISTINCT(word)) / (SELECT COUNT(*) FROM ${table})::float * 100 as percent ` +
        `FROM ${table} GROUP BY ${groupBy}`,
    )
  }

  await createCountsView(
    "part_of_speech",
    '"partOfSpeech"',
    "entry",
    '"partOfSpeech"',
  )
  await createCountsView(
    "entry_letter",
    "LOWER(LEFT(word, 1)) as letter",
    "entry",
    "LOWER(LEFT(word, 1))",
  )
  await createCountsView(
    "word_letter",
    "LOWER(LEFT(word, 1)) as letter",
    "word",
    "LOWER(LEFT(word, 1))",
  )
}
