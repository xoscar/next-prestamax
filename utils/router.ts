import { PublicRouteList, Routes } from '../constants/Common.constants';

export const getIsPublicPath = (url: string): boolean => {
  const [path] = url.split('?');
  return PublicRouteList.includes(path as Routes);
};
