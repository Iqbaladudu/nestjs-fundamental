import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactorings1647726704750 implements MigrationInterface {
    name = 'PostRefactorings1647726704750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "brands" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "brands"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "brand" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "title" character varying NOT NULL`);
    }

}
