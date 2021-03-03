
import https from 'https';
import tls from "tls";
import { CertPath } from './AcmeExpress';
import { loadCert } from './certificate/loadCert';
import { checkDefaultCert } from './certificate/defaultCert';
import fs from "fs";


export default function createSSLServer(app: any, cert: CertPath, production: boolean, challengePath:string, firstDomainNameOnly:boolean, domainnames?:string[]) {

    var firstDomainName = "";

    checkDefaultCert(cert.localCertPath, cert.localKeyPath);

    const server = https.createServer({
        SNICallback: (servername, cb) => {

            if (servername === "localhost" || 
            (firstDomainNameOnly && firstDomainName && firstDomainName != servername) || 
            (domainnames && domainnames.indexOf(servername) == -1)) {
                try{cb(null, tls.createSecureContext({
                        cert: cert.localCertPath,
                        key: cert.localKeyPath
                    }))}catch(e){console.error(e)}
                return;
            }

            loadCert(challengePath, servername, production)
                .then(ctx => {
                    firstDomainName = servername;
                    cb(null, ctx)
                })
                .catch(err => {
                    console.error(err);
                    try{cb(null, tls.createSecureContext({
                        cert: cert.localCertPath,
                        key: cert.localKeyPath
                    }))}catch(e){console.error(e)}
                })
        },
        sessionTimeout: 15000
    }, app);
    return server;
}
