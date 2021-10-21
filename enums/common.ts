export enum LoggedInStatus {
  LOGGED_IN = 'loggedIn',
  LOGGED_OUT = 'loggedOut',
}

export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  ERRORED = 'errored',
  SUCCESS = 'success',
}

export enum Routes {
  LOGIN = '/login',
  HOME = '/home',
}

export const PublicRouteList = [Routes.LOGIN];
