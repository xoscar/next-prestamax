import { NextApiRequest, NextApiResponse } from 'next';

interface IHandlerFunction {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

interface IWithErrorHandler {
  (handler: IHandlerFunction): IHandlerFunction;
}

const withApiErrorHandler: IWithErrorHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    if (typeof error === 'string') {
      return res.status(400).json({ message: error });
    }


    if (Array.isArray(error)) {
      return res.status(400).json({ message: error.join(',') });
    }

    const { name, message } = error as Error;

    if (name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    return res.status(500).json({ message });
  }
};

export default withApiErrorHandler;
