import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionIdAdded1758219146862 implements MigrationInterface {
    name = 'TransactionIdAdded1758219146862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "responseData" TO "transactionId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME COLUMN "transactionId" TO "responseData"
        `);
    }

}
