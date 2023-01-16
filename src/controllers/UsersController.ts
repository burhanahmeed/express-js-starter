import { Request, Response } from 'express'
import BaseController from './BaseController';
import {Users} from '../services/UserService';

export default class UserController extends BaseController {
  public static async get(req: Request, res: Response) {
    try {
      const { id }: any = req.params;
      const resp = await Users.getById(id)

      res.json({
        status: 'success',
        data: resp
      })
    } catch (error: any) {
      res.status(error.status || 500).json({
        status: 'error',
        error
      })
    }
  }

  public static async list(req: Request, res: Response) {
    try {
      const { page, size, search }: any = req.query;
      const resp = await Users.listWithPagination({
        search, page, size
      })

      const result = UserController.getPagingData(resp, (page || 1), (size || 25));
      
      
      res.json({
        status: 'success',
        ...result
      })
    } catch (error: any) {
      console.log(error);
      res.status(error.status || 500).json({
        status: 'error',
        error: error.toString()
      })
    }
  }

  public static create() {
    
  }

  public static update() {
    
  }

  public static delete() {
    
  }

  public static auth() {
    
  }

  public static updatePassword() {
    
  }
}
