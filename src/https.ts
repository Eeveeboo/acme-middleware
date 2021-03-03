
import https from 'https';
import tls from "tls";
import { CertPath } from './AcmeExpress';
import { loadCert } from './certificate/loadCert';
import { checkDefaultCert } from './certificate/defaultCert';


export default function createSSLServer(app: any, cert: CertPath, production: boolean) {

    checkDefaultCert(cert.localCertPath, cert.localKeyPath);

    const server = https.createServer({
        SNICallback: (servername, cb) => {

            if (servername === "localhost") {
                cb(null, tls.createSecureContext({
                    cert: cert.localCertPath,
                    key: cert.localKeyPath
                }))
                return;
            }

            loadCert(servername, production)
                .then(ctx => {
                    cb(null, ctx)
                })
                .catch(err => {
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
