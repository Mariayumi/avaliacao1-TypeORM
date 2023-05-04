import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683201267241 implements MigrationInterface {
    name = 'Default1683201267241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_host_id"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_visitor_id"`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_host_id" FOREIGN KEY ("idhost") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idvisitor") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_visitor_id"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_host_id"`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idvisitor") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_host_id" FOREIGN KEY ("idhost") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
