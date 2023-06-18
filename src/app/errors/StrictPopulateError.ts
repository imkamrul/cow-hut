import mongoose from "mongoose";
import { IGenericErrorMessage, IGenericErrorResponse } from "./error.interface";

const handleStrictPopulateError = (
  error: mongoose.Error.StrictPopulateError
): IGenericErrorResponse => {
  let errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "StrictPopulate Error",
    errorMessages: errors,
  };
};

export default handleStrictPopulateError;
