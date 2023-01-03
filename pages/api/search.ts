import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { HttpMethods } from '../../constants/Http.constants';
import withApiErrorHandler from '../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../server/types/Common.types';
import Loan from '../../models/Loan.model';
import Client from '../../models/Client.model';
import SearchService from '../../server/services/Search.service';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Loan[] | Client[]>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.auth;

      const loanList = await SearchService.search(id, req.query);

      return res.status(200).json(loanList);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
