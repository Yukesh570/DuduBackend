import { MigrationInterface, QueryRunner } from "typeorm";

export class Usernametouserid1758213122792 implements MigrationInterface {
    name = 'Usernametouserid1758213122792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "username" TO "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "userId" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "userId" TO "username"
        `);
    }

}
