import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

import { Treatment } from '../../treatment/entities/treatment.entity';



@Entity()
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany((type)=> Treatment, (treatment) => treatment.category)
    treatments: Treatment[];

    // @Column()
    // @CreateDateColumn()
    // createdAt: Date;
}