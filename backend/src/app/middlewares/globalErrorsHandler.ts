import { Request, Response, NextFunction } from "express";// Adjust path if needed
import AppError from "../errors/AppError";

const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
};

export default globalErrorHandler;
