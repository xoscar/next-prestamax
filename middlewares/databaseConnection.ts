import { NextApiRequest, NextApiResponse } from 'next';
import DatabaseConnection from '../database/utils/DatabaseConnection';

interface IHandlerFunction {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

interface IWithErrorHandler {
  (handler: IHandlerFunction): IHandlerFunction;
}

const withDatabaseConnection: IWithErrorHandler = (handler) => async (req, res) => {
  if (!DatabaseConnection.connection.isConnected) {
    await DatabaseConnection.connection.connect();
  }

  await handler(req, res);
};

export default withDatabaseConnection;
