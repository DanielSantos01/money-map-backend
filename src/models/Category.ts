import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import Subcategory from './Subcategory';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

  @Column('text')
    name: string | undefined;

  @Column('text')
    icon: string | undefined;

  @Column('text')
    description: string | undefined;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
    subcategories?: Subcategory[] | undefined;
}
