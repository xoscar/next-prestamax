import { PrismaClient } from '@prisma/client';
import Charge, { TPartialCharge } from '../../models/Charge.model';
import Client from '../../models/Client.model';
import prisma from '../utils/PrismaClient';

export type TChargeQuery = {
  paid: boolean;
  clientId: string;
};

type ChargeRepository = PrismaClient['charge'] & {
  getCharge(chargeId: string): Promise<Charge>;
  getCharges(query: TChargeQuery): Promise<Array<Charge>>;
  createCharge(client: Client, values: TPartialCharge): Promise<Charge>;
  updateCharge(charge: Client, chargeId: string, values: TPartialCharge): Promise<Charge>;
  payCharge(chargeId: string): Promise<Charge>;
  deleteCharge(chargeId: string): Promise<void>;
};

const ChargeRepository = (): ChargeRepository => ({
  ...prisma.charge,
  async getCharge(chargeId: string): Promise<Charge> {
    const rawCharge = await this.findFirst({
      where: {
        id: chargeId,
      },
    });

    return rawCharge ? Charge(rawCharge) : Promise.reject(['Charge not found.']);
  },

  async getCharges({ paid = true, clientId }) {
    const rawChargeList = await this.findMany({
      where: {
        paid,
        clientId,
      },
    });

    return rawChargeList.map((rawCharge) => Charge(rawCharge));
  },
  async createCharge(client, values) {
    const errors = Charge.validate(client.id, values);

    if (errors.length) return Promise.reject(errors);

    const { amount = 0, description = '' } = values;

    const rawCharge = await this.create({
      data: {
        v: 0,
        paid: false,
        amount,
        description,
        client: {
          connect: {
            id: client.id,
          },
        },
        userId: client.userId,
        created: new Date(),
      },
    });

    return Charge(rawCharge);
  },
  async updateCharge(client, chargeId, values) {
    const errors = Charge.validate(client.id, values);

    if (errors.length) return Promise.reject(errors);
    const { amount = 0, description = '', expirationDate = new Date() } = values;

    const charge = await this.getCharge(chargeId);
    if (!charge) return Promise.reject(['Charge not found.']);

    const rawCharge = await this.update({
      where: { id: chargeId },
      data: {
        amount,
        description,
        expirationDate,
      },
    });

    return Charge(rawCharge);
  },
  async payCharge(chargeId) {
    const charge = await this.getCharge(chargeId);
    if (!charge) return Promise.reject(['Charge not found.']);

    const rawCharge = await this.update({
      where: { id: chargeId },
      data: {
        paid: true,
        paidDate: new Date(),
      },
    });

    return Charge(rawCharge);
  },
  async deleteCharge(chargeId) {
    await this.delete({ where: { id: chargeId } });
  },
});

export default ChargeRepository();
