import { differenceInDays } from 'date-fns';
import User from '../models/User.model';
import LocalStorageClient from './clients/LocalStorage.client';

export const USER_SESSION = 'user_session';

const localStorageClient = LocalStorageClient<{ createdAt: number; user: User }>();

export type SessionGateway = {
  getSession(): User | undefined;
  saveSession(user: User): void;
  removeSession(): void;
};

const SessionGateway: SessionGateway = {
  getSession() {
    const { createdAt = Date.now(), user } = localStorageClient.get(USER_SESSION) || {};

    const diff = differenceInDays(new Date(createdAt), Date.now());

    if (user && diff <= 7) return User(user);

    return undefined;
  },
  saveSession(user) {
    localStorageClient.set(USER_SESSION, { createdAt: Date.now(), user });
  },
  removeSession() {
    localStorageClient.del(USER_SESSION);
  },
};

export default SessionGateway;
