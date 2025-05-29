"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patronymic: { type: String, required: false },
    phone: { type: String, required: true },
    login: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", UserSchema);
