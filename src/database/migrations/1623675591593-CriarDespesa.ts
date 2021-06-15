import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CriarDespesa1623675591593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'despesas',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: 'id_responsavel',
                        type: 'uuid'
                    },
                    {
                        name: 'data_compra',
                        type: 'Date'
                    },
                    {
                        name: 'local_compra',
                        type: 'varchar'
                    },
                    {
                        name: 'valor',
                        type: 'number'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKResponsavel',
                        referencedTableName: 'responsaveis',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_responsavel'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('despesas')
    }

}
