import express, { Express } from "express";
import createSSLServer from "./https";
import https from "https";
import getAcmePath from "./pathUtils";

import { createCertWithWildcardHandler } from "./handlers/createCertHandler";
import { dirCheckup } from "./utils";
import { CertificateStore } from "./store/types";
import CertStore from "./store";

import path from 'path';
import mkdirp from 'mkdirp';

export interface CertPath {
    localCertPath: string,
    localKeyPath: string
}

export class AcmeExpress {

    private app: Express;
    private https: https.Server;
    private challengePath: string;
    private redirectHTTP: boolean;

    constructor(props: {
        app: any,
        store?: CertificateStore,
        email: string,
        cert: CertPath,
        challengePath?: string,
        redirectHTTP?: boolean,
        production?: boolean
    }) {
        this.app = props.app;
        this.https = createSSLServer(props.app, props.cert, props.production || false);
        this.challengePath = props.challengePath || "acme-middleware";
        this.redirectHTTP = props.redirectHTTP || false;

        props.store && (CertStore.setStore(props.store));

        this.initate();
    }

    private initate = () => {

        dirCheckup(this.challengePath);

        this.app.use(
            '/.well-known/acme-challenge',
            express.static(getAcmePath(this.challengePath, 'acme-challenge'))
        );

        this.app.use((req,res,next)=>{
            if(!this.redirectHTTP || req.protocol == "https") return next();
            res.redirect('https://' + req.headers.host + req.url);
        });

        // Use `/_init-cert-wildcard` to request challenges
        // Use /_init-cert-wildcard?process=true to submit
        // Use /_init-cert-wildcard?force=true to create or replace
        // this.app.get("/_init-cert-wildcard", createCertWithWildcardHandler);
    }

    getApp() {
        return this.app;
    }

    /**
     * Start the server
     * @param opts 
     * @param callback 
     */
    listen(opts?: {
        host?: string,
        port?: number,
        httpsPort?: number
    } | Function, callback?: Function) {

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