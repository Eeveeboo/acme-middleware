/// <reference types="node" />
import tls from "tls";
export declare function loadCert(challengePath: string, servername: string, production: boolean, email?: string): Promise<tls.SecureContext>;
