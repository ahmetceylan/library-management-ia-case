import { BookDataDto } from "../../dtos/bookDataDto";
import { BookEntity } from "../../entities";


export default class BookDtoMapper {
  public static toBookDto(book: BookEntity): BookDataDto {
    console.log("AHMET toBookDto: ", book)
    const bookResponse: BookDataDto = {
      id: book.id,
      name: book.name,
      score: book?.score
    };
    return bookResponse;
  }

  public static toList(books: BookEntity[]): BookDataDto[] {
    return books.map((book) => ({
      id: book.id,
      name: book.name,
      score: book?.score
    }));
  }
}
