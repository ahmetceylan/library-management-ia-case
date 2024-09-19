import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user";
import { BookEntity } from "./book";

@Entity("borrowed_books")
export class BorrowedBookEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    bookId: number;

    @ManyToOne(() => BookEntity, book => book.borrowedBooks)
    @JoinColumn({name:"bookId"})
    book: BookEntity;

    @Column({ type: 'int' })
    userId: number;

    @ManyToOne(() => UserEntity, user => user.borrowedBooks)
    @JoinColumn({name:"userId"})
    user: UserEntity;

    @Column({type:"int", nullable:true, default:null})
    score: number;

    @Column({type:"boolean", default:false})
    isReturned: boolean;
}