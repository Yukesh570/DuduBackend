import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderItems1755540988766 implements MigrationInterface {
    name = 'OrderItems1755540988766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "order_item" (
                "id" SERIAL NOT NULL,
                "quantity" integer NOT NULL DEFAULT '1',
                "price" numeric(10, 2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "orderId" integer,
                "productId" integer,
                CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "productName"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "productId"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "quantity"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."order_status_enum" AS ENUM('Pending', 'Shipped', 'Delivered')
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "status" "public"."order_status_enum" NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."order_status_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "quantity" integer NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "productId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "productName" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "order_item"
        `);
    }

}
