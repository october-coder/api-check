import {appInfo, banner} from './info.js';
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
    } else {
        locale.value = 'zh'; // 默认语言为中文
    }
}
//打印控制台
export  function initConsole(){
    const message = `hello ? ️`;
    console.log(`%c  API CHECK v${appInfo.version} %c  ${appInfo.officialUrl} `, "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");
    console.log(banner);
    console.log(message +location.href);
    console.log(appInfo.author.name + ':' + appInfo.author.url);
    console.log(appInfo.coauthor.name + ':' + appInfo.coauthor.url);
}
