import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
