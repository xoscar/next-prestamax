import { flow } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import LoginService from '../../server/services/Login.service';
import { HttpMethods } from '../../constants/Http.constants';
import withApiErrorHandler from '../../server/middlewares/ErrorHandler.midleware';
import User from '../../models/User.model';

const handler = async (req: NextApiRequest, res: NextApiResponse<User>): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const { username = '', password = '' } = req.body;
      const user = await LoginService.login(username, password);

      return res.status(200).json(user);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withApiErrorHandler)(handler);
