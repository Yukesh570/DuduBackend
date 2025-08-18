import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUpadateInCart1755544507464 implements MigrationInterface {
    name = 'RemoveUpadateInCart1755544507464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "updatedAt"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

}
