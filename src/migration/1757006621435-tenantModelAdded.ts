import { MigrationInterface, QueryRunner } from "typeorm";

export class TenantModelAdded1757006621435 implements MigrationInterface {
    name = 'TenantModelAdded1757006621435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tenant" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "address" character varying(500),
                "phoneNumber" character varying(20),
                "userId" integer,
                "latitude" numeric(10, 7),
                "longitude" numeric(10, 7),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tenant"
            ADD CONSTRAINT "FK_a6719c3ba1ea75a8f255e3e5c7d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tenant" DROP CONSTRAINT "FK_a6719c3ba1ea75a8f255e3e5c7d"
        `);
        await queryRunner.query(`
            DROP TABLE "tenant"
        `);
    }

}
