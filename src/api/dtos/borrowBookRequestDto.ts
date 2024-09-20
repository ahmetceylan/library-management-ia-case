import { Transform } from "class-transformer";
import { IsBoolean, IsDefined, IsNumber, IsString } from "class-validator";
// import { IsNumberOrString } from "../utils/isNumberOrStringDecorator";

export class BorrowBookRequestDto {

    @IsNumber()
    userId!:number

    @IsNumber()
    bookId!:number

    @IsString()
    name!:string

    @IsDefined()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
    isReturned!: boolean

    @IsNumber()
    score!: number
}