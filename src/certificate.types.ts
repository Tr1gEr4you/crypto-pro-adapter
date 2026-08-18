/**
 * Методы сырого сертификата
 */
export interface RawCertificateMethods {
    BasicConstraints: () => Promise<unknown>;
    Display: () => Promise<unknown>;
    Export: () => Promise<unknown>;
    ExtendedKeyUsage: () => Promise<unknown>;
    GetInfo: () => Promise<unknown>;
    HasPrivateKey: () => Promise<unknown>;
    Import: () => Promise<unknown>;
    IsValid: () => Promise<unknown>;
    KeyUsage: () => Promise<unknown>;
    PublicKey: () => Promise<unknown>;
    Extensions: () => Promise<unknown>;
    AdditionalStore: () => Promise<unknown>;
    FindPrivateKey: () => Promise<unknown>;
}

/**
 * Свойства сырого сертификата
 */
export interface RawCertificateProperties {
    Archived: Promise<string>;
    IssuerName: Promise<string>;
    PrivateKey: Promise<string>;
    SerialNumber: Promise<string>;
    SubjectName: Promise<string>;
    Thumbprint: Promise<string>;
    ValidFromDate: Promise<string>;
    ValidToDate: Promise<string>;
    Version: Promise<string>;
}

/**
 * Сырой сертификат
 */
export type RawCertificate = RawCertificateProperties & RawCertificateMethods;

/**
 * Обертка над сырым сертификатом
 */
export interface CertificateProperties {
    thumbprint: string;
    issuerName: string;
    serialNumber: string;
    version: string;
    email: string;
    commonName: string;
    inn: string;
    snils: string;
    validToDate: string;
    validFromDate: string;
}
