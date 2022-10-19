import {MigrationInterface, QueryRunner} from "typeorm";

export class CostRelation1666151872324 implements MigrationInterface {
    name = 'CostRelation1666151872324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "costs" DROP COLUMN "subCategoryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "costs" ADD "subCategoryId" uuid NOT NULL`);
    }

}
