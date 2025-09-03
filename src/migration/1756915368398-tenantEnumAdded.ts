import { MigrationInterface, QueryRunner } from "typeorm";

export class TenantEnumAdded1756915368398 implements MigrationInterface {
    name = 'TenantEnumAdded1756915368398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."user_usertype_enum"
            RENAME TO "user_usertype_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_usertype_enum" AS ENUM('admin', 'customer', 'tenant')
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "userType" TYPE "public"."user_usertype_enum" USING "userType"::"text"::"public"."user_usertype_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_usertype_enum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_usertype_enum_old" AS ENUM('admin', 'customer')
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "userType" TYPE "public"."user_usertype_enum_old" USING "userType"::"text"::"public"."user_usertype_enum_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_usertype_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."user_usertype_enum_old"
            RENAME TO "user_usertype_enum"
        `);
    }

}
