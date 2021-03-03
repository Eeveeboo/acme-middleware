import fs from "fs";
import getAcmePath from "../pathUtils";

export function createChallenge(challengePath:string, clientToken: string, accountToken: string) {
    fs.writeFileSync(getAcmePath(challengePath, `acme-challenge`, clientToken), `${accountToken}`);
}

export function removeChallenge(challengePath:string, clientToken: string) {

    fs.unlinkSync(getAcmePath(challengePath, `acme-challenge`, clientToken));

}