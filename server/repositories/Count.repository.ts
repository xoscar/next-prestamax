import { PrismaClient } from '@prisma/client';
import Counter from '../../models/Counter.model';
import User from '../../models/User.model';
import prisma from '../utils/PrismaClient';

export type TChargeQuery = {
  paid: boolean;
  clientId: string;
};

type CountRepository = PrismaClient['counter'] & {
  getNext(name: string): Promise<number>;
};

export type ILoginUserResponse = User & {
  jwt: string;
};

const CountRepository = (): CountRepository => ({
  ...prisma.counter,
  async getNext(name) {
    const rawCounter = await this.findFirst({ where: { name } });

    if (!rawCounter) return Promise.reject(['Counter not found']);

    const counter = Counter(rawCounter);
    const count = counter.count;

    await this.update({ where: { id: counter.id }, data: { count: count + 1 } });

    return count;
  },
});

export default CountRepository();
