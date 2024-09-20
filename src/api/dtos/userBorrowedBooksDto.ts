import { IsArray, IsNumber, IsString } from "class-validator";

export class UserBorrowedBooksDto {
    
    @IsArray()
    previous!: PreviouslyBorrowedBookDto[]

    @IsArray()
    present!: PresentBorrowedBookDto[]
}

class PreviouslyBorrowedBookDto {

    @IsString()
    name!:string

    @IsNumber()
    score!:number
}

class PresentBorrowedBookDto {

    @IsString()
    name!:string
}