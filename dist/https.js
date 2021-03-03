"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const tls_1 = __importDefault(require("tls"));
const loadCert_1 = require("./certificate/loadCert");
const defaultCert_1 = require("./certificate/defaultCert");
function createSSLServer(app, cert, production, challengePath, firstDomainNameOnly, domainnames) {
    var firstDomainName = "";
    defaultCert_1.checkDefaultCert(cert.localCertPath, cert.localKeyPath);
    const server = https_1.default.createServer({
        SNICallback: (servername, cb) => {
            if (servername === "localhost" ||
                (firstDomainNameOnly && firstDomainName && firstDomainName != servername) ||
                (domainnames && domainnames.indexOf(servername) == -1)) {
                try {
                    cb(null, tls_1.default.createSecureContext({
                        cert: cert.localCertPath,
                        key: cert.localKeyPath
                    }));
                }
                catch (e) {
                    console.error(e);
                }
                return;
            }
            loadCert_1.loadCert(challengePath, servername, production)
                .then(ctx => {
                firstDomainName = servername;
                cb(null, ctx);
            })
                .catch(err => {
                console.error(err);
                try {
                    cb(null, tls_1.default.createSecureContext({
                        cert: cert.localCertPath,
                        key: cert.localKeyPath
                    }));
                }
                catch (e) {
                    console.error(e);
                }
            });
        },
        sessionTimeout: 15000
    }, app);
    return server;
}
exports.default = createSSLServer;
