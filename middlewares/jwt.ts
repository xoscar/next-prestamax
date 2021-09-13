import expressJwt from 'express-jwt';
import { promisify } from 'util';
import getConfig from 'next/config';
import { Request, Response } from 'express';
import { NextApiRequest, NextApiResponse } from 'next';

const { serverRuntimeConfig } = getConfig();

const middleware = expressJwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless(
  {
    path: [''],
  },
);

interface IHandlerFunction {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

interface IWithJWTMIddleware {
  (handler: IHandlerFunction): IHandlerFunction;
}

const withJWTMiddleware: IWithJWTMIddleware = (handler) => async (req, res) => {
  await promisify(middleware)(req as unknown as Request, res as unknown as Response);

  handler(req, res);
};

export default withJWTMiddleware;
