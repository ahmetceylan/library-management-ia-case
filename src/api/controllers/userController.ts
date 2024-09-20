import { Request, Response } from 'express';
import UserService from '../services/userService';
import { UserDataDto } from '../dtos/userDataDto';
import { CreateUserDto } from '../dtos';

class UserController {
  constructor() {}

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users: UserDataDto[] = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(err.status).send({msg: err.message, type: err.type})
    }
  }

  getUserById = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await UserService.getUserById(parseInt(userId));
      res.status(200).json(user);
    } catch (err: any) {
      res.status(err.status).send({msg: err.message, type: err.type})
    }
  }

  insertUser = async (req: Request, res: Response) => {
    try {
      const userRequest = req.body as CreateUserDto;
      await UserService.addUser(userRequest);
      res.status(201).send('');
    } catch (err: any) {
      res.status(err.status).send({msg: err.message, type: err.type})
    }
  }

  updateUser = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  }

  deleteUser = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  }
}

export default new UserController();