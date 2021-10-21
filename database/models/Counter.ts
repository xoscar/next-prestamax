import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IRawCounter } from '../interfaces/ICounter';

@Entity('counters')
export default class Counter {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column('string')
  name: string;

  @Column('number')
  count: number;

  constructor(rawCounter?: IRawCounter) {
    const { name, count, id } = rawCounter || { count: 0, name: '' };

    this.id = id;
    this.name = name;
    this.count = count;
  }
}
