import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import User from './User';
import Subcategory from './Subcategory';

@Entity()
export default class Costs {
  @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

  @Column('uuid')
    userId: string | undefined;

  @Column('text')
    name: string | undefined;

  @Column('text')
    description: string | undefined;

  @Column('text')
    date: Date | undefined;

  @Column('int')
    value: number | undefined;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.costs)
    subcategory: Subcategory | undefined;

  @ManyToOne(() => User, (user) => user.costs)
    user: User | undefined;
}
