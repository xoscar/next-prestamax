import User from '../../models/User.model';
import UserRepository from '../repositories/User.repository';
import { Password } from '../utils/Password';

const LoginService = () => ({
  async login(username: string, password: string): Promise<User> {
    const errors = User.validateLogin(username, password);
    if (!!errors.length) return Promise.reject(errors);

    const user = await UserRepository.getUser(username);

    if (!user || !(await Password.compare(password, user?.password)))
      return Promise.reject(['Error en el usuario o la contraseña.']);

    return {
      ...user,
      jwt: Password.signToken<User>(user),
    };
  },
});

export default LoginService();
