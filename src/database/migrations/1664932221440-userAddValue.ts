import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddValue1664932221440 implements MigrationInterface {
    name = 'userAddValue1664932221440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "money" TO "value"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "value" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "value" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "value" TO "money"`);
    }

}
