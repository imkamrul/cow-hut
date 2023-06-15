import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../../config";
import handleZodError from "../errors/ZodError";
import { IGenericErrorMessage } from "../errors/error.interface";
export const globalErrorHandler: ErrorRequestHandler = (
  error,

  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("global-error :", error.name, error.message);
  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};
