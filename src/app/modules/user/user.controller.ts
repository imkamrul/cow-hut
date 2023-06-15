import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import { IUser } from "./user.interface";
import { saveUser } from "./user.service";

export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await saveUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users created successfully",
      data: result,
    });
  }
);
