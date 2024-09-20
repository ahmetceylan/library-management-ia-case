import { IsNumber, IsString } from "class-validator";

export class UserDataDto {
    @IsNumber()
    id!:number

    @IsString()
    name!:string
}