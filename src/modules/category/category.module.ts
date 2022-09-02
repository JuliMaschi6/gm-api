import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Treatment } from '../treatment/entities/treatment.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category,Treatment])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
