import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ClientReducer from './ClientReducer';
import LoanReducer from './LoanReducer';
import ChargeReducer from './ChargeReducer';
import PaymentReducer from './PaymentReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  clients: ClientReducer,
  loans: LoanReducer,
  charges: ChargeReducer,
  payments: PaymentReducer,
});

export default rootReducer;
