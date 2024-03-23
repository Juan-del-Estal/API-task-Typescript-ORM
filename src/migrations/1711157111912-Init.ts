import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1711157111912 implements MigrationInterface {
    name = 'Init1711157111912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
    }
}
