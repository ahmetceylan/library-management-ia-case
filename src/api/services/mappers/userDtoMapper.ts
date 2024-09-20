import { UserDataDto } from '../../dtos/userDataDto';
import { UserDto } from '../../dtos';
import { BorrowedBookEntity, UserEntity } from '../../entities';

export default class UserDtoMapper {

  public static toUserDto(user: UserEntity): UserDto {
    const userBorrowedBooks = user.borrowedBooks;
    const previousBorrowedBooks = userBorrowedBooks.filter((book: BorrowedBookEntity) => book.score !== -1);
    const presentBorrowedBooks = userBorrowedBooks.filter((book: BorrowedBookEntity) => book.score === -1);

    const userDto: UserDto = {
      id: user.id,
      name: user.name,
      books: {
        previous: previousBorrowedBooks.map((borrowedBook: BorrowedBookEntity) => ({
          name: borrowedBook.book.name,
          score: borrowedBook.score,
        })),
        present: presentBorrowedBooks.map((borrowedBook) => ({
          name: borrowedBook.book.name,
        })),
      },
    };
    return userDto;
  }

  public static toList(users: UserEntity[]): UserDataDto[] {
    const usersdata: UserDataDto[] = users.map(
      (user) =>
        ({
          id: user.id,
          name: user.name,
        } as UserDataDto)
    );

    return usersdata;
  }
}
