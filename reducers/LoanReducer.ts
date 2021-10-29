import { createSlice } from '@reduxjs/toolkit';
import { keyBy } from 'lodash';
import { addLoan, getLoan, loadNextPage, searchLoans, updateLoan } from '../actions/loanActions';
import { LoadingState } from '../enums/common';
import Loan from '../records/Loan';
import { addPayment, deletePayment, updatePayment } from './PaymentReducer';

const DEFAULT_PAGE_SIZE = 20;

type LoanReducerInitialState = {
  loan?: Loan;
  loanList: { [key: string]: Loan };
  loadingState: LoadingState;
  hasMoreItems: boolean;
  pageNumber: number;
};

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
      .addCase(getLoan.fulfilled, (state, action) => {
        const { payload: loan } = action;

        state.loan = loan;
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
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        const { payload: payment } = action;

        state.loan = state.loan?.addPayment(payment);
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        const { payload: payment } = action;

        state.loan = state.loan?.updatePayment(payment);
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        const { payload: paymentId } = action;

        state.loan = state.loan?.removePayment(paymentId);
      });
  },
});

export const {} = actions;
export default reducer;
