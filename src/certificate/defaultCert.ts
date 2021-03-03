import fs from "fs";
import acme from "acme-client";
import path from 'path';
import mkdirp from 'mkdirp';

export async function checkDefaultCert(certhPath: string, keyPath: string) {

    if (!fs.existsSync(certhPath) || !fs.existsSync(keyPath)) {

        mkdirp.sync(path.dirname(certhPath));
        mkdirp.sync(path.dirname(keyPath));

        // generate an RSA key pair synchronously
        // *NOT RECOMMENDED*: Can be significantly slower than async and may block
        // JavaScript execution. Will use native Node.js 10.12.0+ API if possible.
        const privateKey = await acme.forge.createPrivateKey();

        const publicKey = await acme.forge.createPublicKey(privateKey);

        const [certificateKey, certificateCsr] = await acme.forge.createCsr({
            commonName: 'localhost',
            altNames: ['localhost']
        });

        //fs.writeFileSync("./generatedPrivateKey.pem", privateKey);
        fs.writeFileSync(certhPath, certificateKey);
        fs.writeFileSync(keyPath, publicKey);
    }
}

