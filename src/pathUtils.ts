import path from "path";
import mkdirp from "mkdirp";

export default function getAcmePath(acmePath: string, ...paths: string[]) {
    mkdirp(acmePath);
    return path.join(acmePath, ...paths);
}
