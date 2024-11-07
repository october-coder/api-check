export const getQueryParams = (apiKey, apiUrl, modelName, modelTimeout, modelConcurrency) => {
    const params = new URLSearchParams(window.location.search);
    const settings = params.get('settings');
    if (settings) {
        try {
            const settingsObj = JSON.parse(decodeURIComponent(settings));
            if (settingsObj.key) {
                apiKey.value = settingsObj.key;
            }
            if (settingsObj.url) {
                apiUrl.value = settingsObj.url;
            }
            if (settingsObj.models) {
                modelName.value = settingsObj.models.join(',');
            }
            if (settingsObj.timeout) {
                modelTimeout.value = settingsObj.timeout;
            }
            if (settingsObj.concurrency) {
                modelConcurrency.value = settingsObj.concurrency;
            }
            if (!settingsObj.closeAnnouncement) {
                showToast();
            }
        } catch (e) {
            console.error('解析URL参数失败:', e);
        }
    }
};
