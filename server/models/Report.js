"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
var mongoose_1 = require("mongoose");
var ReportSchema = new mongoose_1.default.Schema({
    imageUrl: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "IN_PROGRESS", "COMPLETED"], default: "PENDING" },
}, { timestamps: true });
exports.Report = mongoose_1.default.model("reports", ReportSchema);
