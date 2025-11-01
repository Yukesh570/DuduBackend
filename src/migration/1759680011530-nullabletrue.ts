import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullabletrue1759680011530 implements MigrationInterface {
    name = 'Nullabletrue1759680011530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "image" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "video" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "video"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "image"
            SET NOT NULL
        `);
    }

}
