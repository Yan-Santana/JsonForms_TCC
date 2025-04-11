import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Submission from '../models/submissions.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const submission = new Submission({ userId: req.user.userId, formData: req.body });
  await submission.save();
  res.status(201).json({ message: 'Submissão salva' });
});

router.get('/mine', auth, async (req, res) => {
  const submissions = await Submission.find({ userId: req.user.userId });
  res.json(submissions);
});

export default router;
