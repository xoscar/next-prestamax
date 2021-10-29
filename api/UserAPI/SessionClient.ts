import { differenceInDays } from 'date-fns';
import { UserType } from '../../records/User';
import User from '../../records/User';
import LocalStorageClient from '../LocalStorageClient';

export const USER_SESSION = 'user_session';

const localStorageClient = LocalStorageClient<{ createdAt: number; user: UserType }>();

export type SessionClient = {
  getSession(): User | undefined;
  saveSession(user: User): void;
  removeSession(): void;
};

const SessionClient: SessionClient = {
  getSession() {
    const { createdAt = Date.now(), user } = localStorageClient.get(USER_SESSION) || {};

    const diff = differenceInDays(new Date(createdAt), Date.now());

    if (user && diff <= 7) return User.createFromRaw(user);

    return undefined;
  },
  saveSession(user) {
    localStorageClient.set(USER_SESSION, { createdAt: Date.now(), user });
  },
  removeSession() {
    localStorageClient.del(USER_SESSION);
  },
};

export default SessionClient;
