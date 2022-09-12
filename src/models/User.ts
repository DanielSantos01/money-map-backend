import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

    @Column('text', {unique: true})
    email: string | undefined;

    @Column('text')
    name: string | undefined;

    @Column('alphanum')
    password: string | undefined;

    @Column('number', {nullable: true})
    income: number | undefined;

    @Column('number', {nullable: true})
    fixedGoal: number | undefined;

    @Column('number', {nullable: true})
    variableGoal: number | undefined;

    @Column('number', {nullable: true})
    futureGoal: number | undefined;

}
