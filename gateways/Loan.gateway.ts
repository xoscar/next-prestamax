import Loan, { TPartialLoan } from '../models/Loan.model';
import AuthenticatedClient from './clients/Authenticated.client';

const { post, put, getOne, remove } = AuthenticatedClient<TPartialLoan, TPartialLoan>(
  '/api/clients/{{clientId}}/loans',
);

type LoansClientType = {
  getOne(props: { clientId: string; loanId: string }): Promise<Loan>;
  create(props: { clientId: string; values: TPartialLoan }): Promise<Loan>;
  update(props: { clientId: string; loanId: string; values: TPartialLoan }): Promise<Loan>;
  remove(props: { clientId: string; loanId: string }): Promise<void>;
};

const LoanGateway: LoansClientType = {
  async getOne({ clientId, loanId }) {
    const { json: rawLoan } = await getOne({
      pathParameters: { clientId },
      id: loanId,
    });

    return Loan(rawLoan);
  },
  async create({ clientId, values }) {
    const { json: rawLoan } = await post({
      body: values,
      pathParameters: { clientId },
    });

    return Loan(rawLoan);
  },
  async update({ clientId, loanId, values }) {
    const { json: rawLoan } = await put({
      body: values,
      id: loanId,
      pathParameters: { clientId },
    });

    return Loan(rawLoan);
  },
  async remove({ clientId, loanId }) {
    await remove({
      id: loanId,
      pathParameters: { clientId },
    });

    return;
  },
};

export default LoanGateway;
