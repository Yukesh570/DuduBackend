import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductidsInPayment1758212602783 implements MigrationInterface {
    name = 'ProductidsInPayment1758212602783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "productIds" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "productIds"
        `);
    }

}
