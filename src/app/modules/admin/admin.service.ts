import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { createToken } from "../../common/jwtHelpeer";
import ApiError from "../../errors/ApiError";
import { IAdmin, ILogInUser, ILoginUserResponse } from "./admin.interface";
import { Admin } from "./admin.model";
export const saveAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const result = await Admin.create(admin);
  return result ? await Admin.findById(result._id).select("-password") : null;
};
export const logInUser = async (
  payload: ILogInUser
): Promise<ILoginUserResponse | null> => {
  const { phoneNumber, password } = payload;
  // check user exist or not
  const isUserExist = await Admin.isAdminExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Phone Number/Password is incorrect"
    );
  }
  const { id, role } = isUserExist;
  const accessToken = createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
