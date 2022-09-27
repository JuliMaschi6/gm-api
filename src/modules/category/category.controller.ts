import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';


import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/category.dto';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) {}

    //Get categories
    @Get()
    async getCategories(@Res() res){
        console.log('ESTOY ACA EN EL BACK')
        const c = await this.categoryService.findAll();
        return res.status(HttpStatus.OK).json(c);
    }

    //Get one category with all treatments
    @Get('/treatments/:id')
    async getTreatmentsByCategory(@Res() res, @Param('id', ParseIntPipe) id){
        const t = await this.categoryService.findAllByCategory(id);
        if (!t) throw new NotFoundException('There are no treatments with this category!');
        
        return res.status(HttpStatus.OK).json(t);
    }

    //Get one category
    @Get(':id')
    async getCategory(@Res() res, @Param('id', ParseIntPipe) id){
        const c = await this.categoryService.findOne(id);
        if (!c) throw new NotFoundException('Category does not exist!');
        
        return res.status(HttpStatus.OK).json(c);
    }

    //Create one category
    @Post('/create')
    async createTreatment(@Res() res, @Body() createTreatmentDTO: CreateCategoryDTO){
        const t = await this.categoryService.create(createTreatmentDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Category Successfully Created',
            t
        });
    }

    //Update one category
    @Put(':id')
    async updateCategory(@Res() res , @Param('id', ParseIntPipe) id, @Body() createCategoryDTO: CreateCategoryDTO){
        const c = await this.categoryService.findOne(id);
        if (!c) throw new NotFoundException('Category does not exist!');

        await this.categoryService.updateCategory(c,createCategoryDTO)
        return res.status(HttpStatus.OK).json(c);
    }

    //Delete one category
    @Delete(':id')
    async deleteTreatment(@Res() res, @Param('id', ParseIntPipe) id){
        const c = await this.categoryService.findOne(id);
        if (!c) throw new NotFoundException('Treatment does not exist!');

        await this.categoryService.remove(id);
        return res.status(HttpStatus.OK).json(c);
    }

}