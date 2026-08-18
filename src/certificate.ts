import type { RawCertificate, CertificateProperties } from "./certificate.types";

/**
 * Класс обертка на сырым сертификатом
 */
export class Certificate {
    /**
     * Оригинальный сертификат прямиком из хранилища
     */
    public readonly original: RawCertificate;

    public readonly thumbprint: string;
    public readonly issuerName: string;
    public readonly serialNumber: string;
    public readonly version: string;
    public readonly email: string;
    public readonly commonName: string;
    public readonly inn: string;
    public readonly snils: string;
    public readonly validToDate: string;
    public readonly validFromDate: string;

    public constructor(rawCertificate: RawCertificate, data: CertificateProperties) {
        this.original = rawCertificate;

        this.thumbprint = data.thumbprint;
        this.issuerName = data.issuerName;
        this.serialNumber = data.serialNumber;
        this.version = data.version;
        this.email = data.email;
        this.commonName = data.commonName;
        this.inn = data.inn;
        this.snils = data.snils;
        this.validToDate = data.validToDate;
        this.validFromDate = data.validFromDate;
    }

    /**
     * Статический метод создания инстанса
     */
    public static async create(rawCertificate: RawCertificate) {
        const [thumbprint, issuerName, serialNumber, version, subjectName, validToDate, validFromDate] = await Promise.all([
            rawCertificate.Thumbprint,
            rawCertificate.IssuerName,
            rawCertificate.SerialNumber,
            rawCertificate.Version,
            rawCertificate.SubjectName,
            rawCertificate.ValidToDate,
            rawCertificate.ValidFromDate,
        ]);

        return new Certificate(rawCertificate, {
            thumbprint,
            issuerName,
            serialNumber,
            version,
            email: this.extractParamFromSubject(subjectName, "E"),
            commonName: this.extractParamFromSubject(subjectName, "CN"),
            inn: this.extractParamFromSubject(subjectName, "ИНН"),
            snils: this.extractParamFromSubject(subjectName, "СНИЛС"),
            validToDate,
            validFromDate,
        });
    }

    /**
     * Метод проверяет валидность сертификата
     */
    public isValid(): boolean {
        const validTo = new Date(this.validToDate);
        return new Date() <= validTo;
    }

    /**
     * Метод для подписания данных по текущему сертификату
     */
    public async signData(data: string, detached: boolean): Promise<string> {
        if (!window.cadesPlugin) throw new Error("Не загружен cades plugin");

        const base64Data = btoa(data);

        const signer = await window.cadesPlugin.CreateObjectAsync("CAdESCOM.CPSigner");
        await signer.propset_Certificate(this.original);
        await signer.propset_CheckCertificate(true);

        const signedData = await window.cadesPlugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
        await signedData.propset_ContentEncoding(window.cadesPlugin.CADESCOM_BASE64_TO_BINARY);
        await signedData.propset_Content(base64Data);

        const signature = await signedData.SignCades(signer, window.cadesPlugin.CADESCOM_CADES_BES, detached);

        if (detached) {
            return signature.toString().replace(/\r\n/g, "").replace(/\r/g, "").replace(/\n/g, "");
        }

        return signature;
    }

    /**
     * Приватный метод для извлечения данных из строки
     */
    private static extractParamFromSubject(input: string, paramName: string) {
        const regex = new RegExp(`${paramName}=([^,]+)`);
        const match = input.match(regex);
        return match?.[1]?.trim() ?? "";
    }
}
