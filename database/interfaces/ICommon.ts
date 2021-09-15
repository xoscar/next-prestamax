import { NextApiRequest } from 'next';
import { ISerializedUser } from './IUser';

export type AuthorizedNextApiRequest = NextApiRequest & { user: { payload: ISerializedUser } };
