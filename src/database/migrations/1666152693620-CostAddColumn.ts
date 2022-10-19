import {MigrationInterface, QueryRunner} from "typeorm";

export class CostAddColumn1666152693620 implements MigrationInterface {
    name = 'CostAddColumn1666152693620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "costs" ADD "subcategoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "costs" ADD CONSTRAINT "UQ_5d184fb1fb06a0e0e42115f1027" UNIQUE ("subcategoryId")`);
        await queryRunner.query(`ALTER TABLE "costs" ADD CONSTRAINT "FK_5d184fb1fb06a0e0e42115f1027" FOREIGN KEY ("subcategoryId") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "costs" DROP CONSTRAINT "FK_5d184fb1fb06a0e0e42115f1027"`);
        await queryRunner.query(`ALTER TABLE "costs" DROP CONSTRAINT "UQ_5d184fb1fb06a0e0e42115f1027"`);
        await queryRunner.query(`ALTER TABLE "costs" DROP COLUMN "subcategoryId"`);
    }

}
