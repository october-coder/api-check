<template>
  <div class="container">
    <div class="header">
      <!-- 主题切换按钮（左侧） -->
      <button id="themeToggle" aria-label="切换主题" @click="toggleTheme">
        <svg
            id="themeIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="transparent"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sun"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </button>

      <!-- 右侧图标容器 -->
      <div class="right-icons" @click="showLanguageMenu = false">
        <!-- 语言切换按钮 -->
        <div class="language-container" @click.stop="toggleLanguageMenu">
          <button aria-label="切换语言" class="language-btn">
            <!-- SVG 图标 -->
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" size="3">
              <path
                  d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
              ></path>
              <path
                  d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
              ></path>
              <path
                  d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
              ></path>
              <path
                  d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
              ></path>
              </svg>
          </button>

          <!-- 语言选择菜单 -->
          <div v-if="showLanguageMenu" class="language-menu">
            <button @click="setLanguage('zh')">中文</button>
            <button @click="setLanguage('en')">English</button>
          </div>
        </div>

        <!-- GitHub 图标按钮 -->
        <a
            href="https://github.com/GuooGaii/ip-geoaddress-generator"
            target="_blank"
            rel="noopener noreferrer"
            class="github-button"
        >
          <button aria-label="GitHub" class="github-btn">
            <!-- GitHub SVG 图标 -->
            <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                size="3"
            >
              <path
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </a>
      </div>
    </div>

    <h1>{{ t('API_CHECKER_TITLE') }}</h1>
    <h3>{{ t('API_CHECKER_SUBTITLE') }}</h3>

    <form @submit.prevent="handleSubmit" id="apiForm">
      <textarea
          v-model="apiInfo"
          id="api_info"
          name="api_info"
          :placeholder="t('API_INFO_PLACEHOLDER')"
      ></textarea>

      <input
          type="text"
          v-model="apiUrl"
          id="api_url"
          name="api_url"
          :placeholder="t('API_URL_PLACEHOLDER')"
      />

      <input
          type="text"
          v-model="apiKey"
          id="api_key"
          name="api_key"
          :placeholder="t('API_KEY_PLACEHOLDER')"
      />

      <div class="model-input-container" id="model-input-container">
        <textarea
            v-model="modelName"
            id="model_name"
            name="model_name"
            :placeholder="t('MODEL_NAME_PLACEHOLDER')"
        ></textarea>
        <button
            type="button"
            class="modern-button get-models large-button"
            @click="getModelList"
        >
          {{ t('GET_MODEL_LIST') }}
        </button>
      </div>

      <div id="modelCheckboxes"></div>

      <!-- 调整后的设置超时时间和并发数布局 -->
      <div class="model-timeout-concurrency">
        <div class="model-timeout">
          <label for="model_timeout">{{ t('SET_TIMEOUT') }}:</label>
          <input
              type="number"
              v-model="modelTimeout"
              id="model_timeout"
              name="model_timeout"
              min="1"
              :placeholder="t('TIMEOUT_PLACEHOLDER')"
          />
        </div>
        <div class="model-concurrency">
          <label for="model_concurrency">{{ t('SET_CONCURRENCY') }}:</label>
          <input
              type="number"
              v-model="modelConcurrency"
              id="model_concurrency"
              name="model_concurrency"
              min="1"
              :placeholder="t('CONCURRENCY_PLACEHOLDER')"
          />
        </div>
      </div>

      <div class="submit-container">
        <input
            type="button"
            :value="t('TEST_MODELS')"
            @click="testModels"
            class="modern-button submit-query"
        />
        <input
            type="button"
            :value="t('CHECK_QUOTA')"
            @click="checkQuota"
            class="modern-button check-quota"
        />
        <input
            type="button"
            :value="t('CLEAR_FORM')"
            @click="clearForm"
            class="modern-button clear-form"
        />
      </div>
    </form>

    <div class="copyright">
      <p>
        {{ t('GIVE_STAR') }}
        <a href="https://github.com/QAbot-zh/query-key" target="_blank">GitHub</a>
        <br />
        © 2024 by rick 和 megasoft
        <br />
        {{ t('CONTRIBUTORS') }}：
        <a href="https://linux.do/u/rick" target="_blank">
          <img
              src="https://linux.do/user_avatar/linux.do/rick/288/137821_2.png"
              alt="rick"
          />
          rick
        </a>
        <a href="https://linux.do/u/zhong_little" target="_blank">
          <img
              src="https://linux.do/user_avatar/linux.do/zhong_little/288/104887_2.png"
              alt="Megasoft"
          />
          Megasoft
        </a>
        <a href="https://linux.do/u/fangyuan99" target="_blank">
          <img
              src="https://linux.do/letter_avatar_proxy/v4/letter/f/b3f665/144.png"
              alt="fangyuan99"
          />
          fangyuan99
        </a>
        <a href="https://github.com/juzeon" target="_blank">
          <img
              src="https://avatars.githubusercontent.com/u/12206799?s=60&v=4"
              alt="juzeon"
          />
          juzeon
        </a>
      </p>
    </div>

    <div id="results" class="response-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// 引入国际化资源
