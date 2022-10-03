import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import User from "./User";

@Entity()
export default class Costs {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined ;

    @Column('uuid')
    userId: string | undefined ;

    @Column('text')
    name: string | undefined ;

    @Column('text')
    description: string | undefined ;

    @Column('text')
    date: Date | undefined ;

    @Column('int')
    value: number | undefined ;

    @Column('uuid')
    subCategoryId: string | undefined ;

    @ManyToOne(type => User, costs => Costs, { eager: true })
    user: User | undefined;
};
