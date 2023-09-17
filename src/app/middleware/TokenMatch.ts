import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { verifyToken } from "../common/jwtHelpeer";
import ApiError from "../errors/ApiError";
import { User } from "../modules/auth/auth.model";
export const tokenMatch =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      let verifiedUser = null;

      verifiedUser = verifyToken(token, config.jwt.secret as Secret);
      const findUser = await User.findOne({
        _id: verifiedUser?.id,
        role: verifiedUser?.role,
        token: token,
      });
      if (!findUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
