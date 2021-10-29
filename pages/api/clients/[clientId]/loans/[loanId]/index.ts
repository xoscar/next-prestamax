import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { AuthorizedNextApiRequest } from '../../../../../../database/interfaces/ICommon';
import { ISerializedLoan } from '../../../../../../database/interfaces/ILoan';
import ClientService from '../../../../../../database/services/ClientService';
import LoanService from '../../../../../../database/services/LoanService';
import LoanViewModel, { LoanResult } from '../../../../../../database/viewModel/LoanViewModel';
import { HttpMethods } from '../../../../../../enums/http';
import withApiErrorHandler from '../../../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedLoan | Array<ISerializedLoan> | LoanResult>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const { loanId } = req.query;
      const loan = await LoanService.getLoan(id?.toString() as string, loanId as string);
      const client = await LoanViewModel.getClientForLoan(loan);

      return res.status(200).json({ ...loan.serialize(), client: client.serialize() });
    }

    case HttpMethods.PUT: {
      const {
        payload: { id },
      } = req.user;
      const { loanId, clientId } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      const loan = await LoanService.updateLoan(client, loanId as string, req.body);

      return res.status(200).json({ ...loan.serialize(), client: client.serialize() });
    }

    case HttpMethods.DELETE: {
      const {
        payload: { id },
      } = req.user;
      const { clientId, loanId } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      await LoanService.deleteLoan(client.user_id?.toString() as string, loanId as string);

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