const { t, locale } = useI18n();

// 定义响应式状态
const apiInfo = ref('');
const apiUrl = ref('');
const apiKey = ref('');
const modelName = ref('');
const modelTimeout = ref(10);
const modelConcurrency = ref(5);
const isDarkMode = ref(false);
const currentLanguage = ref(locale.value || 'zh');
const showLanguageMenu = ref(false);

// 主题切换方法
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  document.body.classList.toggle('light-mode', !isDarkMode.value);
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

// 语言切换菜单显示隐藏方法
const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
};

// 语言切换方法
const setLanguage = (language) => {
  locale.value = language;
  currentLanguage.value = language;
  localStorage.setItem('locale', language);
  showLanguageMenu.value = false; // 切换语言后隐藏菜单
};

// 页面加载时初始化主题和语言
onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode.value = prefersDark;
  }
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  document.body.classList.toggle('light-mode', !isDarkMode.value);

  // 初始化语言
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    locale.value = savedLocale;
    currentLanguage.value = savedLocale;
  } else {
    locale.value = 'zh'; // 默认语言为中文
    currentLanguage.value = 'zh';
  }
});

// 其他表单操作方法
const getModelList = () => {
  console.log('获取模型列表');
};

const testModels = () => {
  console.log('测试模型');
};
const checkQuota = () => {
  console.log('检查额度');
};

const clearForm = () => {
  apiInfo.value = '';
  apiUrl.value = '';
  apiKey.value = '';
  modelName.value = '';
  modelTimeout.value = 10;
  modelConcurrency.value = 5;
};

const handleSubmit = () => {
  console.log('表单提交');
};
</script>

<style scoped>
/* 通用样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 580px;
  background-color: var(--background-color);
  color: var(--font-color);
  text-align: center;
  backdrop-filter: blur(15px); /* 高斯模糊背景 */
  border-radius: 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

/* 主题切换按钮 */
#themeToggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

#themeToggle svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
  filter: drop-shadow(0 0 1px #000);
}

body.dark-mode #themeIcon {
  transform: rotate(180deg);
  filter: drop-shadow(0 0 4px #3f1);
}

/* 右侧图标容器 */
.right-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* 语言切换按钮 */
.language-container {
  position: relative;
}

.language-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color);
  transition: color 0.3s;
}

.language-btn:hover {
  color: #0366d6;
}

.language-btn svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.language-menu {
  position: absolute;
  top: 30px;
  left: -30px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  z-index: 1000;
}

.language-menu button {
  display: block;
  width: 100%;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  color: #333;
  transition: background 0.3s;
}

.language-menu button:hover {
  background: #e0e0e0;
}

/* GitHub 按钮 */
.github-button {
  margin-left: 20px;
}

.github-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--font-color);
  transition: color 0.3s;
}

