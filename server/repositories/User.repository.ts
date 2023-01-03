import { PrismaClient } from '@prisma/client';
import User from '../../models/User.model';
import prisma from '../utils/PrismaClient';

type UserRepository = PrismaClient['user'] & {
  getUser(username: string): Promise<User>;
};

const UserRepository = (): UserRepository => ({
  ...prisma.user,
  async getUser(username: string): Promise<User> {
    const rawUser = await this.findFirst({ where: { username } });

    if (!rawUser) return Promise.reject(['User not found']);

    return User(rawUser);
  },
});

export default UserRepository();
