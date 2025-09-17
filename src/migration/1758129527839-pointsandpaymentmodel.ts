import { MigrationInterface, QueryRunner } from "typeorm";

export class Pointsandpaymentmodel1758129527839 implements MigrationInterface {
    name = 'Pointsandpaymentmodel1758129527839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" SERIAL NOT NULL,
                "amount" numeric(10, 2) NOT NULL,
                "username" character varying NOT NULL,
                "responseData" text,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "points" integer
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
            ALTER TABLE "user" DROP COLUMN "points"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
    }

}
