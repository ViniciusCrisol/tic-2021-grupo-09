import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccountsTable1616337910999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_name',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'user_email',
            type: 'varchar',
            length: '60',
            isUnique: true,
          },
          {
            name: 'account_name',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'password_hash',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'inserted_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts');
  }
}
