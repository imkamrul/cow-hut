import { IUserRole, IUserStatus } from "./auth.interface";

export const role: IUserRole[] = ["buyer", "admin", "seller", "visitor"];
export const status: IUserStatus[] = ["inactive", "active", "block"];
export const userFilterOptions = ["role", "status", "name", "searchTerm"];
export const userSearchableFields = [
  "name",
  "email",
  "phoneNumber",
  "role",
  "status",
];
