import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { AuthorizedNextApiRequest } from '../../../database/interfaces/ICommon';
import { ISerializedUser } from '../../../database/interfaces/IUser';
import UserService from '../../../database/services/UserService';
import { HttpMethods } from '../../../enums/http';
import withApiErrorHandler from '../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedUser>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { username },
      } = req.user;
      const user = await UserService.getUser(username as string);
      return res.status(200).json(user);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
