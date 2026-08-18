import type { CertificateCollection } from "./certificate-collection";
import type { CertificateHelper } from "./certificate-helper";

export class CadesPlugin {
    public readonly certificateCollection: CertificateCollection;
    public readonly certificateHelper: CertificateHelper;

    public constructor(certificateCollection: CertificateCollection, certificateHelper: CertificateHelper) {
        this.certificateCollection = certificateCollection;
        this.certificateHelper = certificateHelper;
    }
}
