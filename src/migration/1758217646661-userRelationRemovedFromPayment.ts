import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRelationRemovedFromPayment1758217646661 implements MigrationInterface {
    name = 'UserRelationRemovedFromPayment1758217646661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "userId" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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

}
