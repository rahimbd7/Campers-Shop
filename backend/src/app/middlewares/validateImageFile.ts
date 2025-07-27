import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError'; // Custom error class

export const validateImageFile = (maxSizeMB = 2) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next(); // No file uploaded → skip
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const fileMimeType = req.file.mimetype;
    const fileSizeInMB = req.file.size / (1024 * 1024);

    // ✅ Check MIME type
    if (!allowedMimeTypes.includes(fileMimeType)) {
      return next(
        new AppError(400, 'Invalid file type. Only JPEG, JPG, PNG, and WEBP are allowed.')
      );
    }

    // ✅ Check file size
    if (fileSizeInMB > maxSizeMB) {
      return next(
        new AppError(400, `File size exceeds ${maxSizeMB}MB limit.`)
      );
    }

    next();
  };
};
