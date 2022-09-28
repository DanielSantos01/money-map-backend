import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

  @Column('text', { unique: true })
    email: string | undefined;

  @Column('text')
    name: string | undefined;

  @Column('text')
    password: string | undefined;

  @Column('numeric', { nullable: true })
    income: number | undefined;

  @Column('numeric', { nullable: true })
    fixedGoal: number | undefined;

  @Column('numeric', { nullable: true })
    variableGoal: number | undefined;

  @Column('numeric', { nullable: true })
    futureGoal: number | undefined;
}
