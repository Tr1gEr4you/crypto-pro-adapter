import { Certificate } from "./certificate";
import type { RawCertificate } from "./certificate.types";
import { waitForPlugin } from "./utils";

/**
 * Коллекция сертификатов
 */
export class CertificateCollection {
    private certificates: Certificate[] = [];

    /**
     * Загрузка сертификатов из хранилища
     */
    public async loadCertificate() {
        try {
            await waitForPlugin();

            const store = await window.cadesPlugin.CreateObjectAsync("CAdESCOM.Store");
            await store.Open(
                window.cadesPlugin.CAPICOM_CURRENT_USER_STORE,
                window.cadesPlugin.CAPICOM_MY_STORE,
                window.cadesPlugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
            );

            const certificatesStore = await store.Certificates;
            const certificatesCount = await certificatesStore.Count;

            for (let i = 1; i <= certificatesCount; i++) {
                const rawCertificate = (await certificatesStore.Item(i)) as RawCertificate;

                const certificate = await Certificate.create(rawCertificate);

                this.certificates.push(certificate);
            }

            await store.Close();
        } catch (error) {
            throw new Error(`Не удалось загрузить сертификаты: ${error instanceof Error ? error.message : error}`);
        }
    }

    public getAll(): Certificate[] {
        return this.certificates;
    }

    public getCount(): number {
        return this.certificates.length;
    }

    public isEmpty(): boolean {
        return this.certificates.length === 0;
    }

    public getValid(): Certificate[] | undefined {
        return this.certificates.filter((certificate) => certificate.isValid);
    }

    public findByThumbprint(thumbprint: string): Certificate | undefined {
        return this.certificates.find((certificate) => certificate.thumbprint === thumbprint);
    }
}
