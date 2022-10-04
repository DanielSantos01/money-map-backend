import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUser1664671858422 implements MigrationInterface {
    name = 'fixUser1664671858422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePic" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePic"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text NOT NULL`);
    }

}
