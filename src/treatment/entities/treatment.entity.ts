import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  imageURL: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}