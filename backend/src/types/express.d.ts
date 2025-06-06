import { User } from '../models/User.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      userId?: number;
    }
  }
}
