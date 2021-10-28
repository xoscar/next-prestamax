import { Record } from 'immutable';

export type RawClientStatsType = {
  active_loans: number;
  active_charges: number;
  loans_debt: number;
  total_debt: number;
  expired_loans: boolean;
  last_loan?: string;
  last_payment?: string;
};

export type ClientStatsType = {
  active_loans: number;
  active_charges: number;
  loans_debt: number;
  total_debt: number;
  expired_loans: boolean;
  last_loan?: Date;
  last_payment?: Date;
};

export type ClientType = {
  id?: string;
  user_id?: string;
  name: string;
  surname: string;
  created: Date;
  updated: Date;
  address: string;
  phone: string;
  client_id: string;

  stats: ClientStatsType;
};

export type RawClientType = {
  id?: string;
  user_id?: string;
  name: string;
  surname: string;
  created: string;
  updated: string;
  address: string;
  phone: string;
  client_id: string;

  stats: RawClientStatsType;
};

export type FormDataClientType = {
  name: string;
  address: string;
  surname: string;
  phone: string;
};

const defaultValues = {
  id: '',
  user_id: '',
  name: '',
  surname: '',
  created: new Date(),
  updated: new Date(),
  address: '',
  phone: '',
  client_id: '',

  stats: {
    active_loans: 0,
    active_charges: 0,
    loans_debt: 0,
    total_debt: 0,
    expired_loans: false,
    last_loan: undefined,
    last_payment: undefined,
  },
};

class Client extends Record<ClientType>(defaultValues) {
  static createFromRawSearch(rawClient: RawClientType): Client {
    const { created, updated, stats } = rawClient;

    return new this({
      ...rawClient,
      created: new Date(created),
      updated: new Date(updated),
      stats: stats ? this.createStatsFromRaw(stats) : undefined,
    });
  }

  private static createStatsFromRaw(rawStats: RawClientStatsType): ClientStatsType {
    return {
      ...rawStats,
      last_loan: new Date(rawStats.last_loan || ''),
      last_payment: new Date(rawStats.last_payment || ''),
    };
  }
}

export default Client;
