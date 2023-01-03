import { User } from '@prisma/client';
import { NextApiRequest } from 'next';

export type AuthorizedNextApiRequest = NextApiRequest & { auth: { payload: User } };

