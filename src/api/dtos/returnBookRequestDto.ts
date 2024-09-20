
import { IsNumber } from "class-validator";

export class ReturnBookRequestDto {

    @IsNumber()
    userId!:number

    @IsNumber()
    bookId!:number
}