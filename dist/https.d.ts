/// <reference types="node" />
import https from 'https';
import { CertPath } from './AcmeExpress';
export default function createSSLServer(app: any, cert: CertPath, production: boolean, challengePath: string): https.Server;
