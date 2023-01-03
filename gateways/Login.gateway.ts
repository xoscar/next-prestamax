import { TLoginValues } from '../components/LoginForm/hooks/useLoginForm';
import { HttpMethods } from '../constants/Http.constants';
import User from '../models/User.model';
import { request } from './clients/Rest.client';

const LoginGateway = {
  async login({ username, password }: TLoginValues): Promise<User> {
    const { json } = await request<TLoginValues, User>({
      method: HttpMethods.POST,
      url: '/api/login',
      body: { username, password },
    });

    return User(json);
  },
};

export default LoginGateway;
