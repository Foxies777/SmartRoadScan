// server/controllers/detection.controller.ts
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import { Request, Response } from 'express';
import { exec } from 'child_process';
import { v4 as uuidv4 } from 'uuid';

export const handleDetectionUpload = async (req: Request, res: Response) => {
  try {
    const zipFile = req.file;
    if (!zipFile) return res.status(400).json({ error: 'No file uploaded' });

    const tempId = uuidv4();
    const extractPath = path.join(__dirname, '../../temp', tempId);
    fs.mkdirSync(extractPath, { recursive: true });

    await fs.createReadStream(zipFile.path)
      .pipe(unzipper.Extract({ path: extractPath }))
      .promise();

    const videoPath = path.join('/app/temp', tempId, 'roadvideo.mov');
    const jsonPath = path.join('/app/temp', tempId, 'roadvideo.json');

    const envPath = path.join(__dirname, '../.env');
    console.log(envPath);
    
    const cmd = `docker run --rm --env-file "${envPath}" -v "${path.join(__dirname, '../../temp')}:/app/temp" smartroadscan-detector python detection.py --video "${videoPath}" --json "${jsonPath}"`;

    exec(cmd, { cwd: path.join(__dirname, '../../') }, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Detection error:', stderr);
        return res.status(500).json({ error: 'Detection script failed', details: stderr });
      }
      console.log('✅ Detection output:\n', stdout);
      return res.status(200).json({ message: 'Detection complete' });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
