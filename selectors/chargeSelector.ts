import { createSelector } from 'reselect';
import { AppState } from '../tools/configureStore';

const chargeReducerSelector = (state: AppState) => state.charges;

export const chargeListSelector = createSelector(chargeReducerSelector, ({ chargeList }) =>
  Object.values(chargeList),
);

export const chargeCurrentPageSelector = createSelector(
  chargeReducerSelector,
  ({ pageNumber }) => pageNumber,
);

export const chargeListHasMoreItemsSelector = createSelector(
  chargeReducerSelector,
  ({ hasMoreItems }) => hasMoreItems,
);

export const chargeLoadingStateSelector = createSelector(
  chargeReducerSelector,
  ({ loadingState }) => loadingState,
);
