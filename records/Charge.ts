import { Record } from 'immutable';

export type RawChargeType = {
  id: string;
  amount: number;
  description: string;
  paid: boolean;
  created: string;
  paid_date: string;
  expiration_date: string;
};

export type ChargeType = {
  id: string;
  amount: number;
  description: string;
  paid: boolean;
  created: Date;
  paid_date: Date;
  expiration_date: Date;
};

const defaultValues: ChargeType = {
  id: '',
  amount: 0,
  description: '',
  paid: false,
  created: new Date(),
  paid_date: new Date(),
  expiration_date: new Date(),
};

export type FormDataChargeType = {
  amount: number;
  description: string;
  expiration_date: string;
};

class Charge extends Record<ChargeType>(defaultValues) {
  static createFromRaw(rawCharge: RawChargeType): Charge {
    const { created, paid_date, expiration_date } = rawCharge;

    return new this({
      ...rawCharge,
      created: new Date(created),
      paid_date: new Date(paid_date),
      expiration_date: new Date(expiration_date),
    });
  }
}

export default Charge;
