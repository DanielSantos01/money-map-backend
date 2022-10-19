import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAddHidedPassword1666153187047 implements MigrationInterface {
    name = 'UserAddHidedPassword1666153187047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "hidedPassword" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hidedPassword"`);
    }

}
