import { MigrationInterface, QueryRunner } from "typeorm";

export class EntityMigration1723468141277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `product` ADD `customFieldsFeaturedreviewid` int NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `product` ADD `customFieldsReviewrating` double NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `product` ADD `customFieldsReviewcount` double NULL DEFAULT '0'",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `product` ADD CONSTRAINT `FK_49d195dd5e613abc1e210127a2e` FOREIGN KEY (`customFieldsFeaturedreviewid`) REFERENCES `product_review`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `product` DROP FOREIGN KEY `FK_49d195dd5e613abc1e210127a2e`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `product` DROP COLUMN `customFieldsReviewcount`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `product` DROP COLUMN `customFieldsReviewrating`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `product` DROP COLUMN `customFieldsFeaturedreviewid`",
      undefined,
    );
  }
}
