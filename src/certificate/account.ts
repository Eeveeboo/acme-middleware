import acme from "acme-client";
import fs from "fs";
import path from "path";
import getAcmePath from "../pathUtils";

let accountKey: string  | undefined;

async function getOrCreateKey(challengePath:string) {

    if (accountKey) {
        return Promise.resolve(accountKey);
    }

    const keyPath = getAcmePath(challengePath, "accountKey.pem");

    if (!fs.existsSync(keyPath)) {
        let strBuff = await acme.forge.createPrivateKey();
        fs.writeFileSync(keyPath, strBuff, { encoding: "utf8" });
        accountKey = strBuff.toString("utf8");
    } else {
        accountKey = fs.readFileSync(keyPath, { encoding: "utf8" });
    }

    return accountKey;
}

export async function getClient(challengePath:string, production:boolean, email: string) {

    const accountKey = await getOrCreateKey(challengePath)

    /* Init client */
    const client = new acme.Client({
        directoryUrl: production ? acme.directory.letsencrypt.production : acme.directory.letsencrypt.staging,
        accountKey
    });

    /* Register account */
    await client.createAccount({
        termsOfServiceAgreed: true,
        contact: [`mailto:${email}`]
    });

    return client;
}