import { getManager } from 'typeorm';
import { ObjectId } from 'mongodb';
import validator from 'validator';
import Client from '../models/Client';
import DatabaseConnection from '../utils/DatabaseConnection';
import Loan from '../models/Loan';

export type SearchableModel = typeof Client | typeof Loan;
export type Query = { [key: string]: string | string[] };

const { isInt } = validator;

export default class SearchService extends DatabaseConnection {
  static manager = getManager();

  private static parseQuery({ pageSize = '', pageNumber = '', search = '' }: Query) {
    const termList = Array.isArray(search) ? search : (search as string).split(' ');
    const pageOkay = isInt(pageNumber as string, {
      min: 0,
      max: 99,
    });
    const pageSizeOkay = isInt(pageSize as string, {
      min: 0,
      max: 48,
    });

    return {
      take: pageOkay ? +pageSize : 20,
      skip: pageSizeOkay ? +pageSize * +pageNumber : 0,
      termsList: termList.map((term) => ({
        search: {
          $regex: term.toLowerCase(),
          $options: 'i',
        },
      })),
    };
  }

  static async runQuery<T>(
    model: SearchableModel,
    userId: ObjectId,
    query: Query,
  ): Promise<Array<T>> {
    const { take, skip, termsList } = this.parseQuery(query);

    const documentList = await this.manager.find(model, {
      where: { $and: termsList, user_id: new ObjectId(userId) },
      take,
      skip,
      order: {
        created: -1,
      },
    });

    return documentList as unknown as Array<T>;
  }
}
