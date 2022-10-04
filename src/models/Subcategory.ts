import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import Category from './Category';

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
}
