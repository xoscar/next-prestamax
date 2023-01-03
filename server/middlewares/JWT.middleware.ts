import { expressjwt } from 'express-jwt';
import { promisify } from 'util';
import { Request, Response } from 'express';
import { NextApiResponse } from 'next';
import { AuthorizedNextApiRequest } from '../types/Common.types';

const { JWT_SECRET } = process.env;

const middleware = expressjwt({ secret: JWT_SECRET as string, algorithms: ['HS256'] }).unless({
  path: [''],
});

interface IHandlerFunction {
  (req: AuthorizedNextApiRequest, res: NextApiResponse): Promise<void>;
}

interface IWithJWTMIddleware {
  (handler: IHandlerFunction): IHandlerFunction;
}

const withJWTMiddleware: IWithJWTMIddleware = (handler) => async (req, res) => {
  await promisify(middleware)(req as unknown as Request, res as unknown as Response);

  await handler(req, res);
};

export default withJWTMiddleware;
