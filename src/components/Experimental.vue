<template>
  <div>
    <a-modal
      v-model:open="modalVisible"
      :title="$t('EXPERIMENTAL_FEATURES')"
      :footer="null"
      :width="modalWidth"
      @cancel="handleCancel"
      :centered="true"
      :destroyOnClose="true"
      :body-style="{ maxHeight: '80vh', overflowY: 'auto' }"
    >
      <div class="modal-content">
        <!-- API 地址设置 -->
        <div class="api-address-section">
          <a-input
            v-model:value="apiAddress"
            :placeholder="$t('ENTER_API_ADDRESS')"
            :disabled="isApiAddressSaved"
            class="api-address-input"
          />
          <div class="button-group">
            <a-button
              type="primary"
              v-if="!isApiAddressSaved"
              @click="saveApiAddress"
            >
              {{ $t('SAVE') }}
            </a-button>
            <a-button type="default" v-else @click="deleteApiAddress">
              {{ $t('DELETE') }}
            </a-button>
          </div>
        </div>

        <!-- 选项卡 -->
        <a-tabs default-active-key="gpt" class="tabs">
          <!-- GPT 选项卡 -->
          <a-tab-pane key="gpt" :tab="$t('GPT')">
            <div class="tab-content">
              <a-textarea
                v-model:value="refreshTokens"
                :placeholder="$t('ENTER_TOKENS_ONE_PER_LINE')"
                :auto-size="{ minRows: 8, maxRows: 12 }"
                class="input-field large-input"
              />
              <a-button
                type="primary"
                @click="handleRefreshTokens"
                :loading="loading.gpt"
                class="test-button"
              >
                {{ $t('START_CHECKING') }}
              </a-button>

              <!-- GPT 结果显示 -->
              <div v-if="gptResult" class="result-section">
                <div class="result-header">
                  <p>
                    {{
                      $t('VALID_TOKENS_COUNT', {
                        count: gptResult.validTokens.length,
                      })
                    }}
                  </p>
                  <!-- 当有效 Tokens 数量大于0时显示复制按钮 -->
                  <a-button
                    v-if="gptResult.validTokens.length > 0"
                    type="default"
                    @click="copyTokens(gptResult.validTokens)"
                    class="copy-button"
                  >
                    {{ $t('COPY_VALID_TOKENS') }}
                  </a-button>
                </div>
                <!-- 当有效 Tokens 数量大于0时显示结果文本框 -->
                <div v-if="gptResult.validTokens.length > 0">
                  <a-textarea
                    :value="gptResult.validTokens.join('\n')"
                    auto-size="{ minRows: 3, maxRows: 10 }"
                    readonly
                    class="result-textarea"
                  ></a-textarea>
                </div>
              </div>
            </div>
          </a-tab-pane>

          <!-- Claude 选项卡 -->
          <a-tab-pane key="claude" :tab="$t('CLAUDE')">
            <div class="tab-content">
              <a-textarea
                v-model:value="sessionKeys"
                :placeholder="$t('ENTER_TOKENS_ONE_PER_LINE')"
                :auto-size="{ minRows: 8, maxRows: 12 }"
                class="input-field large-input"
              />

              <!-- 检查 Session Keys 时的额外选项 -->
              <div class="input-group-horizontal">
                <a-form-item
                  :label="$t('MAX_ATTEMPTS')"
                  class="input-field input-number-group small-input-field"
                >
                  <a-input-number
                    v-model:value="maxAttempts"
                    :min="1"
                    :max="10"
                    :step="1"
                    class="input-number small-input"
                  />
                </a-form-item>
                <a-form-item
                  :label="$t('REQUESTS_PER_SECOND')"
                  class="input-field input-number-group small-input-field"
                >
                  <a-input-number
                    v-model:value="requestsPerSecond"
                    :min="1"
                    :max="5"
                    :step="1"
                    class="input-number small-input"
                  />
                </a-form-item>
              </div>

              <a-button
                type="primary"
                @click="handleSessionKeys"
                :loading="loading.claude"
                class="test-button"
              >
                {{ $t('START_CHECKING') }}
              </a-button>

              <!-- Claude 结果显示 -->
              <div v-if="claudeResult" class="result-section">
                <div class="result-header">
                  <p>
                    {{
                      $t('VALID_SESSION_KEYS_COUNT', {
                        count: claudeResult.availableKeys.length,
                      })
                    }}
                  </p>
                  <!-- 当有效 Session Keys 数量大于0时显示复制按钮 -->
                  <a-button
                    v-if="claudeResult.availableKeys.length > 0"
                    type="default"
                    @click="copyTokens(claudeResult.availableKeys)"
                    class="copy-button"
                  >
                    {{ $t('COPY_VALID_SESSION_KEYS') }}
                  </a-button>
                </div>
                <!-- 当有效 Session Keys 数量大于0时显示结果文本框 -->
                <div v-if="claudeResult.availableKeys.length > 0">
                  <a-textarea
                    :value="claudeResult.availableKeys.join('\n')"
                    auto-size="{ minRows: 3, maxRows: 10 }"
                    readonly
                    class="result-textarea"
                  ></a-textarea>
                </div>
              </div>
            </div>
          </a-tab-pane>

          <!-- Gemini 选项卡 -->
          <a-tab-pane key="gemini" :tab="$t('GEMINI')">
            <div class="tab-content">
              <a-textarea
                v-model:value="geminiKeys"
                :placeholder="$t('ENTER_TOKENS_ONE_PER_LINE')"
                :auto-size="{ minRows: 8, maxRows: 12 }"
                class="input-field large-input"
              />

              <!-- 检查 Gemini API Keys 时的额外选项 -->
              <div class="input-group-horizontal">
                <a-form-item
                  :label="$t('MODEL')"
                  class="input-field input-number-group small-input-field"
                >
                  <a-input
                    v-model:value="selectedModel"
                    class="input-field small-input"
                  />
                </a-form-item>

                <a-form-item
                  :label="$t('REQUESTS_PER_SECOND')"
                  class="input-field input-number-group small-input-field"
                >
                  <a-input-number
                    v-model:value="geminiRateLimit"
                    :min="1"
                    :max="10"
                    :step="1"
                    class="input-number small-input"
                  />
                </a-form-item>
              </div>

              <a-button
                type="primary"
                @click="handleGeminiKeys"
                :loading="loading.gemini"
                class="test-button"
              >
                {{ $t('START_CHECKING') }}
              </a-button>

              <!-- Gemini 结果显示 -->
              <div v-if="geminiResult" class="result-section">
                <div class="result-header">
                  <p>
                    {{
                      $t('VALID_API_KEYS_COUNT', {
                        count: geminiResult.validKeys.length,
                      })
                    }}
                  </p>
                  <!-- 当有效 API Keys 数量大于0时显示复制按钮 -->
                  <a-button
                    v-if="geminiResult.validKeys.length > 0"
                    type="default"
                    @click="copyTokens(geminiResult.validKeys)"
                    class="copy-button"
                  >
                    {{ $t('COPY_VALID_API_KEYS') }}
                  </a-button>
                </div>
                <!-- 当有效 API Keys 数量大于0时显示结果文本框 -->
                <div v-if="geminiResult.validKeys.length > 0">
                  <a-textarea
                    :value="geminiResult.validKeys.join('\n')"
                    auto-size="{ minRows: 3, maxRows: 10 }"
                    readonly
                    class="result-textarea"
                  ></a-textarea>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { message } from 'ant-design-vue';
