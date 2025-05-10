import express from 'express';
import multer from 'multer';
import { handleDetectionUpload } from '../controllers/detection.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  upload.single('file'),
  async (req, res) => {
    await handleDetectionUpload(req, res);
  }
);

export default router;
