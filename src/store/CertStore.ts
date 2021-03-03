import getAcmePath from "../pathUtils";

import { CertificateStore } from "./types";
import { FsCertStore } from "./fs-store-driver";

var _certStore: CertificateStore|null = null;

const CertStore = {
    
    getStore: (challengePath:string) => {
        if(!_certStore){
            _certStore = new FsCertStore({
                path: getAcmePath(challengePath, "certStore")
            });
        }
       return _certStore;
    },

    setStore: (store: CertificateStore) => {
        _certStore = store;
    }
}

export default CertStore;
