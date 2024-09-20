import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../entities/user';
import AppDataSource from '../datastore/config';
import userBorrowedBookService from './userBorrowedBookService';
import { UserDataDto } from '../dtos/userDataDto';
import UserMapper from './mappers/userDtoMapper';
import { CreateUserDto } from '../dtos';
import { NotFoundError } from '../helpers/errors/notFoundError';

class UserService {
  public getRepository(): Repository<UserEntity> {
    return AppDataSource.getInstance().getRepository(UserEntity)
  }

  public async getAllUsers(): Promise<UserDataDto[]> {
    const data: UserEntity[] = await this.getRepository().find();
    return UserMapper.toList(data);
  }

  public async getUserById(id: number) {
    const user: UserEntity | null = await this.checkAndGetIfUserExist(id);

    const usersBooksWithNames = await userBorrowedBookService.getRepository().find({
      where: { userId: user.id },
      relations: ['book'],
    });

    user.borrowedBooks = usersBooksWithNames;
    const userResponse = UserMapper.toUserDto(user);
    return userResponse;
  }

  public async addUser(userRequest: CreateUserDto) {
    const userEntity: UserEntity = new UserEntity();
    userEntity.name = userRequest.name;
    await this.getRepository().insert(userEntity); 
  }

  public async updateUser(id: number, partialUser: Partial<UserEntity>) {
    await this.checkAndGetIfUserExist(id);
    await this.getRepository().update(id, partialUser);

  }
  public async deleteUser(id: number) {
    await this.getRepository().delete(id);
    
  }

  public async checkAndGetIfUserExist(userId: number): Promise<UserEntity> {
    const book = await this.getRepository().findOne({
      where: { id: userId },
      relations: [],
    } as FindOneOptions<UserEntity>);
    if (!book) throw new NotFoundError('User not found!');

    return book;
  }
}

export default new UserService()