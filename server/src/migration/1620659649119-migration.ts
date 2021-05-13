import { MigrationInterface, QueryRunner } from "typeorm"

export class migration1620659649119 implements MigrationInterface {
  name = "migration1620659649119"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_27e6453195447c82a011c91d570"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "PK_42f233d32109ddba4b884cd603c" PRIMARY KEY ("entryId")`,
    )
    await queryRunner.query(`DROP INDEX "IDX_27e6453195447c82a011c91d57"`)
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD "userId" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "PK_42f233d32109ddba4b884cd603c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0" PRIMARY KEY ("entryId", "userId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "PK_7e5d2f6ab6d9d793221c88afb08"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "PK_7cec9ae62a9f8c83075e875159f" PRIMARY KEY ("lineId")`,
    )
    await queryRunner.query(`DROP INDEX "IDX_f74849fbd710f0f7528d6e549c"`)
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD "userId" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "PK_7cec9ae62a9f8c83075e875159f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "PK_7e5d2f6ab6d9d793221c88afb08" PRIMARY KEY ("lineId", "userId")`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27e6453195447c82a011c91d57" ON "user_bookmarks_entry" ("userId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f74849fbd710f0f7528d6e549c" ON "user_readings_line" ("userId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_27e6453195447c82a011c91d570" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_27e6453195447c82a011c91d570"`,
    )
    await queryRunner.query(`DROP INDEX "IDX_f74849fbd710f0f7528d6e549c"`)
    await queryRunner.query(`DROP INDEX "IDX_27e6453195447c82a011c91d57"`)
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "PK_7e5d2f6ab6d9d793221c88afb08"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "PK_7cec9ae62a9f8c83075e875159f" PRIMARY KEY ("lineId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD "userId" integer NOT NULL`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f74849fbd710f0f7528d6e549c" ON "user_readings_line" ("userId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "PK_7cec9ae62a9f8c83075e875159f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "PK_7e5d2f6ab6d9d793221c88afb08" PRIMARY KEY ("lineId", "userId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "PK_42f233d32109ddba4b884cd603c" PRIMARY KEY ("entryId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD "userId" integer NOT NULL`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27e6453195447c82a011c91d57" ON "user_bookmarks_entry" ("userId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "PK_42f233d32109ddba4b884cd603c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0" PRIMARY KEY ("entryId", "userId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_27e6453195447c82a011c91d570" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }
}
