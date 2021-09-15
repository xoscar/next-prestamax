import { uniqueId } from 'lodash';
import { getMongoRepository } from 'typeorm';
import { IRawUser, ISerializedUser } from '../interfaces/IUser';
import User from '../models/User';
import DatabaseConnection from '../utils/DatabaseConnection';
import { Password } from '../utils/Password';

export type ILoginUserResponse = ISerializedUser & {
  jwt: string;
};

export default class UserService extends DatabaseConnection {
  static userRepository = getMongoRepository(User);

  static async create(values: IRawUser): Promise<User> {
    const { username, password } = values;
    const errors = User.validateSignUp(values);

    if (!!errors.length) return Promise.reject(errors);

    const user = await this.userRepository.findOne({
      username,
    });

    if (!!user) return Promise.reject(['User already exists']);

    const newUser = new User(values);

    newUser.password = await Password.encrypt(password);
    newUser.token = await Password.encrypt(uniqueId());

    return this.userRepository.create(newUser);
  }

  static async login(values: IRawUser): Promise<ILoginUserResponse> {
    const { username, password } = values;

    const errors = User.validateLogIn(values);
    if (!!errors.length) return Promise.reject(errors);

    const user = await this.userRepository.findOne({
      username,
    });

    if (!user || !(await Password.compare(password, user?.password)))
      return Promise.reject(['Error en el usuario o la contraseña.']);

    return {
      ...user.serialize(),
      jwt: Password.signToken<ISerializedUser>(user.serialize()),
    };
  }

  static async getUser(username: string): Promise<ISerializedUser> {
    const user = await this.userRepository.findOne({ username });

    if (user) return user.serialize();

    return Promise.reject(['User not found']);
  }
}
