export interface ILocalStorageClient<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  del(key: string): void;
}

export interface ILocalStorageClientUser<T> {
  get(): T;
  set(value: T): void;
  del?(): void;
}

const LocalStorageClient = <T>(): ILocalStorageClient<T> => ({
  get(key) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : undefined;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  del(key) {
    return localStorage.removeItem(key);
  },
});

export default LocalStorageClient;
