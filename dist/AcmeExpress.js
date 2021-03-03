"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcmeExpress = void 0;
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("./https"));
const pathUtils_1 = __importDefault(require("./pathUtils"));
const utils_1 = require("./utils");
const store_1 = __importDefault(require("./store"));
class AcmeExpress {
    constructor(props) {
        this.initate = () => {
            utils_1.dirCheckup(this.challengePath);
            this.app.use('/.well-known/acme-challenge', express_1.default.static(pathUtils_1.default(this.challengePath, 'acme-challenge')));
            this.app.use((req, res, next) => {
                if (!this.redirectHTTP || req.protocol == "https")
                    return next();
                res.redirect('https://' + req.headers.host + req.url);
            });
            // Use `/_init-cert-wildcard` to request challenges
            // Use /_init-cert-wildcard?process=true to submit
            // Use /_init-cert-wildcard?force=true to create or replace
            // this.app.get("/_init-cert-wildcard", createCertWithWildcardHandler);
        };
        this.app = props.app;
        this.https = https_1.default(props.app, props.cert, props.production || false);
        this.challengePath = props.challengePath || "acme-middleware";
        this.redirectHTTP = props.redirectHTTP || false;
        props.store && (store_1.default.setStore(props.store));
        this.initate();
    }
    getApp() {
        return this.app;
    }
    /**
     * Start the server
     * @param opts
     * @param callback
     */
    listen(opts, callback) {
        let { host, port, httpsPort } = Object.assign({ host: 'localhost', port: 80, httpsPort: 443 }, opts);
        let fn = (typeof opts === "function" ? opts : callback);
        return {
            // @ts-ignore
            http: this.app.listen(port, host, () => fn && fn({ host, port, httpsPort })),
            // @ts-ignore
            https: this.https.listen(httpsPort, host, () => fn && fn({ host, port: httpsPort }))
        };
    }
}
exports.AcmeExpress = AcmeExpress;
