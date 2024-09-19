import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BorrowedBookEntity } from "./borrowedBook";

@Entity("users")
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn("identity")
    id: number

    @Column({type:"varchar", length:255, nullable:false, default:""})
    name:string

    @OneToMany(() => BorrowedBookEntity, borrowedBook => borrowedBook.book)
    @JoinColumn({name:"borrowedBookId"})
    borrowedBooks: BorrowedBookEntity[];
}