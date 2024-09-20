import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { BorrowedBookEntity } from './borrowedBook';

@Entity("books")
export class BookEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"text", nullable:false, default:""})
    name: string;

    @Column({type:"int", nullable:true, default:null})
    score: number;
    
    @OneToMany(() => BorrowedBookEntity, borrowedBook => borrowedBook.book)
    borrowedBooks: BorrowedBookEntity[];
}