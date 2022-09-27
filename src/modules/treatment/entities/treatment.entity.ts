import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Category } from '../../category/entities/category.entity'

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

  // @Column()
  // @CreateDateColumn()
  // createdAt: Date;

  @ManyToOne((type) => Category, (category) => category.treatments,)
  category: Category;
  
  // @ManyToOne(() => ConversationEntity,(conversationEntity) => conversationEntity.messages,)
  // conversation: ConversationEntity;

}