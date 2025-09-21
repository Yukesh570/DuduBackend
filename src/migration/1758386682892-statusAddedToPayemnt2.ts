import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusAddedToPayemnt21758386682892 implements MigrationInterface {
    name = 'StatusAddedToPayemnt21758386682892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "status" TO "paymentstatus"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."payment_status_enum"
            RENAME TO "payment_paymentstatus_enum"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."payment_paymentstatus_enum"
            RENAME TO "payment_status_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "paymentstatus" TO "status"
        `);
    }

}
