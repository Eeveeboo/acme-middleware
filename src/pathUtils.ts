import path from "path";
import mkdirp from "mkdirp";

export default function getAcmePath(acmePath: string, ...paths: string[]) {
    mkdirp(path.dirname(acmePath));
    return path.join(acmePath, ...paths);
}
