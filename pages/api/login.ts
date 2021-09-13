import { flow } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import UserService, { ILoginUserResponse } from '../../database/services/UserService';
import withDatabaseConnection from '../../middlewares/databaseConnection';
import withApiErrorHandler from '../../middlewares/errorHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ILoginUserResponse>,
): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      const user = await UserService.login(req.body);

      return res.status(200).json(user);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

  return Promise.resolve();
};

export default flow(withApiErrorHandler, withDatabaseConnection)(handler);
