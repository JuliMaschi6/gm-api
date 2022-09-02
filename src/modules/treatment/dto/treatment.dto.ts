// Definimos que se envia entre la app cliente y el servidor (ayuda a validar datos)
import { IsNumber, IsObject, IsString } from "class-validator";

import { Category } from "src/modules/category/entities/category.entity";

export class CreateTreatmentDTO{
    @IsString()
    readonly title: string;
    @IsString()
    readonly content: string;
    @IsString()
    readonly imageURL: string;
    
    @IsNumber()
    readonly category_id: number;
    // @IsObject()
    // readonly category: Partial<Category>;

    readonly createdAt: Date;
}