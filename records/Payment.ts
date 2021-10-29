import { Record } from 'immutable';

export type RawPaymentType = {
  id: string;
  amount: number;
  created: string;
};

export type PaymentType = {
  id: string;
  amount: number;
  created: Date;
};

const defaultValues: PaymentType = {
  id: '',
  amount: 0,
  created: new Date(),
};

export type FormDataPaymentType = {
  amount: number;
  created: Date;
};

class Payment extends Record<PaymentType>(defaultValues) {
  static createFromRaw(rawPayment: RawPaymentType): Payment {
    const { created } = rawPayment;

    return new this({
      ...rawPayment,
      created: new Date(created),
    });
  }
}

export default Payment;
