import { MigrationInterface, QueryRunner } from "typeorm";

export class Paymentmethodadded1758129723790 implements MigrationInterface {
    name = 'Paymentmethodadded1758129723790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "userId" TO "paymentMethod"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "paymentMethod"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "paymentMethod" character varying(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "paymentMethod"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "paymentMethod" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "paymentMethod" TO "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
