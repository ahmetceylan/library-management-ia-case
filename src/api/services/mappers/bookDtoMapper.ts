import { BookDataDto } from "../../dtos/bookDataDto";
import { BookEntity } from "../../entities";


export default class BookDtoMapper {
  public static toBookDto(book: BookEntity): BookDataDto {
    const bookResponse: BookDataDto = {
      id: book.id,
      name: book.name,
    };
    return bookResponse;
  }

  public static toList(books: BookEntity[]): BookDataDto[] {
    return books.map((book) => ({
      id: book.id,
      name: book.name,
    }));
  }
}
