
/**
 * 检查是否有新版本发布
 * @param {string} currentVersion - 当前版本号
 * @param {string} owner - GitHub 仓库所有者用户名
 * @param {string} repo - GitHub 仓库名称
 * @param {function} t - 国际化函数，用于日志输出中的国际化
 * @returns {Promise<Object|null>} 如果有新版本，返回更新信息对象；否则返回 null
 */
export async function checkForUpdates(currentVersion, owner, repo, t) {
    const lastCheck = localStorage.getItem('lastUpdateCheck');
    const now = Date.now();
    const CHECK_INTERVAL = 12 * 60 * 60 * 1000; // 12 小时

    if (lastCheck && now - lastCheck < CHECK_INTERVAL) {
        // 最近已检查过，不需要再次检查
        return null;
    }

    // 保存当前检查时间
    localStorage.setItem('lastUpdateCheck', now);

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error(t('UPDATE_CHECK_FAILED'));
            return null;
        }
        const data = await response.json();
        const latestVersion = data.tag_name.replace(/^v/, ''); // 去除版本号前的 'v' 字符

        // 比较版本号
        if (isNewerVersion(latestVersion, currentVersion)) {
            return {
                hasUpdate: true,
                latestVersion: latestVersion,
                releaseNotes: data.body, // 发布说明
                htmlUrl: data.html_url,  // 发布页面链接
            };
        } else {
            return {
                hasUpdate: false,
            };
        }
    } catch (error) {
        console.error(t('UPDATE_CHECK_ERROR'), error);
        return null;
    }
}

/**
 * 比较版本号，判断是否有新版本
 * @param {string} latest - 最新版本号
 * @param {string} current - 当前版本号
 * @returns {boolean} 如果最新版本号大于当前版本号，返回 true；否则返回 false
 */
function isNewerVersion(latest, current) {
    const latestParts = latest.split('.').map(Number);
    const currentParts = current.split('.').map(Number);

    const length = Math.max(latestParts.length, currentParts.length);
    for (let i = 0; i < length; i++) {
        const latestNum = latestParts[i] || 0;
        const currentNum = currentParts[i] || 0;
        if (latestNum > currentNum) {
            return true;
        } else if (latestNum < currentNum) {
            return false;
        }
    }
    return false;
}
