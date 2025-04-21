import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.entity';
import { AppDataSource } from '../config/database';

// Estendendo o tipo Request para incluir user
declare module 'express' {
  interface Request {
    user?: User;
  }
}

interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    group: 'Grupo A' | 'Grupo B';
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const register = async (req: RegisterRequest, res: Response) => {
  try {
    const { firstName, lastName, email, password, group } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      group,
    });

    await userRepository.save(user);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const login = async (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    const { password, ...userWithoutPassword } = req.user;
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