import {
  checkRefreshTokens,
  checkSessionKeys,
  checkGeminiKeys,
} from '../utils/api.js';

const { t } = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

// 避免与 props.visible 命名冲突，重命名为 modalVisible
const modalVisible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
});

const isApiAddressSaved = ref(false);
const modalWidth = ref(600);
const apiAddress = ref('');
const loading = ref({
  gpt: false,
  claude: false,
  gemini: false,
});

onMounted(() => {
  const savedApiAddress = localStorage.getItem('apiAddress');
  if (savedApiAddress) {
    apiAddress.value = savedApiAddress;
    isApiAddressSaved.value = true;
  } else {
    apiAddress.value = `https://${window.location.hostname}/api/alive`;
    isApiAddressSaved.value = false;
  }
});

function saveApiAddress() {
  if (!apiAddress.value.trim()) {
    message.error(t('ENTER_API_ADDRESS'));
    return;
  }
  localStorage.setItem('apiAddress', apiAddress.value);
  message.success(t('API_ADDRESS_SAVED'));
  isApiAddressSaved.value = true;
}

function deleteApiAddress() {
  localStorage.removeItem('apiAddress');
  apiAddress.value = `https://${window.location.hostname}/api/alive`;
  message.success(t('API_ADDRESS_DELETED'));
  isApiAddressSaved.value = false;
}