.github-btn:hover {
  color: #0366d6;
}

.github-btn svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

/* 标题样式 */
h1 {
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

h3 {
  margin-bottom: 20px;
  color: #333333;
}

/* 表单样式 */
form {
  display: flex;
  flex-direction: column;
}

input[type='text'],
textarea,
input[type='number'] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid var(--input-border-color);
  background-color: var(--input-background-color);
  color: var(--font-color);
}

textarea {
  resize: vertical;
  height: 100px;
}

.model-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.model-input-container textarea {
  width: 70%;
  height: 130px;
  margin-right: 10px;
}

.modern-button.get-models {
  background-color: #fe9307;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  height: 100px;
  transition: all 0.3s ease;
}

/* 调整后的设置超时时间和并发数布局 */
.model-timeout-concurrency {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.model-timeout,
.model-concurrency {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 48%;
}

.model-timeout label,
.model-concurrency label {
  margin-right: 10px;
  flex-shrink: 0;
}

.model-timeout input,
.model-concurrency input {
  flex-grow: 1;
  height: 35px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid var(--input-border-color);
  background-color: var(--input-background-color);
  color: var(--font-color);
}

/* 按钮容器样式 */
.submit-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.submit-container input[type='button'] {
  width: 30%;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 8px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-query {
  background-color: #007bff;
}

.check-quota {
  background-color: #28a745;
}

.clear-form {
  background-color: #dc3545;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .container {
    max-width: 95%;
  }

  .model-input-container {
    flex-direction: column;
    align-items: stretch;
  }

  .model-timeout-concurrency {
    flex-direction: column;
  }

  .model-timeout,
  .model-concurrency {
    width: 100%;
  }

  .submit-container {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .model-input-container textarea {
    width: 100%;
    margin-bottom: 10px;
  }

  .submit-container input[type='button'] {
    width: 100%;
  }
}

/* 主题样式 */
body.dark-mode {
  background-color: #1e1e1e;
  color: #e0e0e0;
  --background-color: rgba(30, 30, 30, 0.7);
  --font-color: #e0e0e0;
  --input-background-color: #2e2e2e;
  --input-border-color: #1e88e5;
}

body.light-mode {
  background-color: #ffffff;
  color: #000000;
  --background-color: rgba(255, 255, 255, 0.7);
  --font-color: #000000;
  --input-background-color: #ffffff;
  --input-border-color: #cccccc;
}

body.light-mode .modern-button.get-models {
  background-color: #fe9307;
}

body.light-mode .modern-button.get-models:hover {
  background-color: #e58e06;
}

body.light-mode .submit-query {
  background-color: #007bff;
}

body.light-mode .submit-query:hover {
  background-color: #006ae6;
}

body.light-mode .check-quota {
  background-color: #28a745;
}

body.light-mode .check-quota:hover {
  background-color: #218838;
}

body.light-mode .clear-form {
  background-color: #dc3545;
}

body.light-mode .clear-form:hover {
  background-color: #c82333;
}

/* 响应操作按钮的悬停效果 */
input[type='button']:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

input[type='button']:active {
  transform: translateY(0);
}

/* 版权信息样式 */
.copyright {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.copyright img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
}

.copyright a {
  color: #1e88e5;
  text-decoration: none;
}

.copyright a:hover {
  text-decoration: underline;
}

/* 语言切换按钮和 GitHub 按钮的样式 */
.language-btn svg,
.github-btn svg {
  transition: fill 0.3s;
}

.language-btn:hover svg,
.github-btn:hover svg {
  fill: #0366d6;
}

/* 表单输入占位符颜色 */
input::placeholder,
textarea::placeholder {
  color: var(--font-color);
}

/* 隐藏其他不必要的元素 */
.response-container {
  margin-top: 20px;
}

@media (pointer: coarse) {
  /* 针对触摸设备的优化 */
  .submit-container input[type='button'] {
    padding: 12px;
  }
}
</style>
