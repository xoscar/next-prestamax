import Charge, { FormDataChargeType, RawChargeType } from '../../records/Charge';
import AuthenticatedClient from '../AuthenticatedClient';

const { get, post, remove, put } = AuthenticatedClient<FormDataChargeType, RawChargeType>(
  '/api/clients/{{clientId}}/charges',
);

const { post: pay } = AuthenticatedClient<FormDataChargeType, RawChargeType>(
  '/api/clients/{{clientId}}/charges/{{chargeId}}/pay',
);

type ChargeClientType = {
  get(
    clientId: string,
    parameters: {
      pageNumber: number;
      pageSize: number;
      paid?: boolean;
    },
  ): Promise<Array<Charge>>;
  create(clientId: string, values: FormDataChargeType): Promise<Charge>;
  update(clientId: string, chargeId: string, values: FormDataChargeType): Promise<Charge>;
  pay(clientId: string, chargeId: string): Promise<Charge>;
  remove(clientId: string, chargeId: string): Promise<void>;
};

const ChargeClient: ChargeClientType = {
  async get(clientId, { pageNumber, pageSize, paid }) {
    const { json: chargeList } = await get<Array<RawChargeType>>({
      queryParams: { pageNumber, pageSize, paid },
      pathParameters: { clientId },
    });

    return chargeList.map((rawCharge) => Charge.createFromRaw(rawCharge));
  },
  async create(clientId, values) {
    const { json: rawCharge } = await post({
      body: values,
      pathParameters: { clientId },
    });

    return Charge.createFromRaw(rawCharge);
  },
  async update(clientId, chargeId, values) {
    const { json: rawCharge } = await put({
      body: values,
      pathParameters: { clientId },
      id: chargeId,
    });

    return Charge.createFromRaw(rawCharge);
  },
  async pay(clientId, chargeId) {
    const { json: rawCharge } = await pay({
      pathParameters: { clientId, chargeId },
    });

    return Charge.createFromRaw(rawCharge);
  },
  async remove(clientId, chargeId) {
    await remove({
      pathParameters: { clientId },
      id: chargeId,
    });

    return;
  },
};

export default ChargeClient;
