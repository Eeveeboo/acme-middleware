/// <reference types="node" />
declare function remove(challengePath: string, domain: string): void;
declare function save(challengePath: string, domain: string, fileName: string, content: Buffer | string): void;
declare function load(challengePath: string, domain: string, fileName: string): Buffer;
declare function exists(challengePath: string, domain: string, fileName: string): boolean;
declare const certificate: {
    save: typeof save;
    load: typeof load;
    exists: typeof exists;
    remove: typeof remove;
};
export default certificate;
