import { CadesPlugin } from "./cades-plugin";
import { CertificateCollection } from "./certificate-collection";
import { CertificateHelper } from "./certificate-helper";

const certificateCollection = new CertificateCollection();
const certificateHelper = new CertificateHelper();

const cadesPlugin = new CadesPlugin(certificateCollection, certificateHelper);

export { cadesPlugin };
