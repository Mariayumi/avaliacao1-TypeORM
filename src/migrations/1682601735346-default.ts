import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1682601735346 implements MigrationInterface {
    name = 'Default1682601735346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "matches" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "matches"`);
    }

}
