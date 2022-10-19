import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne,
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

  @OneToOne(() => Costs, (cost) => cost.subcategory)
    cost: Costs | undefined;
}
