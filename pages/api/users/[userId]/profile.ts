import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import UserService from '../../../../server/repositories/User.repository';
import { HttpMethods } from '../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../../../server/types/Common.types';
import User from '../../../../models/User.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<User>,
): Promise<void> => {
  const {
    payload: { username },
  } = req.auth;

  switch (req.method) {
    case HttpMethods.GET: {
      const user = await UserService.getUser(username as string);
      return res.status(200).json(user);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
