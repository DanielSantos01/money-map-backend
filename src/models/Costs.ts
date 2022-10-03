import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import User from "./User";

@Entity()
export default class Costs {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    userId!: string;

    @Column('text')
    name!: string;

    @Column('text')
    description!: string;

    @Column('date')
    date!: Date;

    @Column('number')
    value!: number;

    @Column('uuid')
    subCategoryId!: string;

    @ManyToOne(type => User, costs => Costs, { eager: true })
    user!: User;
};
