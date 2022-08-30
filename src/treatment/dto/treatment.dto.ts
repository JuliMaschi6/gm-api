// Definimos que se envia entre la app cliente y el servidor (ayuda a validar datos)

export class CreateTreatmentDTO{
    //readonly id: number;
    readonly title: string;
    readonly content: string;
    readonly imageURL: string;
    readonly createdAt: Date;
}