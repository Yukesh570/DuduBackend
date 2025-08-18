import { MigrationInterface, QueryRunner } from "typeorm";

export class New1755537762422 implements MigrationInterface {
    name = 'New1755537762422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "service" (
                "id" SERIAL NOT NULL,
                "image" character varying NOT NULL,
                "name" character varying NOT NULL,
                "order" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."product_category_enum" AS ENUM(
                'Delivery',
                'Shop',
                'Games',
                'Food',
                'Job',
                'Home',
                'LiHaMoto',
                'BuySell'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL,
                "image" character varying NOT NULL,
                "video" character varying NOT NULL,
                "name" character varying NOT NULL,
                "category" "public"."product_category_enum" NOT NULL,
                "description" character varying NOT NULL,
                "order" integer NOT NULL,
                "price" integer NOT NULL,
                "rate" integer NOT NULL,
                "count" integer NOT NULL,
                "type" character varying,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "serviceId" integer,
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying,
                "password" character varying,
                "userType" "public"."user_usertype_enum" NOT NULL,
                "phoneNumber" character varying,
                "address" character varying,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "id" SERIAL NOT NULL,
                "quantity" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "productId" integer,
                "userId" integer,
                CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "productName" character varying NOT NULL,
                "productId" integer NOT NULL,
                "quantity" integer NOT NULL DEFAULT '1',
                "price" numeric(10, 2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "advertise" (
                "id" SERIAL NOT NULL,
                "video" character varying NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_948362c417031b4fb02314da6c2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_87a0fc4290ef89ae946b4efb5f5" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_87a0fc4290ef89ae946b4efb5f5"
        `);
        await queryRunner.query(`
            DROP TABLE "advertise"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "product"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."product_category_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "service"
        `);
    }

}
