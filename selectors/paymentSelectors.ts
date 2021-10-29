import { createSelector } from 'reselect';
import { AppState } from '../tools/configureStore';

const paymentReducerSelector = (state: AppState) => state.payments;

export const paymentListSelector = createSelector(paymentReducerSelector, ({ paymentList }) =>
  Object.values(paymentList),
);

export const paymentLoadingStateSelector = createSelector(
  paymentReducerSelector,
  ({ loadingState }) => loadingState,
);
