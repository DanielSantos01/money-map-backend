import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserAddMoney1664925725301 implements MigrationInterface {
    name = 'fixUserAddMoney1664925725301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "money" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "money"`);
    }

}
