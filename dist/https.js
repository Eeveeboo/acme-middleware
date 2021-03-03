"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const tls_1 = __importDefault(require("tls"));
const loadCert_1 = require("./certificate/loadCert");
const defaultCert_1 = require("./certificate/defaultCert");
function createSSLServer(app, cert, production) {
    defaultCert_1.checkDefaultCert(cert.localCertPath, cert.localKeyPath);
    const server = https_1.default.createServer({
        SNICallback: (servername, cb) => {
            if (servername === "localhost") {
                cb(null, tls_1.default.createSecureContext({
                    cert: cert.localCertPath,
                    key: cert.localKeyPath
                }));
                return;
            }
            loadCert_1.loadCert(servername, production)
                .then(ctx => {
                cb(null, ctx);
            })
                .catch(err => {
                cb(null, tls_1.default.createSecureContext({
                    cert: cert.localCertPath,
                    key: cert.localKeyPath
                }));
            });
        },
        sessionTimeout: 15000
    }, app);
    return server;
}
exports.default = createSSLServer;