// GPT Refresh Tokens
const refreshTokens = ref('');
const gptResult = ref(null);

async function handleRefreshTokens() {
  if (!apiAddress.value.trim()) {
    message.error(t('ENTER_API_ADDRESS'));
    return;
  }
  if (!refreshTokens.value.trim()) {
    message.error(t('ENTER_TOKENS'));
    return;
  }
  const tokens = refreshTokens.value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);

  loading.value.gpt = true;

  try {
    const batchSize = 5; // 每次发送5个
    const validTokens = [];
    const invalidTokens = [];

    for (let i = 0; i < tokens.length; i += batchSize) {
      const batchTokens = tokens.slice(i, i + batchSize);

      const data = await checkRefreshTokens(apiAddress.value, batchTokens);

      if (data) {
        validTokens.push(
          ...data.filter(item => item.valid).map(item => item.refreshToken)
        );
        invalidTokens.push(
          ...data.filter(item => !item.valid).map(item => item.refreshToken)
        );
      } else {
        message.error(t('REQUEST_FAILED'));
        break;
      }
    }

    gptResult.value = {
      validTokens,
      invalidTokens,
    };
  } catch (error) {
    console.error(error);
    message.error(t('REQUEST_ERROR'));
  } finally {
    loading.value.gpt = false;
  }
}

// Claude Session Keys
const sessionKeys = ref('');
const maxAttempts = ref(3);
const requestsPerSecond = ref(5);
const claudeResult = ref(null);

async function handleSessionKeys() {
  if (!apiAddress.value.trim()) {
    message.error(t('ENTER_API_ADDRESS'));
    return;
  }
  if (!sessionKeys.value.trim()) {
    message.error(t('ENTER_TOKENS'));
    return;
  }
  const tokens = sessionKeys.value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);

  loading.value.claude = true;

  try {
    const batchSize = 5; // 每次发送5个
    const availableKeys = [];
    const unavailableKeys = [];

    for (let i = 0; i < tokens.length; i += batchSize) {
      const batchTokens = tokens.slice(i, i + batchSize);

      const data = await checkSessionKeys(
        apiAddress.value,
        batchTokens,
        maxAttempts.value,
        requestsPerSecond.value
      );

      if (data) {
        availableKeys.push(
          ...data.filter(item => item.available).map(item => item.sessionKey)
        );
        unavailableKeys.push(
          ...data.filter(item => !item.available).map(item => item.sessionKey)
        );
      } else {
        message.error(t('REQUEST_FAILED'));
        break;
      }
    }

    claudeResult.value = {
      availableKeys,
      unavailableKeys,
    };
  } catch (error) {
    console.error(error);
    message.error(t('REQUEST_ERROR'));
  } finally {
    loading.value.claude = false;
  }
}

// Gemini API Keys
const geminiKeys = ref('');
const selectedModel = ref('gemini-1.5-flash-002'); // 默认值修改为 'gemini-1.5-flash-002'
const geminiRateLimit = ref(5);
// 将 geminiPrompt 和 geminiUser 默认设为 'hi'
const geminiPrompt = ref('hi');
const geminiUser = ref('hi');
const geminiResult = ref(null);

