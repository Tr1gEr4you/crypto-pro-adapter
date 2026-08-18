/**
 * Класс хелпер для работы с сертификатами
 */
export class CertificateHelper {
    /**
     * Метод для проверки подписанных данных
     */
    public async verifySignature(data: unknown, signData: string, detached: boolean): Promise<Boolean> {
        const signedData = await window.cadesPlugin.CreateObjectAsync("CAdESCOM.CadesSignedData");

        await signedData.propset_ContentEncoding(window.cadesPlugin.CADESCOM_BASE64_TO_BINARY);
        await signedData.propset_Content(data);

        await signedData.VerifyCades(signData, window.cadesPlugin.CADESCOM_CADES_BES, detached);

        return true;
    }
}
