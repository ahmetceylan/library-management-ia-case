import { IsNumber, IsOptional, IsString } from "class-validator";

export class BookDataDto {
    @IsNumber()
    id!:number

    @IsString()
    name!:string

    @IsNumber()
    @IsOptional()
    score?:number
}