async function handleGeminiKeys() {
  if (!apiAddress.value.trim()) {
    message.error(t('ENTER_API_ADDRESS'));
    return;
  }
  if (!geminiKeys.value.trim()) {
    message.error(t('ENTER_TOKENS'));
    return;
  }
  const tokens = geminiKeys.value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);

  loading.value.gemini = true;

  try {
    const batchSize = 5; // 每次发送5个
    const validKeys = [];
    const invalidKeys = [];

    for (let i = 0; i < tokens.length; i += batchSize) {
      const batchTokens = tokens.slice(i, i + batchSize);

      const data = await checkGeminiKeys(
        apiAddress.value,
        batchTokens,
        selectedModel.value,
        geminiRateLimit.value,
        geminiPrompt.value,
        geminiUser.value
      );

      if (data) {
        validKeys.push(
          ...(data.validResults ? data.validResults.map(item => item.key) : [])
        );
        invalidKeys.push(...(data.invalidKeys || []));
      } else {
        message.error(t('REQUEST_FAILED'));
        break;
      }
    }

    geminiResult.value = {
      validKeys,
      invalidKeys,
    };
  } catch (error) {
    console.error(error);
    message.error(t('REQUEST_ERROR'));
  } finally {
    loading.value.gemini = false;
  }
}

function copyTokens(tokens) {
  const text = tokens.join('\n');
  navigator.clipboard.writeText(text).then(
    () => {
      message.success(t('COPIED_TO_CLIPBOARD'));
    },
    () => {
      message.error(t('COPY_FAILED'));
    }
  );
}

function handleCancel() {
  modalVisible.value = false;
}
</script>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 100%;
}

:deep(.ant-modal) {
  width: 80% !important;
  max-width: 1000px;
  min-width: 300px;
}

:deep(.ant-modal-body) {
  max-height: 80vh;
  overflow-y: auto;
}

.api-address-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.api-address-input {
  flex: 1;
  max-width: 400px;
}

.api-address-section .button-group {
  margin-left: 8px;
  display: flex;
}

.tabs {
  flex: 1;
}

.tab-content {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 12px;
}

.large-input {
  textarea {
    min-height: 150px;
    text-transform: uppercase;
  }
}

/* 调整为水平排列 */
.input-group-horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.input-number-group {
  flex: 1;
}

/* 缩小输入框宽度 */
.small-input-field {
  max-width: 200px;
}

.small-input {
  width: 100%;
}

.input-number-group .ant-form-item-label {
  text-align: left;
}

.input-number {
  width: 100%;
}

.test-button {
  align-self: flex-start;
  margin-bottom: 12px;
}

.result-section {
  margin-top: 16px;
}

.result-header {
  display: flex;
  align-items: center;
}

.result-header p {
  margin: 0;
}

.copy-button {
  margin-left: auto;
}

.result-textarea {
  margin-top: 8px;
}

/* 移动端样式调整 */
@media (max-width: 768px) {
  .api-address-section {
    flex-wrap: nowrap; /* 修改为不换行 */
  }

  .api-address-input {
    flex: none;
    width: calc(100% - 110px); /* 调整输入框宽度，使其与按钮并排 */
    margin-bottom: 8px;
  }

  .api-address-section .button-group {
    margin-left: auto;
    display: flex;
    gap: 8px;
  }

  .modal-content {
    padding: 0 8px;
  }

  :deep(.ant-modal) {
    width: 95% !important;
    max-width: 95%;
    margin: 0 auto;
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .copy-button {
    margin-left: 0;
    margin-top: 8px;
  }

  .test-button {
    width: 100%;
  }

  /* 在移动端也保持水平排列 */
  .input-group-horizontal {
    flex-direction: row;
  }

  /* 移动端调整输入框宽度 */
  .small-input-field {
    max-width: 100%;
    flex: 1;
  }
}
</style>
