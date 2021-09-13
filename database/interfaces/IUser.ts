export interface IRawUser {
  username: string;
  password: string;
  name: string;
  token: string;
  role: string;
}

export interface ISerializedUser {
  username: string;
  name: string;
  role: string;
}
