import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ClientReducer from './ClientReducer';
import LoanReducer from './LoanReducer';
import ChargeReducer from './ChargeReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  clients: ClientReducer,
  loans: LoanReducer,
  charges: ChargeReducer,
});

export default rootReducer;
