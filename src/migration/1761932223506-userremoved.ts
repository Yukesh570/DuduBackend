import { MigrationInterface, QueryRunner } from "typeorm";

export class Userremoved1761932223506 implements MigrationInterface {
    name = 'Userremoved1761932223506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "userId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
