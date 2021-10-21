import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Router from 'next/router';
import LoginClient, { LoginParameters } from '../api/UserAPI/LoginClient';
import SessionClient from '../api/UserAPI/SessionClient';
import { LoadingState, LoggedInStatus, Routes } from '../enums/common';
import User from '../records/User';
import { getIsPublicPath } from '../utils/router';

type UserReducerInitialState = {
  user?: User;
  loggedInStatus: LoggedInStatus;
  loadingState: LoadingState;
};

export const loginUser = createAsyncThunk<User, LoginParameters>(
  'users/loginUser',
  async (params) => {
    const user = await LoginClient.authenticate(params);

    SessionClient.saveSession(user);
    await Router.push({ pathname: Routes.HOME });

    return user;
  },
);

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  SessionClient.removeSession();
  await Router.push({ pathname: Routes.LOGIN });
});

export const authCheck = createAsyncThunk('users/authCheck', async () => {
  const user = SessionClient.getSession();

  const isPublicPath = getIsPublicPath(Router.asPath);

  if (!user) await Router.replace({ pathname: Routes.LOGIN });
  if (!!user && isPublicPath) await Router.push({ pathname: Routes.HOME });

  return user;
});

const initialState: UserReducerInitialState = {
  user: undefined,
  loggedInStatus: LoggedInStatus.LOGGED_OUT,
  loadingState: LoadingState.IDLE,
};

const { actions, reducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { payload: user } = action;

        state.loadingState = LoadingState.SUCCESS;
        state.loggedInStatus = LoggedInStatus.LOGGED_IN;
        state.user = user;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        const { payload: user } = action;
        state.loadingState = LoadingState.SUCCESS;
        if (!user) state.loggedInStatus = LoggedInStatus.LOGGED_OUT;
        else state.loggedInStatus = LoggedInStatus.LOGGED_IN;

        state.user = user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loadingState = LoadingState.SUCCESS;
        state.loggedInStatus = LoggedInStatus.LOGGED_OUT;

        state.user = undefined;
      });
  },
});

export const {} = actions;
export default reducer;
