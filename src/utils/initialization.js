export function initializeTheme(isDarkMode) {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode.value = savedTheme === 'dark';
    } else {
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.body.classList.toggle('dark-mode', isDarkMode.value);
    document.body.classList.toggle('light-mode', !isDarkMode.value);
}

export function initializeLanguage(locale, currentLanguage) {
    // 初始化语言
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
        locale.value = savedLocale;
        currentLanguage.value = savedLocale;
    } else {
        locale.value = 'zh'; // 默认语言为中文
        currentLanguage.value = 'zh';
    }
}
