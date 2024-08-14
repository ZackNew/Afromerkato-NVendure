import {MigrationInterface, QueryRunner} from "typeorm";

export class Bbfty1723618306832 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `quote` DROP COLUMN `code`", undefined);
        await queryRunner.query("ALTER TABLE `quote` ADD `uuid` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `quote` ADD `fullName` varchar(40) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `quote` ADD `userEmail` varchar(40) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `quote` ADD `fromPhone` varchar(15) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `quote` ADD `assetUrl` varchar(300) NOT NULL DEFAULT ''", undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `quote` DROP COLUMN `assetUrl`", undefined);
        await queryRunner.query("ALTER TABLE `quote` DROP COLUMN `fromPhone`", undefined);
        await queryRunner.query("ALTER TABLE `quote` DROP COLUMN `userEmail`", undefined);
        await queryRunner.query("ALTER TABLE `quote` DROP COLUMN `fullName`", undefined);
        await queryRunner.query("ALTER TABLE `quote` DROP COLUMN `uuid`", undefined);
        await queryRunner.query("ALTER TABLE `quote` ADD `code` varchar(255) NOT NULL", undefined);
   }

}
