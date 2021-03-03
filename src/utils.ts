import fs from "fs";
import path from "path";

export function dirCheckup(challengePath:string) {
    const aePath = challengePath;

    if (!aePath) {

        return false;
    }

    if (!fs.existsSync(aePath)) {

        try {
            fs.mkdirSync(aePath);
        } catch (err) {

            console.warn(`Unable to create working directory at ${aePath}. You need to create it yourself`)
            return false;
        }
    }

    if (!fs.existsSync(path.join(aePath, "acme-challenge"))) {

        try {
            fs.mkdirSync(path.join(aePath, "acme-challenge"));
        } catch (err) {

            console.warn(`Unable to create acme-challenge directory at ${path.join(aePath, "acme-challenge")}. You need to create it yourself`)
            return false;
        }
    }
}