"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathUtils_1 = __importDefault(require("../pathUtils"));
const fs_store_driver_1 = require("./fs-store-driver");
var _certStore = null;
const CertStore = {
    getStore: (challengePath) => {
        if (!_certStore) {
            _certStore = new fs_store_driver_1.FsCertStore({
                path: pathUtils_1.default(challengePath, "certStore")
            });
        }
        return _certStore;
    },
    setStore: (store) => {
        _certStore = store;
    }
};
exports.default = CertStore;
