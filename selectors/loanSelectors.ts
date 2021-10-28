import { createSelector } from 'reselect';
import { AppState } from '../tools/configureStore';

const loanReducerSelector = (state: AppState) => state.loans;

export const loanListSelector = createSelector(loanReducerSelector, ({ loanList }) =>
  Object.values(loanList),
);

export const loanCurrentPageSelector = createSelector(
  loanReducerSelector,
  ({ pageNumber }) => pageNumber,
);

export const loanListHasMoreItemsSelector = createSelector(
  loanReducerSelector,
  ({ hasMoreItems }) => hasMoreItems,
);

export const loanSelector = createSelector(loanReducerSelector, ({ loan }) => loan);

export const loanLoadingStateSelector = createSelector(
  loanReducerSelector,
  ({ loadingState }) => loadingState,
);
