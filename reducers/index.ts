import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ClientReducer from './ClientReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  clients: ClientReducer,
});

export default rootReducer;
