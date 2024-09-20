
import { Transform } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class ReturnBookRequestDto {

    @IsNumber()
    userId!:number

    @IsNumber()
    bookId!:number

    @IsDefined()
    @Transform(({ value }) => typeof value === 'string' ? true : parseInt(value) ? false : value)
    score!: number
}