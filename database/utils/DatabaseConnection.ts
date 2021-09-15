import { createConnection, getConnection } from 'typeorm';
import Charge from '../models/Charge';
import Client from '../models/Client';
import Counter from '../models/Counter';
import Loan from '../models/Loan';
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
  entities: [User, Client, Loan, Charge, Counter],
});

export default class DatabaseConnection {
  static connection = connection;
}
