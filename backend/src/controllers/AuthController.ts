import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User.entity';
import { AuthenticatedRequest } from '../middlewares/auth';

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const { password, ...userWithoutPassword } = req.user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar dados do usuário' });
    }
  }
}
