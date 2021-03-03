import { CertificateStore } from "./types";
declare const CertStore: {
    getStore: (challengePath: string) => CertificateStore;
    setStore: (store: CertificateStore) => void;
};
export default CertStore;
