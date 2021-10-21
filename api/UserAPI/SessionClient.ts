import { UserType } from '../../records/User';
import User from '../../records/User';
import LocalStorageClient from '../LocalStorageClient';

export const USER_SESSION = 'user_session';

const localStorageClient = LocalStorageClient<UserType>();

export type SessionClient = {
  getSession(): User | undefined;
  saveSession(user: User): void;
  removeSession(): void;
};

const SessionClient: SessionClient = {
  getSession() {
    const userSession = localStorageClient.get(USER_SESSION);

    if (userSession) return User.createFromRaw(userSession);

    return undefined;
  },
  saveSession(user) {
    localStorageClient.set(USER_SESSION, user);
  },
  removeSession() {
    localStorageClient.del(USER_SESSION);
  },
};

export default SessionClient;
