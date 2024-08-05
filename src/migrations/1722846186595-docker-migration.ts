import {MigrationInterface, QueryRunner} from "typeorm";

export class DockerMigration1722846186595 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `authentication_method` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `authentication_method` ADD CONSTRAINT `FK_00cbe87bc0d4e36758d61bd31d6` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `authentication_method` DROP FOREIGN KEY `FK_00cbe87bc0d4e36758d61bd31d6`", undefined);
        await queryRunner.query("ALTER TABLE `authentication_method` DROP COLUMN `id`", undefined);
   }

}
