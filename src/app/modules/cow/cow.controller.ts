import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import { ICow } from "./cow.interface";
import {
  deleteCow,
  getAllCows,
  getSingleCow,
  saveCow,
  updateCow,
} from "./cow.service";
export const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await saveCow(userData);

    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cow created successfully",
      data: result,
    });
  }
);
export const getCows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllCows();

    sendResponse<ICow[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cows retrieved successfully",
      data: result,
    });
  }
);

export const getCowById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleCow(id);

    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cow retrieved successfully",
      data: result,
    });
  }
);
export const deleteCowById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await deleteCow(id);

    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cow deleted successfully",
      data: result,
    });
  }
);
export const updateCowById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await updateCow(id, updatedData);

    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cow updated successfully",
      data: result,
    });
  }
);
