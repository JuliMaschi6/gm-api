import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';

import {CreateTreatmentDTO} from './dto/treatment.dto'
import { TreatmentService } from './treatment.service';

//Manejo de rutas

@Controller('treatment')
export class TreatmentController{

    constructor(
        private treatmentService: TreatmentService
    ) {}

    @Get()
    async getTreatments(@Res() res){
        const t = await this.treatmentService.findAll();
        return res.status(HttpStatus.OK).json(t);
    }

    @Get(':id')
    async getTreatment(@Res() res, @Param('id') id){
        const t = await this.treatmentService.findOne(id);
        if (!t) throw new NotFoundException('Treatment does not exist!');
        
        return res.status(HttpStatus.OK).json(t);
    }

    @Post('/create')
    async createTreatment(@Res() res, @Body() createTreatmentDTO: CreateTreatmentDTO){
        const t = await this.treatmentService.create(createTreatmentDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Treatment Successfully Created',
            t
        });
    }


    @Put(':id')
    async updateTreatment(@Res() res , @Param('id') id, @Body() createTreatmentDTO: CreateTreatmentDTO){
        const t = await this.treatmentService.findOne(id);
        if (!t) throw new NotFoundException('Treatment does not exist!');

        await this.treatmentService.updateTreatment(t,createTreatmentDTO)
        return res.status(HttpStatus.OK).json(t);
    }

    @Delete(':id')
    async deleteTreatment(@Res() res, @Param('id') id){
        const t = await this.treatmentService.findOne(id);
        if (!t) throw new NotFoundException('Treatment does not exist!');

        await this.treatmentService.remove(id);
        return res.status(HttpStatus.OK).json(t);
    }

}
