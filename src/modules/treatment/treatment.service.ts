import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {CreateTreatmentDTO} from './dto/treatment.dto'
import { Treatment } from './entities/treatment.entity';
import { Category } from '../category/entities/category.entity';


@Injectable()
export class TreatmentService {

    constructor(
        @InjectRepository(Treatment) private readonly tratmenRepository: Repository<Treatment>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ){}
    
    //Get all treatments
    async findAll(): Promise<Treatment[]> {
        const treatments : Treatment[] = await this.tratmenRepository.find({relations: ['category']});
        return treatments;
    }

    //Get a single treatment
    async findOne(id: number): Promise<Treatment> {
        const treatment = this.tratmenRepository.findOne({
            where: {
                id: id,
            },
            relations: ['category'],
        });
        return treatment;
        
    }
    
    //Post a single treatment
    async create({title,content,imageURL,category_id}: CreateTreatmentDTO): Promise<Treatment> {
        const newTreatment : Treatment = this.tratmenRepository.create({title,content,imageURL});
        const category : Category = await this.categoryRepository.findOneBy({id: category_id})
        
        if(!category) throw new NotFoundException('Category does not exist and it is required!');
        
        newTreatment.category = category;
        await this.tratmenRepository.save(newTreatment);
        return newTreatment;
    }
    
    //Update a treatment
    async updateTreatment(t: any,{ title,content,imageURL,category_id}: CreateTreatmentDTO): Promise<Treatment> {
        const treatment : Treatment = this.tratmenRepository.merge(t, {title,content,imageURL});
        
        const category : Category = await this.categoryRepository.findOneBy({id: category_id})
        if(!category) throw new NotFoundException('Category does not exist and it is required!');
        
        treatment.category = category;

        await this.tratmenRepository.save(treatment);
        return treatment;
    }
    
    //Remove a treatment
    async remove(id: number): Promise<void> {
        await this.tratmenRepository.delete(id);
    }

}
