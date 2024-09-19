import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor() {}

  getAllUsers = async (req: Request, res: Response) => {
    
  }

  getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    
    res.status(200).json({});
  }

  insertUser = async (req: Request, res: Response) => {
    const userRequest = req.body;
    
    res.status(201).send('');
  }

  updateUser = async (req: Request, res: Response) => {
    res.status(200).send('update user');
  }

  deleteUser = async (req: Request, res: Response) => {
    res.status(200).send('Delete users');
  }

}

export default new UserController();