import Payment, { TPartialPayment } from '../models/Payment.model';
import AuthenticatedClient from './clients/Authenticated.client';

const { post, remove, put } = AuthenticatedClient<TPartialPayment, TPartialPayment>(
  '/api/clients/{{clientId}}/loans/{{loanId}}/payments',
);

type TPaymentGateway = {
  create(props: { clientId: string; loanId: string; values: TPartialPayment }): Promise<Payment>;
  update(props: {
    clientId: string;
    loanId: string;
    paymentId: string;
    values: TPartialPayment;
  }): Promise<Payment>;
  remove(props: { clientId: string; loanId: string; paymentId: string }): Promise<void>;
};

const PaymentGateway: TPaymentGateway = {
  async create({ clientId, loanId, values }) {
    const { json: rawPayment } = await post({
      body: values,
      pathParameters: { loanId, clientId },
    });

    return Payment(rawPayment);
  },
  async update({ clientId, loanId, paymentId, values }) {
    const { json: rawPayment } = await put({
      body: values,
      pathParameters: { clientId, loanId },
      id: paymentId,
    });

    return Payment(rawPayment);
  },
  async remove({ clientId, loanId, paymentId }) {
    await remove({
      pathParameters: { clientId, loanId },
      id: paymentId,
    });

    return;
  },
};

export default PaymentGateway;
