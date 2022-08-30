import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {CreateTreatmentDTO} from './dto/treatment.dto'
import { Treatment } from './entities/treatment.entity';

@Injectable()
export class TreatmentService {

    constructor(
        @InjectRepository(Treatment) private readonly tratmenRepository: Repository<Treatment>
    ){}
    
    //Get all treatments
    async findAll(): Promise<Treatment[]> {
        const treatments = await this.tratmenRepository.find();
        return treatments;
    }
    
    //Get a single treatments
    async findOne(id: number): Promise<Treatment> {
        const treatment =  this.tratmenRepository.findOneBy({id});
        return treatment;
        
    }
    
    //Post a single treatment
    async create(createTreatmentDTO: CreateTreatmentDTO): Promise<Treatment> {
        const newTreatment = this.tratmenRepository.create(createTreatmentDTO);
        await this.tratmenRepository.save(newTreatment);
        return newTreatment;
    }
    
    //Update a treatment
    async updateTreatment(t: any, createTreatmentDTO: CreateTreatmentDTO): Promise<Treatment> {
        const treatment = this.tratmenRepository.merge(t, createTreatmentDTO);
        await this.tratmenRepository.save(treatment);
        return treatment;
    }
    
    //Remove a treatment
    async remove(id: number): Promise<void> {
        await this.tratmenRepository.delete(id);
    }

}
