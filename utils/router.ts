import { PublicRouteList, Routes } from '../enums/common';

export const getIsPublicPath = (url: string): boolean => {
  const [path] = url.split('?');
  return PublicRouteList.includes(path as Routes);
};
