import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTenantImage1760966930128 implements MigrationInterface {
    name = 'AddedTenantImage1760966930128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tenant_image" (
                "id" SERIAL NOT NULL,
                "image" character varying,
                "tenantId" integer,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d503119afaf438037ba9fcd7e76" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tenant_image"
            ADD CONSTRAINT "FK_fdd0ee0c64b32e87d02dfec0bd9" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tenant_image" DROP CONSTRAINT "FK_fdd0ee0c64b32e87d02dfec0bd9"
        `);
        await queryRunner.query(`
            DROP TABLE "tenant_image"
        `);
    }

}
