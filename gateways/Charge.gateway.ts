import Charge, { TPartialCharge } from '../models/Charge.model';
import AuthenticatedClient from './clients/Authenticated.client';

const { post, remove, put } = AuthenticatedClient<TPartialCharge, TPartialCharge>(
  '/api/clients/{{clientId}}/charges',
);

const { post: pay } = AuthenticatedClient<TPartialCharge, TPartialCharge>(
  '/api/clients/{{clientId}}/charges/{{chargeId}}/pay',
);

type TChargeGateway = {
  create(props: { clientId: string; values: TPartialCharge }): Promise<Charge>;
  update(props: { clientId: string; chargeId: string; values: TPartialCharge }): Promise<Charge>;
  pay(props: { clientId: string; chargeId: string }): Promise<Charge>;
  remove(props: { clientId: string; chargeId: string }): Promise<void>;
};

const ChargeGateway: TChargeGateway = {
  async create({ clientId, values }) {
    const { json: rawCharge } = await post({
      body: values,
      pathParameters: { clientId },
    });

    return Charge(rawCharge);
  },
  async update({ clientId, chargeId, values }) {
    const { json: rawCharge } = await put({
      body: values,
      pathParameters: { clientId },
      id: chargeId,
    });

    return Charge(rawCharge);
  },
  async pay({ clientId, chargeId }) {
    const { json: rawCharge } = await pay({
      pathParameters: { clientId, chargeId },
    });

    return Charge(rawCharge);
  },
  async remove({ clientId, chargeId }) {
    await remove({
      pathParameters: { clientId },
      id: chargeId,
    });

    return;
  },
};

export default ChargeGateway;
