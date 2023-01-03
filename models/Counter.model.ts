import PrismaClient from '@prisma/client';

type Counter = PrismaClient.Counter;
type TPartialCounter = Partial<PrismaClient.Counter>;

const Counter = ({ id = '', count = 0, v = 0, name = '' }: TPartialCounter = {}): Counter => ({
  id,
  count,
  v,
  name,
});

export default Counter;
