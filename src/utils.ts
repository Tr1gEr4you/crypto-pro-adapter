const TIMEOUT = 15000;
const CHECK_INTERVAL = 100;

export async function waitForPlugin(timeout: number = TIMEOUT): Promise<void> {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const checkPlugin = () => {
            if (window.cadesPlugin) {
                resolve();
                return;
            }

            if (Date.now() - startTime > timeout) {
                reject(new Error(`Cades Plugin не был инициализирован за ${timeout}ms`));
                return;
            }

            setTimeout(checkPlugin, CHECK_INTERVAL);
        };

        checkPlugin();
    });
}
