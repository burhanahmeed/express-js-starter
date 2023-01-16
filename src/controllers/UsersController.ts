import { Request, Response } from 'express'
import BaseController from './BaseController';
import { Users } from '../services/UserService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_KEY } from '../constants/auth';

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

  public static async create(req: Request, res: Response) {
    try {
      const resp = await Users.create(req.body);

      res.json({
        status: 'success',
        data: resp
      })
    } catch (error: any) {
      console.log(error);
      res.status(error.status || 500).json({
        status: 'error',
        error: error.toString()
      })
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const resp = await Users.update(Number(req.params.id), req.body);

      res.json({
        status: 'success',
        data: resp
      })
    } catch (error: any) {
      console.log(error);
      res.status(error.status || 500).json({
        status: 'error',
        error: error.toString()
      })
    }
  }

  public static async delete(req: Request, res: Response) {

  }

  public static async auth(req: Request, res: Response) {
     try {
      const resp = await Users.getByEmailOrUsername(req.body.username, {
        withPassword: true
      });

      if (!resp) {
        throw new Error('Username, email, atau password salah');
      }

      const isSuccess = bcrypt.compareSync(req.body.password, resp.password);

      if (!isSuccess) {
        throw new Error('Username, email, atau password salah');
      }

      const token = jwt.sign(resp, JWT_KEY, { expiresIn: 9999999999 });

      res.json({
        status: 'success',
        data: {
          token,
          ...resp
        }
      })
    } catch (error: any) {
      res.status(error.status || 500).json({
        status: 'error',
        error: error.toString()
      })
    }
  }

  public static async me(req: Request, res: Response) {
    try {
      const resp = await Users.update(Number(req.params.id), req.body);

      res.json({
        status: 'success',
        data: resp
      })
    } catch (error: any) {
      console.log(error);
      res.status(error.status || 500).json({
        status: 'error',
        error: error.toString()
      })
    }
  }

  public static async updatePassword(req: Request, res: Response) {
     try {
      const resp = await Users.update(Number(req.params.id), {
        password: req.body.password
      });

      res.json({
        status: 'success',
        data: resp
      })
    } catch (error: any) {
      console.log(error);
      res.status(error.status || 500).json({
        status: 'error',
        error: error.toString()
      })
    }
  }
}
