import { IsNumber, IsString, ValidateNested } from "class-validator";
import { UserBorrowedBooksDto } from "./userBorrowedBooksDto";

export class UserDto {
    
    @IsNumber()
    id!:number

    @IsString()
    name!:string

    @ValidateNested()
    books?: UserBorrowedBooksDto
}