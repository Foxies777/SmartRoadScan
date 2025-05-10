import ImageKit from 'imagekit';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const uploadImagesToImageKit = async (folderPath: string): Promise<any[]> => {
  const uploaded: any[] = [];
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const filePath = path.join(folderPath, file);
      const data = fs.readFileSync(filePath);

      const res = await imagekit.upload({
        file: data,
        fileName: file,
        folder: '/detections',
      });
      uploaded.push(res);
    }
  }

  return uploaded;
};
