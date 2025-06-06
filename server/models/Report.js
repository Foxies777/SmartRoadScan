"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
var mongoose_1 = require("mongoose");
var ReportSchema = new mongoose_1.default.Schema({
    imageUrl: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    area: {type: Number},
    confidence: {type: Number},
    status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"],
        default: "PENDING",
      },
    type: {type: String, enum: ["online", 'offline']}
}, { timestamps: true });
exports.Report = mongoose_1.default.model("reports", ReportSchema);
