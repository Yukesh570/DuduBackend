import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusAddedToPayemnt1758386553899 implements MigrationInterface {
    name = 'StatusAddedToPayemnt1758386553899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."payment_status_enum" AS ENUM('failed', 'success')
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "status" "public"."payment_status_enum" NOT NULL DEFAULT 'failed'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."payment_status_enum"
        `);
    }

}
