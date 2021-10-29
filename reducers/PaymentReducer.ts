import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { keyBy } from 'lodash';
import { getLoan } from '../actions/loanActions';
import PaymentClient from '../gateways/PaymentAPI/PaymentClient';
import { LoadingState } from '../enums/common';
import Payment, { FormDataPaymentType } from '../records/Payment';

type paymentReducerInitialState = {
  paymentList: { [key: string]: Payment };
  loadingState: LoadingState;
};

export const loadPayments = createAsyncThunk<Array<Payment>, string>(
  'payments/loadPayments',
  async (loanId) => {
    const paymentList = await PaymentClient.get(loanId);

    return paymentList;
  },
);

export const addPayment = createAsyncThunk<
  Payment,
  { clientId: string; loanId: string; values: FormDataPaymentType }
>('payments/addPayment', async ({ clientId, loanId, values }) => {
  const payment = await PaymentClient.create(clientId, loanId, values);

  return payment;
});

export const updatePayment = createAsyncThunk<
  Payment,
  { clientId: string; loanId: string; paymentId: string; values: FormDataPaymentType }
>('payments/updatePayment', async ({ clientId, loanId, paymentId, values }) => {
  const payment = await PaymentClient.update(clientId, loanId, paymentId, values);

  return payment;
});

export const deletePayment = createAsyncThunk<
  string,
  { clientId: string; loanId: string; paymentId: string }
>('payments/deletePayment', async ({ clientId, loanId, paymentId }) => {
  await PaymentClient.remove(clientId, loanId, paymentId);

  return paymentId;
});

const initialState: paymentReducerInitialState = {
  paymentList: {},
  loadingState: LoadingState.IDLE,
};

const { actions, reducer } = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLoan.fulfilled, (state, action) => {
        const { payload: loan } = action;
        const { paymentList } = loan;

        state.paymentList = {
          ...keyBy(paymentList, 'id'),
        };

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        const { payload: payment } = action;

        state.paymentList = {
          [payment.id as string]: payment,
          ...state.paymentList,
        };

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        const { payload: payment } = action;

        state.paymentList[payment.id] = payment;

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        const { payload: paymentId } = action;

        delete state.paymentList[paymentId];

        state.loadingState = LoadingState.SUCCESS;
      });
  },
});

export const {} = actions;
export default reducer;
