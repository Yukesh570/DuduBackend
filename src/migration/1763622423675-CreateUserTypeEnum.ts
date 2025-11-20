import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTypeEnum1763622423675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the enum type in PostgreSQL
        await queryRunner.query(`
            CREATE TYPE "public"."user_usertype_enum" AS ENUM('admin', 'customer', 'tenant', 'merchant');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the enum type on rollback
        await queryRunner.query(`
            DROP TYPE "public"."user_usertype_enum";
        `);
    }
}
