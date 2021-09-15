import { getMongoRepository, ObjectID as TypeObjectID } from 'typeorm';
import { ObjectID } from 'mongodb';
import DatabaseConnection from '../utils/DatabaseConnection';
import Charge from '../models/Charge';
import Client from '../models/Client';
import { IRawCharge } from '../interfaces/ICharge';

export type ChargeQuery = {
  paid: boolean;
  clientId: TypeObjectID;
};

export default class ChargeService extends DatabaseConnection {
  static chargeRepository = getMongoRepository(Charge);

  static async getCharge(chargeId: TypeObjectID): Promise<Charge> {
    const charge = await this.chargeRepository.findOne({
      id: new ObjectID(chargeId),
    });

    return charge || Promise.reject(['Client not found.']);
  }

  static async getCharges({ paid = true, clientId }: ChargeQuery): Promise<Array<Charge>> {
    return this.chargeRepository.find({
      paid,
      client_id: new ObjectID(clientId),
    });
  }

  static async createCharge(client: Client, values: IRawCharge): Promise<Charge> {
    const errors = Charge.validateData(client.id as TypeObjectID, values);

    if (errors) return Promise.reject(errors);

    const charge = new Charge(values);

    charge.user_id = new ObjectID(client.user_id);
    charge.client_id = new ObjectID(client.client_id);

    return this.chargeRepository.save(charge);
  }

  static async updateCharge(
    client: Client,
    chargeId: TypeObjectID,
    values: IRawCharge,
  ): Promise<Charge> {
    const errors = Charge.validateData(client.id as TypeObjectID, values);

    if (errors) return Promise.reject(errors);

    const charge = await this.getCharge(chargeId);
    const { amount, created, description } = values;

    charge.amount = amount;
    charge.created = created;
    charge.description = description;

    return this.chargeRepository.save(charge);
  }

  static async payCharge(client: Client, chargeId: TypeObjectID): Promise<Charge> {
    const charge = await this.getCharge(chargeId);

    charge.paid = true;
    charge.paid_date = new Date();

    return this.chargeRepository.save(charge);
  }

  static async deleteCharge(chargeId: TypeObjectID): Promise<void> {
    const parsedChargeId = new ObjectID(chargeId);

    await this.chargeRepository.deleteOne({ id: parsedChargeId });
  }
}
