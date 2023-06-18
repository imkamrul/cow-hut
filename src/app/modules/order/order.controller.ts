import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import { IOrder } from "./order.interface";
import { getAllOrder, saveOrder } from "./order.service";
export const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orderData = req.body;
    const result = await saveOrder(orderData);

    sendResponse<IOrder>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Order created successfully",
      data: result,
    });
  }
);
export const allOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orderData = req.body;
    const result = await getAllOrder();

    sendResponse<IOrder[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Orders retrieved successfully",
      data: result,
    });
  }
);
