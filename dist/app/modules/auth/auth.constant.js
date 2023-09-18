"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchableFields = exports.userFilterOptions = exports.status = exports.role = void 0;
exports.role = ["buyer", "admin", "seller", "visitor"];
exports.status = ["inactive", "active", "block"];
exports.userFilterOptions = ["role", "status", "name", "searchTerm"];
exports.userSearchableFields = [
    "name",
    "email",
    "phoneNumber",
    "role",
    "status",
];
