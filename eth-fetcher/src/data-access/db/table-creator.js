class TableCreator {
    constructor(pool) {
      this.pool = pool;
    }

    async init(tableSchema) {
      try {
        // Delete table
        await this.pool.query(`DROP TABLE IF EXISTS ${tableSchema.tableName}`);

        // Create table
        await this.pool.query(`CREATE TABLE IF NOT EXISTS ${tableSchema.tableName} (${tableSchema.columns})`);
      } catch (err) {
        console.error(err);
      }
    }

    async createIndex(tableName, columnName) {
      try {
        await this.pool.query(`CREATE INDEX IF NOT EXISTS ${tableName}_${columnName}_index ON ${tableName} (${columnName})`);
      } catch (err) {
        console.error(err);
      }
    }
}
  
module.exports = TableCreator;