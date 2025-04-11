import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  formData: {},
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Submission', submissionSchema);
