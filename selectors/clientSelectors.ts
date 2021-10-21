import { createSelector } from 'reselect';
import { AppState } from '../tools/configureStore';

const clientReducerSelector = (state: AppState) => state.clients;

export const clientListSelector = createSelector(clientReducerSelector, ({ clientList }) =>
  Object.values(clientList),
);

export const clientCurrentPageSelector = createSelector(
  clientReducerSelector,
  ({ pageNumber }) => pageNumber,
);

export const clientListHasMoreItemsSelector = createSelector(
  clientReducerSelector,
  ({ hasMoreItems }) => hasMoreItems,
);

export const clientSelector = createSelector(clientReducerSelector, ({ client }) => client);

export const clientsLoadingStateSelector = createSelector(
  clientReducerSelector,
  ({ loadingState }) => loadingState,
);
