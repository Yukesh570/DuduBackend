import { MigrationInterface, QueryRunner } from "typeorm";

export class EnumChanges1756567259594 implements MigrationInterface {
    name = 'EnumChanges1756567259594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."order_status_enum"
            RENAME TO "order_status_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."order_status_enum" AS ENUM(
                'OrderPlaced',
                'Confirmed',
                'Shipped',
                'Delivered',
                'Cancelled',
                'Pending'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."order_status_enum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."order_status_enum_old" AS ENUM(
                'OrderPlaced',
                'Confirmed',
                'Shipped',
                'Delivered',
                'Cancelled',
                'Returned'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."order_status_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."order_status_enum_old"
            RENAME TO "order_status_enum"
        `);
    }

}
