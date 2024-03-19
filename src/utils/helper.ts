import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

export const handleAsync = (callback: AsyncRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const hashPassword = async function (password: string): Promise<string> {
  const saltRound = 12;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

// Custom Error class to handle application errors
class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the correct prototype chain is maintained
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Global error handling middleware
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Default to 500 (Internal Server Error) if status code is not set
  const statusCode = err?.statusCode || 500;

  return res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
