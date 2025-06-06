import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConsolidateFormEntities1682402000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar nova tabela form_submission
    await queryRunner.query(`
      CREATE TABLE "form_submission" (
        "id" SERIAL PRIMARY KEY,
        "userId" integer NOT NULL,
        "formName" varchar NOT NULL,
        "formData" jsonb NOT NULL,
        "schema" jsonb,
        "uiSchema" jsonb,
        "totalTimeSpent" double precision DEFAULT 0,
        "firstAttemptTime" double precision DEFAULT 0,
        "errorCount" integer DEFAULT 0,
        "codeResets" integer DEFAULT 0,
        "errorDetails" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "submittedAt" TIMESTAMP
      )
    `);

    // Migrar dados existentes
    await queryRunner.query(`
      INSERT INTO "form_submission" (
        "userId", "formName", "formData", "totalTimeSpent", 
        "firstAttemptTime", "submittedAt"
      )
      SELECT 
        "userId", "formName", "formData", "totalTimeSpent",
        "firstAttemptTime", "submittedAt"
      FROM "form_submission_old"
    `);

    // Remover tabelas antigas
    await queryRunner.query(`DROP TABLE IF EXISTS "form_data"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "form_error"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "form_schema"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "form_submission_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recriar tabelas antigas
    await queryRunner.query(`
      CREATE TABLE "form_data" (
        "id" SERIAL PRIMARY KEY,
        "userId" integer NOT NULL,
        "formName" varchar NOT NULL,
        "formData" jsonb NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "form_error" (
        "id" SERIAL PRIMARY KEY,
        "userId" integer NOT NULL,
        "errorType" varchar NOT NULL,
        "formName" varchar NOT NULL,
        "timestamp" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "form_schema" (
        "id" SERIAL PRIMARY KEY,
        "userId" integer NOT NULL,
        "formName" varchar NOT NULL,
        "schema" jsonb NOT NULL,
        "uiSchema" jsonb NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Remover nova tabela
    await queryRunner.query(`DROP TABLE IF EXISTS "form_submission"`);
  }
}
