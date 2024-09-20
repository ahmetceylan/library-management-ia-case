import { IsNumber, IsString } from "class-validator";

export class BookDataDto {
    @IsNumber()
    id!:number

    @IsString()
    name!:string
}