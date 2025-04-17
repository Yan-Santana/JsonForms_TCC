import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  console.log(`[${NODE_ENV}] ${req.method} ${req.path}`);
  next();
};
