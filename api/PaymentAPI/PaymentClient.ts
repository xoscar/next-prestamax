import Payment, { RawPaymentType, FormDataPaymentType } from '../../records/Payment';
import AuthenticatedClient from '../AuthenticatedClient';

const { get, post, remove, put } = AuthenticatedClient<FormDataPaymentType, RawPaymentType>(
  '/api/clients/{{clientId}}/loans/{{loanId}}/payments',
);

type PaymentClientType = {
  get(loanId: string): Promise<Array<Payment>>;
  create(clientId: string, loanId: string, values: FormDataPaymentType): Promise<Payment>;
  update(
    clientId: string,
    loanId: string,
    paymentId: string,
    values: FormDataPaymentType,
  ): Promise<Payment>;
  remove(clientId: string, loanId: string, paymentId: string): Promise<void>;
};

const PaymentClient: PaymentClientType = {
  async get(loanId) {
    const { json: paymentList } = await get<Array<RawPaymentType>>({
      pathParameters: { loanId },
    });

    return paymentList.map((rawPayment) => Payment.createFromRaw(rawPayment));
  },
  async create(clientId, loanId, values) {
    const { json: rawPayment } = await post({
      body: values,
      pathParameters: { loanId, clientId },
    });

    return Payment.createFromRaw(rawPayment);
  },
  async update(clientId, loanId, paymentId, values) {
    const { json: rawPayment } = await put({
      body: values,
      pathParameters: { clientId, loanId },
      id: paymentId,
    });

    return Payment.createFromRaw(rawPayment);
  },
  async remove(clientId, loanId, paymentId) {
    await remove({
      pathParameters: { clientId, loanId },
      id: paymentId,
    });

    return;
  },
};

export default PaymentClient;
