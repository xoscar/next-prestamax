import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { keyBy } from 'lodash';
import Router from 'next/router';
import ClientsClient from '../gateways/ClientAPI/ClientsClient';
import { LoadingState } from '../enums/common';
import Client, { FormDataClientType } from '../records/Client';
import { clientCurrentPageSelector } from '../selectors/clientSelectors';
import { AppState } from '../tools/configureStore';

const DEFAULT_PAGE_SIZE = 20;

type ClientReducerInitialState = {
  clientList: { [key: string]: Client };
  client?: Client;
  pageNumber: number;
  loadingState: LoadingState;
  hasMoreItems: boolean;
};

const initialState: ClientReducerInitialState = {
  clientList: {},
  client: undefined,
  pageNumber: 0,
  hasMoreItems: true,
  loadingState: LoadingState.IDLE,
};

type SearchClientsParamsType = {
  search: string;
};

export const searchClients = createAsyncThunk<Array<Client>, SearchClientsParamsType>(
  'clients/searchClient',
  async ({ search = '' }) => {
    const clientList = await ClientsClient.get({
      search,
      pageNumber: 0,
      pageSize: DEFAULT_PAGE_SIZE,
    });

    return clientList;
  },
);

export const getClient = createAsyncThunk<Client, string>('clients/getClient', async (clientId) => {
  const client = await ClientsClient.getOne(clientId);

  return client;
});

export const loadNextPage = createAsyncThunk<Array<Client>, SearchClientsParamsType>(
  'clients/loadNextPage',
  async ({ search = '' }, { getState }) => {
    const pageNumber = clientCurrentPageSelector(getState() as AppState);

    const clientList = await ClientsClient.get({ search, pageNumber, pageSize: DEFAULT_PAGE_SIZE });

    return clientList;
  },
);

export const addClient = createAsyncThunk<Client, FormDataClientType>(
  'clients/addClient',
  async (values) => {
    const client = await ClientsClient.create(values);

    return client;
  },
);

export const updateClient = createAsyncThunk<
  Client,
  { clientId: string; values: FormDataClientType }
>('clients/updateClient', async ({ clientId, values }) => {
  const client = await ClientsClient.update(clientId, values);

  return client;
});

export const deleteClient = createAsyncThunk<void, string>(
  'clients/deleteClient',
  async (clientId) => {
    await ClientsClient.remove(clientId);

    await Router.push('/home');
    return;
  },
);

const { actions, reducer } = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchClients.fulfilled, (state, action) => {
        const { payload: clientList } = action;

        state.clientList = {
          ...keyBy(clientList, 'id'),
        };

        state.hasMoreItems = true;
        state.pageNumber = 1;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(loadNextPage.fulfilled, (state, action) => {
        const { payload: clientList } = action;

        state.clientList = {
          ...state.clientList,
          ...keyBy(clientList, 'id'),
        };

        if (clientList.length < DEFAULT_PAGE_SIZE) state.hasMoreItems = false;

        state.pageNumber++;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        const { payload: client } = action;

        state.clientList = {
          [client.id as string]: client,
          ...state.clientList,
        };

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        const { payload: client } = action;

        state.client = client;

        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const { payload: client } = action;

        state.client = client;

        state.loadingState = LoadingState.SUCCESS;
      });
  },
});

export const {} = actions;
export default reducer;
