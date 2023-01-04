import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import validator from 'validator';
import ClientRepository from '../repositories/Client.repository';
import LoanRepository from '../repositories/Loan.repository';
import { SearchableRepos, TSearchQuery } from '../types/Search.types';

const { isInt } = validator;

const searchRepositoryMap = {
  client: ClientRepository,
  loan: LoanRepository,
} as const;

const SearchService = () => ({
  parseQuery(
    userId: string,
    { take = '', skip = '', search = '', type = SearchableRepos.CLIENT }: NextApiRequestQuery,
  ): TSearchQuery {
    const pageOkay = isInt(take as string);
    const pageSizeOkay = isInt(skip as string);

    return {
      take: pageOkay ? +take : 20,
      skip: pageSizeOkay ? +skip : 0,
      search: String(search),
      type: type as SearchableRepos,
    };
  },

  async search(userId: string, rawQuery: NextApiRequestQuery) {
    const query = this.parseQuery(userId, rawQuery);
    const repo = searchRepositoryMap[query.type];

    const documentList = await repo.search(userId, query, rawQuery);

    return documentList;
  },
});

export default SearchService();
