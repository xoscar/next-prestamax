import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { keyBy } from 'lodash';
import LoansClient from '../api/LoansAPI/LoansClient';
import { LoadingState } from '../enums/common';
import Loan, { FormDataLoanType } from '../records/Loan';
import { AppState } from '../tools/configureStore';

const DEFAULT_PAGE_SIZE = 20;

type LoanReducerInitialState = {
  loan?: Loan;
  loanList: { [key: string]: Loan };
  loadingState: LoadingState;
  hasMoreItems: boolean;
  pageNumber: number;
};

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

const initialState: LoanReducerInitialState = {
  loan: undefined,
  loanList: {},
  pageNumber: 0,
  hasMoreItems: true,
  loadingState: LoadingState.IDLE,
};

const { actions, reducer } = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchLoans.fulfilled, (state, action) => {
        const { payload: loanList } = action;

        state.loanList = {
          ...keyBy(loanList, 'id'),
        };

        state.hasMoreItems = true;
        state.pageNumber = 1;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(loadNextPage.fulfilled, (state, action) => {
        const { payload: loanList } = action;

        state.loanList = {
          ...state.loanList,
          ...keyBy(loanList, 'id'),
        };

        if (loanList.length < DEFAULT_PAGE_SIZE) state.hasMoreItems = false;

        state.pageNumber++;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        const { payload: loan } = action;

        state.loanList = {
          [loan.id as string]: loan,
          ...state.loanList,
        };

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        const { payload: loan } = action;

        state.loan = loan;

        state.loadingState = LoadingState.SUCCESS;
      });
  },
});

export const {} = actions;
export default reducer;
