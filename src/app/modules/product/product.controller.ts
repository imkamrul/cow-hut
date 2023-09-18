import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import { paginationFields } from "../../common/pagination";
import pick from "../../common/pick";
import sendResponse from "../../common/response";
import ApiError from "../../errors/ApiError";
import { productFilterOptions } from "./product.constat";
import { IProduct } from "./product.interface";
import {
  deleteProduct,
  findAllProduct,
  getSingleProduct,
  multipleProductDelete,
  saveDummyProducts,
  saveProduct,
  updateProduct,
} from "./product.service";

export const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const image: any = req.files?.img_url;
    const userData = req.body;
    const result = await saveProduct(userData, image);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product save successfully",
      data: result,
    });
  }
);

export const getProductById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleProduct(id);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product retrieved successfully",
      data: result,
    });
  }
);
export const deleteProductById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    if (!user)
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    const result = await deleteProduct(id, user);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product deleted successfully",
      data: result,
    });
  }
);
export const updateProductById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    const image: any = req.files?.img_url;
    const productData = req.body;
    if (!user)
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    const result = await updateProduct(id, user, productData, image);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product deleted successfully",
      data: result,
    });
  }
);

export const generateDummyData: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const sellerId = String(req.query.sellerId);
    const dataNumber = String(req.query.dataNumber);
    if (!sellerId || !dataNumber)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Seller id or dataNumber is required"
      );
    const result = await saveDummyProducts(dataNumber, sellerId);

    sendResponse<IProduct[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `${dataNumber} Product save successfully`,
      data: result,
    });
  }
);
export const bulkDeleteProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const ids = req.body.ids;
    const result = await multipleProductDelete(ids);

    sendResponse<IProduct[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `${result} Product deleted successfully`,
      data: null,
    });
  }
);

export const getAllProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, productFilterOptions);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await findAllProduct(filters, paginationOptions);
    sendResponse<IProduct[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      meta: result?.meta,
      data: result?.data,
    });
  }
);
