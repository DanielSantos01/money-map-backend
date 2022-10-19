import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Category from './Category';
import Costs from './Costs';

@Entity()
export default class Subcategory {
  @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

  @Column('text')
    name: string | undefined;

  @Column('text')
    icon: string | undefined;

  @Column('text')
    description: string | undefined;

  @ManyToOne(() => Category, (category) => category.subcategories)
    category: Category | undefined;

  @OneToMany(() => Costs, (cost) => cost.subcategory)
    costs: Costs | undefined;
}
