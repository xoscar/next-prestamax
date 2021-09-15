import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { IRawClient, ISerializedClient } from '../interfaces/IClient';

@Entity('clients')
export default class Client {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column('string')
  user_id?: ObjectID;

  @Column('string')
  client_id: string;

  @Column('string')
  name: string;

  @Column('string')
  surname: string;

  @Column('date')
  created: Date;

  @Column('date')
  updated: Date;

  @Column('address')
  address: string;

  @Column('string')
  phone: string;

  @Column('array')
  search?: Array<string>;

  constructor(rawClient: IRawClient) {
    const { id, name, client_id, surname, user_id, address, phone, created, updated } =
      rawClient || {};

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.client_id = client_id;
    this.user_id = user_id;
    this.address = address;
    this.phone = phone;
    this.search = [this.name, this.client_id, this.surname];
    this.created = created || new Date();
    this.updated = updated || new Date();
  }

  static validateClient(query: IRawClient): Array<string> {
    const errors = [];
    const { name, surname, address, phone } = query || {};

    if (!name) errors.push('El nombre ingresado no es válido.');
    if (!surname) errors.push('El apellido ingresado no es válido.');
    if (!address) errors.push('La dirección ingresada no es válida.');
    if (!phone) errors.push('El teléfono ingresado no es válido.');

    return errors;
  }

  serialize(): ISerializedClient {
    return {
      id: this.id,
      client_id: this.client_id,
      user_id: this.user_id,
      name: this.name,
      surname: this.surname,
      created: this.created,
      updated: this.updated,
      address: this.address,
      phone: this.phone,
    };
  }
}
