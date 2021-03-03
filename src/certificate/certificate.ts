import fs from "fs";
import getAcmePath from "../pathUtils";

function remove(challengePath:string, domain: string) {
    fs.unlinkSync(getAcmePath(challengePath, domain, `key.pem`))
    fs.unlinkSync(getAcmePath(challengePath, domain, `cert.pem`))
}

function save(challengePath:string, domain: string, fileName: string, content: Buffer | string) {

    const dir = getAcmePath(challengePath, domain);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(getAcmePath(challengePath, domain, fileName), content);
}

function load(challengePath:string, domain: string, fileName: string) {
    const dir = getAcmePath(challengePath, domain);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    return fs.readFileSync(getAcmePath(challengePath, domain, fileName));
}

function exists(challengePath:string, domain: string, fileName: string) {
    return fs.existsSync(getAcmePath(challengePath, domain, fileName));
}

const certificate = {
    save,
    load,
    exists,
    remove
}

export default certificate;