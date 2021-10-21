import { HttpMethods } from '../../enums/http';
import User, { UserType } from '../../records/User';
import { request } from '../RestClient';

export type LoginParameters = {
  username: string;
  password: string;
};

const LoginClient = {
  async authenticate({ username, password }: LoginParameters): Promise<User> {
    const { json } = await request<LoginParameters, UserType>({
      method: HttpMethods.POST,
      url: '/api/login',
      body: { username, password },
    });

    return User.createFromRaw(json);
  },
};

export default LoginClient;
