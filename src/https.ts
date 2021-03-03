
import https from 'https';
import tls from "tls";
import { CertPath } from './AcmeExpress';
import { loadCert } from './certificate/loadCert';
import { checkDefaultCert } from './certificate/defaultCert';
import fs from "fs";


export default function createSSLServer(app: any, cert: CertPath, production: boolean, challengePath:string, firstDomainNameOnly:boolean, domainnames?:string[]) {

    var firstDomainName = "";

    checkDefaultCert(cert.localCertPath, cert.localKeyPath);

    cert.localCertPath = <any>fs.readFileSync(cert.localCertPath, "utf8");
    cert.localKeyPath = <any>fs.readFileSync(cert.localKeyPath, 'utf8');

    const server = https.createServer({
        SNICallback: (servername, cb) => {

            if (servername === "localhost" || 
            (firstDomainNameOnly && firstDomainName && firstDomainName != servername) || 
            (domainnames && domainnames.indexOf(servername) == -1)) {
                cb(null, tls.createSecureContext({
                    cert: cert.localCertPath,
                    key: cert.localKeyPath
                }))
                return;
            }

            loadCert(challengePath, servername, production)
                .then(ctx => {
                    firstDomainName = servername;
                    cb(null, ctx)
                })
                .catch(err => {
                    console.error(err);
                    cb(null, tls.createSecureContext({
                        cert: cert.localCertPath,
                        key: cert.localKeyPath
                    }))
                })
        },
        sessionTimeout: 15000
    }, app);
    return server;
}
