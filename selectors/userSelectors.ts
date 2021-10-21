import { createSelector } from 'reselect';
import { AppState } from '../tools/configureStore';

const userReducerSelector = (state: AppState) => state.user;

export const userStatusSelector = createSelector(
  userReducerSelector,
  ({ loggedInStatus }) => loggedInStatus,
);

export const userSelector = createSelector(userReducerSelector, ({ user }) => user);

export const userLoadingStateSelector = createSelector(
  userReducerSelector,
  ({ loadingState }) => loadingState,
);
