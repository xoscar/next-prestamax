import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';
import LoansClient from '../api/LoansAPI/LoansClient';
import Loan, { FormDataLoanType } from '../records/Loan';
import { AppState } from '../tools/configureStore';

const DEFAULT_PAGE_SIZE = 20;

type SearchLoansParamsType = {
  search: string;
  clientId?: string;
  finished: boolean;
};

export const searchLoans = createAsyncThunk<Array<Loan>, SearchLoansParamsType>(
  'loans/searchLoans',
  async ({ search, clientId, finished }) => {
    const loanList = await LoansClient.get({
      search,
      pageNumber: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      clientId,
      finished,
    });

    return loanList;
  },
);

export const loadNextPage = createAsyncThunk<Array<Loan>, SearchLoansParamsType>(
  'loans/loadNextPage',
  async ({ search = '', clientId, finished }, { getState }) => {
    const { pageNumber } = (getState() as AppState).loans;

    const loanList = await LoansClient.get({
      search,
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      clientId,
      finished,
    });

    return loanList;
  },
);

export const getLoan = createAsyncThunk<Loan, { clientId: string; loanId: string }>(
  'loans/getLoan',
  async ({ clientId, loanId }) => {
    const loan = await LoansClient.getOne(clientId, loanId);

    return loan;
  },
);

export const addLoan = createAsyncThunk<Loan, { clientId: string; values: FormDataLoanType }>(
  'loans/addLoan',
  async ({ clientId, values }) => {
    const loan = await LoansClient.create(clientId, values);

    return loan;
  },
);

export const updateLoan = createAsyncThunk<
  Loan,
  { clientId: string; loanId: string; values: FormDataLoanType }
>('loans/updateLoan', async ({ clientId, loanId, values }) => {
  const loan = await LoansClient.update(clientId, loanId, values);

  return loan;
});

export const deleteLoan = createAsyncThunk<string, { clientId: string; loanId: string }>(
  'loans/deleteLoan',
  async ({ clientId, loanId }) => {
    await LoansClient.remove(clientId, loanId);
    await Router.push('/loans');

    return loanId;
  },
);
