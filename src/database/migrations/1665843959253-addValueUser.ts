import {MigrationInterface, QueryRunner} from "typeorm";

export class addValueUser1665843959253 implements MigrationInterface {
    name = 'addValueUser1665843959253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "value" numeric DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "value"`);
    }

}
