import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';


import { CreateCategoryDTO } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { Treatment } from '../treatment/entities/treatment.entity';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Treatment) private readonly tratmenRepository: Repository<Treatment>
    ){}
    
    //Get all categories
    async findAll(): Promise<Category[]> {
        const categories = await this.categoryRepository.find();
        return categories;
    }
    
    //Get a single category
    async findOne(id: number): Promise<Category> {
        const category =  this.categoryRepository.findOne({
            where: {
                id: id,
            }
        });
        return category;
        
    }
    
    //Post a single category
    async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const newCategory = this.categoryRepository.create(createCategoryDTO);
        await this.categoryRepository.save(newCategory);
        return newCategory;
    }
    
    //Update a category
    async updateCategory(t: any, createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const treatment = this.categoryRepository.merge(t, createCategoryDTO);
        await this.categoryRepository.save(treatment);
        return treatment;
    }
    
    //Remove a Category
    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }

    //Get category with treatments
    async findAllByCategory(id: number): Promise<Category> {
        let categoryTreatments = await this.categoryRepository.createQueryBuilder("category")
        .leftJoinAndSelect("category.treatments", "treatment")
        .where("category.id = :id", {id: id})
        .getOne()

        return categoryTreatments
    }
}


