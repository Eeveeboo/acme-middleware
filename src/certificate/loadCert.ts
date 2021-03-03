import tls from "tls";
import createCert from './createCert';
import certificate from './certificate';
import { getDomainName } from "./domainUtils";

export async function loadCert(challengePath:string, servername: string, production:boolean, email?: string): Promise<tls.SecureContext> {

    let domain = servername;//getDomainName(servername);

    const exists = certificate.exists(challengePath, domain, `key.pem`);

    if (!exists) {
        let altNames;
        servername === domain || servername.indexOf("_init-cert-wildcard") === 0 && (altNames = [`*.${domain}`]);
       await createCert({ challengePath, production, domain, email, altNames });
    }

    return tls.createSecureContext({
        key: certificate.load(challengePath, domain, `key.pem`),
        cert: certificate.load(challengePath, domain, `cert.pem`)
    })
}
