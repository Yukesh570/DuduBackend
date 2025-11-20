import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTypeEnum1650000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_usertype_enum" AS ENUM(
                'admin',
                'customer',
                'tenant',
                'merchant'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TYPE "public"."user_usertype_enum";
        `);
    }
}
