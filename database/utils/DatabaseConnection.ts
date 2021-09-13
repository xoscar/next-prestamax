import { createConnection, getConnection } from 'typeorm';
import User from '../models/User';

const { DB_URL } = process.env;

const closePrevConnection = async (): Promise<void> => {
  try {
    const defaultConnection = getConnection();
    if (defaultConnection) await defaultConnection.close();
  } catch (error) {}
};

await closePrevConnection();

const connection = await createConnection({
  type: 'mongodb',
  url: DB_URL,
  entities: [User],
});

export default class DatabaseConnection {
  static connection = connection;
}
