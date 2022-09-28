import 'dotenv/config';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import getConnection from '@jest/globals';

class DatabaseConnection {
  private connection: Connection | null = null;

  private options: ConnectionOptions;

  constructor(options: ConnectionOptions) {
    this.options = options;
  }

  async create(): Promise<Connection> {
    try {
      const connection = await createConnection(this.options);
      await connection.synchronize();
      this.connection = connection;

      return this.connection;
    } catch (error) {
      throw new Error(
        'Error: could not connect to database. Make sure you are running docker-compose',
      );
    }
  }

  async close() {
    await this.connection?.close();
  }

  async clear() {
    const entities = this.connection?.entityMetadatas;

    if (!entities) {
      return;
    }

    await Promise.all(
      entities.map(async (entity) => {
        const repository = this.connection?.getRepository(entity.name);
        await repository?.query(`DELETE FROM "${entity.tableName}"`);
      }),
    );
  }

  async get() {
    return getConnection();
  }
}

export { DatabaseConnection };
