import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712440099737 implements MigrationInterface {
    name = 'Init1712440099737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_photo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_photo"`);
    }

}
