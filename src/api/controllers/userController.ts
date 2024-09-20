import { Request, Response } from 'express';
import UserService from '../services/userService';
import { UserDataDto } from '../dtos/userDataDto';
import { CreateUserDto } from '../dtos';

class UserController {
  constructor() {}

  getAllUsers = async (req: Request, res: Response) => {
    const users: UserDataDto[] = await UserService.getAllUsers();
    res.status(200).json(users);
  }

  getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await UserService.getUserById(parseInt(userId));
    res.status(200).json(user);
  }

  insertUser = async (req: Request, res: Response) => {
    const userRequest = req.body as CreateUserDto;
    await UserService.addUser(userRequest);
    res.status(201).send('');
  }

  updateUser = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  }

  deleteUser = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  }
}

export default new UserController();