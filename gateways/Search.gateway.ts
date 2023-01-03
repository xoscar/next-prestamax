import { TLoginValues } from '../components/LoginForm/hooks/useLoginForm';
import { HttpMethods } from '../constants/Http.constants';
import Client from '../models/Client.model';
import Loan from '../models/Loan.model';
import { TSearchQuery } from '../server/types/Search.types';
import { authedRequest } from './clients/Authenticated.client';

const SearchGateway = {
  async search(queryParams: TSearchQuery): Promise<Loan[] | Client[]> {
    const { json } = await authedRequest<TLoginValues, Loan[] | Client[]>({
      method: HttpMethods.GET,
      url: '/api/search',
      queryParams,
    });

    return queryParams.type === 'client'
      ? json.map((result) => Client(result as Client))
      : json.map((result) => Loan(result as Loan));
  },
};

export default SearchGateway;
