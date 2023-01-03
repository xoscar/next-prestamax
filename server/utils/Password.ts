import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import Bcrypt from 'bcrypt-nodejs';

const { JWT_SECRET } = process.env;

const genSalt = promisify(Bcrypt.genSalt);
const hash = promisify<string, string, string>(Bcrypt.hash);
const compare = promisify(Bcrypt.compare);

export class Password {
  static async encrypt(value: string): Promise<string> {
    const salt = await genSalt(10);

    return hash(value, salt);
  }

  static async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(rawPassword, hashedPassword);
  }

  static signToken<T>(payload: T): string {
    const token = jwt.sign({ payload }, JWT_SECRET as string, { expiresIn: '7d' });

    return token;
  }
}
