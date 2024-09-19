import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user';

export default class UserService {
  public static async getAllUsers() {

  }
  public static async getUserById(id: number) {

  }
  public static async addUser(user: UserEntity) {
    
  }

  public static async updateUser(id: number, partialUser: Partial<UserEntity>) {

  }
  public static async deleteUser(id: number) {
    
  }

  public static async checkAndGetIfUserExist(userId: number): Promise<UserEntity> {
    return {} as UserEntity
  }
}
