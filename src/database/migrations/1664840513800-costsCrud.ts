import {MigrationInterface, QueryRunner} from "typeorm";

export class costsCrud1664840513800 implements MigrationInterface {
    name = 'costsCrud1664840513800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "costs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "date" text NOT NULL, "value" integer NOT NULL, "subCategoryId" uuid NOT NULL, CONSTRAINT "PK_05cc8aa05396a72553cdff6d5be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "costs" ADD CONSTRAINT "FK_82357374028c4459b54638c2499" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "costs" DROP CONSTRAINT "FK_82357374028c4459b54638c2499"`);
        await queryRunner.query(`DROP TABLE "costs"`);
    }

}
