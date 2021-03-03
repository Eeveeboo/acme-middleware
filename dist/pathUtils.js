"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mkdirp_1 = __importDefault(require("mkdirp"));
function getAcmePath(acmePath, ...paths) {
    mkdirp_1.default(acmePath);
    return path_1.default.join(acmePath, ...paths);
}
exports.default = getAcmePath;
