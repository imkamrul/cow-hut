import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import { paginationFields } from "../../common/pagination";
import pick from "../../common/pick";
import sendResponse from "../../common/response";
import { cowFilterOptions } from "./cow.constant";
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
    const cowData = req.body;
    const result = await saveCow(cowData);

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
    const filters = pick(req.query, cowFilterOptions);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllCows(filters, paginationOptions);

    sendResponse<ICow[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cows retrieved successfully",
      meta: result?.meta,
      data: result?.data,
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
