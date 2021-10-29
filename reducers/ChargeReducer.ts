import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { keyBy } from 'lodash';
import ChargeClient from '../gateways/ChargeAPI/ChargeClient';
import { LoadingState } from '../enums/common';
import Charge, { FormDataChargeType } from '../records/Charge';
import { AppState } from '../tools/configureStore';

const DEFAULT_PAGE_SIZE = 20;

type ChargeReducerInitialState = {
  chargeList: { [key: string]: Charge };
  loadingState: LoadingState;
  hasMoreItems: boolean;
  pageNumber: number;
};

type ChargesParamsType = {
  clientId: string;
  paid: boolean;
};

export const loadCharges = createAsyncThunk<Array<Charge>, ChargesParamsType>(
  'charges/loadCharges',
  async ({ clientId, paid }) => {
    const chargeList = await ChargeClient.get(clientId, {
      pageNumber: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      paid,
    });

    return chargeList;
  },
);

export const loadNextPage = createAsyncThunk<Array<Charge>, ChargesParamsType>(
  'charges/loadNextPage',
  async ({ clientId, paid }, { getState }) => {
    const { pageNumber } = (getState() as AppState).charges;

    const chargeList = await ChargeClient.get(clientId, {
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      paid,
    });

    return chargeList;
  },
);

export const addCharge = createAsyncThunk<Charge, { clientId: string; values: FormDataChargeType }>(
  'charges/addCharge',
  async ({ clientId, values }) => {
    const charge = await ChargeClient.create(clientId, values);

    return charge;
  },
);

export const updateCharge = createAsyncThunk<
  Charge,
  { clientId: string; chargeId: string; values: FormDataChargeType }
>('charges/updateCharge', async ({ clientId, chargeId, values }) => {
  const charge = await ChargeClient.update(clientId, chargeId, values);

  return charge;
});

export const payCharge = createAsyncThunk<Charge, { clientId: string; chargeId: string }>(
  'charges/payCharge',
  async ({ clientId, chargeId }) => {
    const charge = await ChargeClient.pay(clientId, chargeId);

    return charge;
  },
);

export const deleteCharge = createAsyncThunk<string, { clientId: string; chargeId: string }>(
  'charges/deleteCharge',
  async ({ clientId, chargeId }) => {
    await ChargeClient.remove(clientId, chargeId);

    return chargeId;
  },
);

const initialState: ChargeReducerInitialState = {
  chargeList: {},
  pageNumber: 0,
  hasMoreItems: true,
  loadingState: LoadingState.IDLE,
};

const { actions, reducer } = createSlice({
  name: 'charges',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadCharges.fulfilled, (state, action) => {
        const { payload: chargeList } = action;

        state.chargeList = {
          ...keyBy(chargeList, 'id'),
        };

        state.hasMoreItems = true;
        state.pageNumber = 1;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(loadNextPage.fulfilled, (state, action) => {
        const { payload: chargeList } = action;

        state.chargeList = {
          ...state.chargeList,
          ...keyBy(chargeList, 'id'),
        };

        if (chargeList.length < DEFAULT_PAGE_SIZE) state.hasMoreItems = false;

        state.pageNumber++;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(addCharge.fulfilled, (state, action) => {
        const { payload: charge } = action;

        state.chargeList = {
          [charge.id as string]: charge,
          ...state.chargeList,
        };

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(updateCharge.fulfilled, (state, action) => {
        const { payload: charge } = action;

        state.chargeList[charge.id] = charge;

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(payCharge.fulfilled, (state, action) => {
        const { payload: charge } = action;

        delete state.chargeList[charge.id];

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(deleteCharge.fulfilled, (state, action) => {
        const { payload: chargeId } = action;

        delete state.chargeList[chargeId];

        state.loadingState = LoadingState.SUCCESS;
      });
  },
});

export const {} = actions;
export default reducer;
