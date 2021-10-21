import { getMongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import DatabaseConnection from '../utils/DatabaseConnection';
import Charge from '../models/Charge';
import Client from '../models/Client';
import { IRawCharge } from '../interfaces/ICharge';

export type ChargeQuery = {
  paid: boolean;
  clientId: string;
};

export default class ChargeService extends DatabaseConnection {
  static chargeRepository = getMongoRepository(Charge);

  static async getCharge(chargeId: string): Promise<Charge> {
    const charge = await this.chargeRepository.findOne({
      _id: new ObjectId(chargeId),
    });

    return charge || Promise.reject(['Charge not found.']);
  }

  static async getCharges({ paid = true, clientId }: ChargeQuery): Promise<Array<Charge>> {
    return this.chargeRepository.find({
      paid,
      client_id: new ObjectId(clientId),
    });
  }

  static async createCharge(client: Client, values: IRawCharge): Promise<Charge> {
    const errors = Charge.validateData(client.id as ObjectId, values);

    if (errors.length) return Promise.reject(errors);

    const charge = new Charge(values);

    charge.user_id = new ObjectId(client.user_id);
    charge.client_id = new ObjectId(client.id);

    return this.chargeRepository.save(charge);
  }

  static async updateCharge(client: Client, chargeId: string, values: IRawCharge): Promise<Charge> {
    const errors = Charge.validateData(client.id as ObjectId, values);

    if (errors.length) return Promise.reject(errors);

    const charge = await this.getCharge(chargeId);
    const { amount, created, description } = values;

    charge.amount = amount;
    charge.created = created;
    charge.description = description;

    return this.chargeRepository.save(charge);
  }

  static async payCharge(client: Client, chargeId: string): Promise<Charge> {
    const charge = await this.getCharge(chargeId);

    charge.paid = true;
    charge.paid_date = new Date();

    return this.chargeRepository.save(charge);
  }

  static async deleteCharge(chargeId: string): Promise<void> {
    const parsedChargeId = new ObjectId(chargeId);

    await this.chargeRepository.deleteOne({ id: parsedChargeId });
  }
}
