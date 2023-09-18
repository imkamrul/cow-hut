import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";
export const imageUploader = async (image: any, folderName: string) => {
  if (!image.mimetype.startsWith("image/")) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Image type error");
  }

  if (image.size > 2 * 1024 * 1024) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Use lower size img");
  }
  try {
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        image.tempFilePath,
        {
          public_id:
            image.name.split(".")[0] + "_" + Math.floor(new Date().getTime()),
          folder: `ecommerce/${folderName}`,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    return result?.url;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Image error");
  }
};
