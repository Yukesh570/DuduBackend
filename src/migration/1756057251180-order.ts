import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1756057251180 implements MigrationInterface {
    name = 'Order1756057251180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "estimatedDeliveryDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
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
                'Returned'
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
            CREATE TYPE "public"."order_status_enum_old" AS ENUM('Pending', 'Shipped', 'Delivered')
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
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "estimatedDeliveryDate"
        `);
    }

}
