// Definimos que se envia entre la app cliente y el servidor (ayuda a validar datos)
import { IsDate, IsString } from "class-validator";

export class CreateTreatmentDTO{
    @IsString()
    readonly title: string;
    @IsString()
    readonly content: string;
    @IsString()
    readonly imageURL: string;
    readonly createdAt: Date;
}