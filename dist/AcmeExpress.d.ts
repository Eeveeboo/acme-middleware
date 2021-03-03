/// <reference types="node" />
import express from "express";
import https from "https";
import { CertificateStore } from "./store/types";
export interface CertPath {
    localCertPath: string;
    localKeyPath: string;
}
export declare class AcmeExpress {
    private app;
    private https;
    private challengePath;
    private redirectHTTP;
    constructor(props: {
        app: any;
        store?: CertificateStore;
        email: string;
        cert: CertPath;
        challengePath?: string;
        redirectHTTP?: boolean;
        production?: boolean;
        domainnames?: string[];
        firstDomainNameOnly?: boolean;
    });
    private initate;
    getApp(): express.Express;
    /**
     * Start the server
     * @param opts
     * @param callback
     */
    listen(opts?: {
        host?: string;
        port?: number;
        httpsPort?: number;
    } | Function, callback?: Function): {
        http: import("http").Server;
        https: https.Server;
    };
}
