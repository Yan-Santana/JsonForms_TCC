import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  group: 'Grupo A' | 'Grupo B';
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  group: {
    type: String,
    required: true,
    enum: ['Grupo A', 'Grupo B'],
    default: 'Grupo A',
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
