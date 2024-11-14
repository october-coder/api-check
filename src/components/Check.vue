<template>
  <ConfigProvider :theme="configProviderTheme">
    <div class="wrapper">
      <a-flex :direction="'vertical'" :justify="'center'" :align="'center'">
        <div class="page-content">
          <div class="container" :class="{ 'shift-left': shouldShift }">
            <div class="header">
              <button
                id="themeToggle"
                :aria-label="t('SWITCH_THEME')"
                @click="handleToggleTheme"
              >
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

              <div class="right-icons" @click="showLanguageMenu = false">
                <div
                  class="language-container"
                  @click.stop="toggleLanguageMenu"
                >
                  <button
                    :aria-label="t('SWITCH_LANGUAGE')"
                    class="language-btn"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                  <div v-if="showLanguageMenu" class="language-menu">
                    <button
                      class="language-menu-button"
                      @click="setLanguage('zh')"
                    >
                      {{ t('LANGUAGE_CHINESE') }}
                    </button>
                    <button
                      class="language-menu-button"
                      @click="setLanguage('en')"
                    >
                      {{ t('LANGUAGE_ENGLISH') }}
                    </button>
                  </div>
                </div>
                <a-tooltip
                  :title="t('EXPERIMENTAL_FEATURES')"
                  placement="bottom"
                >
                  <a
                    @click="showExperimentalFeatures = true"
                    class="icon-button"
                  >
                    <ExperimentOutlined style="cursor: pointer" />
                  </a>
                </a-tooltip>
                <a-tooltip :title="t('SETTINGS')" placement="bottom">
                  <a @click="openSettingsModal" class="icon-button">
                    <SettingOutlined style="cursor: pointer" />
                  </a>
                </a-tooltip>
                <a-tooltip :title="t('GITHUB')" placement="bottom">
                  <div @click="openGitHub()" class="icon-button">
                    <GithubOutlined style="cursor: pointer" />
                  </div>
                </a-tooltip>
              </div>
            </div>

            <h1>{{ t('API_CHECKER_TITLE') }}</h1>
            <h3>{{ t('API_CHECKER_SUBTITLE') }}</h3>

            <form @submit.prevent="handleSubmit" id="apiForm">
              <div style="position: relative">
                <textarea
                  v-model="apiInfo"
                  id="api_info"
                  name="api_info"
                  :placeholder="t('API_INFO_PLACEHOLDER')"
                ></textarea>
                <a-button
                  type="primary"
                  size="small"
                  @click="handlePaste"
                  style="
                    position: absolute;
                    right: 4px;
                    top: 14px;
                    height: 24px;
                  "
                >
                  <template #icon>
                    <CopyOutlined style="font-size: 14px" />
                  </template>
                </a-button>
              </div>

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
                <a-button
                  type="primary"
                  :loading="spinning"
                  @click="getModelList"
                  class="get-models large-button"
                  style="height: 80px; width: 180px"
                >
                  {{ t('GET_MODEL_LIST') }}
                </a-button>
              </div>

              <div id="modelCheckboxes"></div>
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
                  <label for="model_concurrency"
                    >{{ t('SET_CONCURRENCY') }}:</label
                  >
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
                <a-button
                  type="primary"
                  :loading="testModels_spinning"
                  @click="testModels"
                  class="submit-query"
                  size="large"
                >
                  {{ t('TEST_MODELS') }}
                </a-button>

                <a-button
                  type="default"
                  :loading="checkQuota_spinning"
                  @click="checkQuota"
                  class="check-quota"
                  size="large"
                >
                  {{ t('CHECK_QUOTA') }}
                </a-button>

                <a-button
                  type="ghost"
                  @click="clearForm"
                  class="clear-form"
                  size="large"
                >
                  {{ t('CLEAR_FORM') }}
                </a-button>
              </div>
            </form>
          </div>
          <div
            class="container result-container"
            v-if="showResultContainer"
            :class="{ show: showResultContainer }"
          >
            <button class="close-button" @click="closeResults">×</button>
            <div class="result-content" style="position: relative">
              <div v-if="verificationLoading" class="loading-overlay">
                <a-spin size="large" />
              </div>

              <div class="left-icons">
                <a-tooltip
                  :title="t('CHAT')"
                  placement="bottom"
                  v-if="enableChat"
                >
                  <a @click="goChat()" class="icon-button">
                    <MessageOutlined />
                  </a>
                </a-tooltip>
                <a-tooltip
                  :title="
                    !testingComplete ? t('PLEASE_WAIT_FOR_TESTING') : t('SHARE')
                  "
                  placement="bottom"
                >
                  <a
                    @click="goShare"
                    class="icon-button"
                    :class="{ 'disabled-icon': !testingComplete }"
                  >
                    <ShareAltOutlined />
                  </a>
                </a-tooltip>

                <a-dropdown trigger="click">
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">
                        <a @click="copyModels('valid')">{{
                          t('COPY_IDENTICAL_MODELS')
                        }}</a>
                      </a-menu-item>
                      <a-menu-item key="2">
                        <a @click="copyModels('available')">{{
                          t('COPY_AVAILABLE_MODELS')
                        }}</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <a-tooltip :title="t('COPY')" placement="top">
                    <a class="icon-button">
                      <CopyOutlined style="cursor: pointer" />
                    </a>
                  </a-tooltip>
                </a-dropdown>
              </div>
              <a-progress
                :percent="progressPercent"
                show-info
                size="small"
                style="margin-top: 10px"
              />

              <div v-if="!isMobile" class="table-container">
                <a-table
                  :columns="columns"
                  :data-source="tableData"
                  :pagination="pagination"
                  :row-key="record => record.key"
                  size="small"
                  class="result-table"
                  @change="handleTableChange"
                  @resizeColumn="handleResizeColumn"
                >
                  <template #bodyCell="{ text, record, column, index }">
                    <template v-if="column.dataIndex === 'status'">
                      {{ record.status }}
                    </template>
                    <template v-else-if="column.dataIndex === 'model'">
                      <span style="display: flex; align-items: center">
                        <MessageOutlined
                          style="margin-right: 8px; cursor: pointer"
                          @click="goChat(record.model)"
                          v-if="enableChat"
                        />
                        {{ record.model }}
                      </span>
                    </template>
                    <template v-else-if="column.dataIndex === 'responseTime'">
                      {{ record.responseTime }}
                    </template>
                    <template v-else-if="column.dataIndex === 'buttons'">
                      <template
                        v-if="record.buttons && record.buttons.length > 0"
                      >
                        <a-popover trigger="hover" placement="top">
                          <template #content>
                            <div class="verify-btn-group">
                              <a-button
                                v-for="(button, idx) in record.buttons"
                                :key="idx"
                                type="default"
                                size="small"
                                @click="button.onClick"
                                style="margin: 0 5px 5px 0"
                                :style="{
                                  backgroundColor:
                                    buttonColors[button.key] || '',
                                  borderColor: buttonColors[button.key] || '',
                                }"
                              >
                                {{ button.label }}
                              </a-button>
                            </div>
                          </template>
                          <a-button type="primary" size="small">
                            {{ t('VERIFY') }}
                          </a-button>
                        </a-popover>
                      </template>
                    </template>

                    <template v-else-if="column.dataIndex === 'remark'">
                      <a-tooltip
                        :title="record.fullRemark || record.remark"
                        placement="topLeft"
                      >
                        <span v-html="record.remark"></span>
                      </a-tooltip>
                    </template>
                    <template v-else>
                      {{ text }}
                    </template>
                  </template>
                </a-table>
              </div>
              <div
                v-if="isMobile"
                class="list-container"
                style="margin: 0 16px"
              >
                <div class="result-list">
                  <div
                    class="list-item"
                    v-for="item in paginatedData"
                    :key="item.key"
                  >
                    <div class="list-item-content">
                      <div class="list-item-field">
                        <span class="field-label">{{
                          t('MODEL_STATUS_LABEL')
                        }}</span>
                        <span class="field-value">{{ item.status }}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="field-label">{{
                          t('MODEL_NAME_LABEL')
                        }}</span>
                        <span class="field-value" @click="copyText(item.model)">
                          {{ item.model }}
                        </span>
                      </div>
                      <div class="list-item-field">
                        <span class="field-label">{{
                          t('RESPONSE_TIME_LABEL')
                        }}</span>
                        <span class="field-value">{{ item.responseTime }}</span>
                      </div>
                      <div class="list-item-field">
                        <div class="verify-btn-group">
                          <a-button
                            v-for="(button, index) in item.buttons"
                            :key="index"
                            type="default"
                            size="small"
                            @click="button.onClick"
                            style="margin-bottom: 5px"
                            :style="{
                              backgroundColor: buttonColors[button.key] || '',
                              borderColor: buttonColors[button.key] || '',
                            }"
                          >
                            {{ button.label }}
                          </a-button>
                        </div>
                      </div>
                      <div class="list-item-field" v-if="item.remark">
                        <span class="field-label">{{ t('REMARK_LABEL') }}</span>
                        <span class="field-value" v-html="item.remark"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a-pagination
                :current="currentPage"
                :total="tableData.length"
                :pageSize="pageSize"
                @change="handlePageChange"
                style="margin-top: 16px; text-align: right"
                v-if="isMobile"
              />
            </div>
          </div>
        </div>
      </a-flex>
    </div>
    <a-modal
      v-model:open="functionCallingModalVisible"
      :title="t('FUNCTION_VERIFICATION_MODAL_TITLE')"
      @ok="handleFunctionCallingOk"
      @cancel="handleFunctionCallingCancel"
      :destroyOnClose="true"
    >
      <a-form
        :model="{ a: functionCallingA, b: functionCallingB }"
        layout="horizontal"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :label="t('VALUE_A')"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input-number
                v-model:value="functionCallingA"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :label="t('VALUE_B')"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input-number
                v-model:value="functionCallingB"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal
      v-model:open="showAppSettingsModal"
      :title="t('SETTINGS_PANEL')"
      :footer="null"
      :width="600"
      @cancel="closeSettingsModal"
      :centered="true"
      :destroyOnClose="true"
    >
      <a-tabs>
        <a-tab-pane
          key="1"
          :tab="t('LOCAL_CACHE')"
          style="overflow-x: hidden"
          tabPosition="left"
        >
          <a-form @submit.prevent>
            <a-row :gutter="16">
              <a-col :span="16">
                <a-form-item :label="t('API_URL')">
                  <a-input
                    v-model:value="settingsApiUrl"
                    :placeholder="t('PLEASE_ENTER_API_URL')"
                  >
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item :label="t('API_KEY')">
                  <a-input
                    v-model:value="settingsApiKey"
                    :placeholder="t('PLEASE_ENTER_API_KEY')"
                  >
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <div style="display: flex; height: 100%">
                  <a-button
                    type="primary"
                    @click="saveToLocal"
                    size="large"
                    style="
                      flex: 1;
                      white-space: normal;
                      word-break: break-word;
                      height: 90%;
                    "
                  >
                    {{ t('SAVE_TO_LOCAL_CACHE') }}
                  </a-button>
                </div>
              </a-col>
            </a-row>
          </a-form>
          <h3>{{ t('HISTORY_RECORDS') }}</h3>
          <a-list
            :data-source="localCacheList"
            bordered
            style="width: 100%"
            item-layout="horizontal"
            :style="localListStyle"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <div>
                  <div>{{ item.name }}</div>
                  <div style="font-size: smaller; color: gray">
                    URL: {{ item.url }}
                  </div>
                  <div style="font-size: smaller; color: gray">
                    API Key: {{ maskApiKey(item.apiKey) }}
                  </div>
                </div>
                <template #actions>
                  <a @click="loadLocalRecord(item.id)">{{ t('IMPORT') }}</a>
                  <a @click="deleteLocalRecord(item.id)">{{ t('DELETE') }}</a>
                </template>
              </a-list-item>
            </template>
          </a-list>
          <div style="margin-top: 16px">
            <a-button @click="exportLocalCache" style="margin-right: 8px"
              >{{ t('EXPORT') }}
            </a-button>
            <a-button @click="importLocalCache">{{ t('IMPORT') }}</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="t('CLOUD_CACHE')" style="overflow-x: hidden">
          <div v-if="!isCloudLoggedIn">
            <a-form @submit.prevent>
              <a-row :gutter="16" align="stretch">
                <a-col :span="16">
                  <a-form-item :label="t('CLOUD_URL')">
                    <a-input
                      v-model:value="cloudUrl"
                      :placeholder="t('PLEASE_ENTER_CLOUD_URL')"
                    >
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item :label="t('PASSWORD')">
                    <a-input-password
                      v-model:value="cloudPassword"
                      :placeholder="t('PLEASE_ENTER_PASSWORD')"
                    >
                      <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                      </template>
                    </a-input-password>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-button
                    type="primary"
                    @click="handleCloudLogin"
                    size="large"
                    style="
                      width: 100%;
                      height: 90%;
                      white-space: normal;
                      word-break: break-word;
                    "
                  >
                    {{ t('LOGIN') }}
                  </a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div v-else>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16px;
              "
            >
              <span>{{ t('LOGGED_IN_TO_CLOUD', { url: cloudUrl }) }}</span>
              <a-button type="primary" @click="handleCloudLogout">
                {{ t('LOGOUT') }}
              </a-button>
            </div>
            <a-list
              :data-source="cloudDataList"
              bordered
              style="width: 100%"
              item-layout="horizontal"
              :style="cloudListStyle"
            >
              <template #renderItem="{ item }">
                <a-list-item>
                  <div>
                    <div>{{ item.name }}</div>
                    <div style="font-size: smaller; color: gray">
                      URL: {{ item.url }}
                    </div>
                    <div style="font-size: smaller; color: gray">
                      API Key: {{ maskApiKey(item.apiKey) }}
                    </div>
                  </div>
                  <template #actions>
                    <a @click="loadCloudRecord(item.id)">{{ t('IMPORT') }}</a>
                    <a @click="deleteCloudRecord(item.id)">{{ t('DELETE') }}</a>
                  </template>
                </a-list-item>
              </template>
            </a-list>
            <div style="margin-top: 16px">
              <a-button @click="exportCloudCache" style="margin-right: 8px"
                >{{ t('EXPORT') }}
              </a-button>
              <a-button @click="importCloudCache" style="margin-right: 8px"
                >{{ t('IMPORT') }}
              </a-button>
              <a-button type="primary" @click="confirmSaveCloudData"
                >{{ t('CONFIRM_SAVE') }}
              </a-button>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="t('ABOUT')">
          <div style="padding: 12px">
            <a-row :gutter="[12, 12]" align="middle">
              <a-col
                :xs="4"
                :sm="4"
                :md="6"
                :lg="6"
                :xl="6"
                style="text-align: center"
              >
                <img src="../assets/logo.png" alt="Logo" style="width: 60px" />
              </a-col>
              <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div style="text-align: left">
                  <h2 style="margin: 0; font-size: 20px">{{ appInfo.name }}</h2>
                  <p style="margin: 4px 0; font-size: 14px">
                    {{ appInfo.subtitle }}
                  </p>
                  <p style="margin: 4px 0; font-size: 12px; color: #666">
                    {{ t('VERSION') }}: {{ appInfo.version }}
                  </p>
                </div>
              </a-col>
              <a-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6">
                <div style="text-align: right">
                  <a-space
                    direction="vertical"
                    size="small"
                    style="width: 100%"
                  >
                    <a-button
                      type="default"
                      size="middle"
                      block
                      @click="openChangelog"
                    >
                      {{ t('UPDATE_LOG') }}
                    </a-button>
                    <a-button
                      type="primary"
                      size="middle"
                      block
                      @click="openWebsite"
                    >
                      {{ t('OFFICIAL_WEBSITE') }}
                    </a-button>
                  </a-space>
                </div>
              </a-col>
            </a-row>
            <a-divider style="margin: 16px 0"></a-divider>
            <div style="text-align: left">
              <p
                v-for="(desc, index) in appDescription"
                :key="index"
                style="margin: 8px 0; font-size: 14px"
              >
                {{ desc }}
              </p>
            </div>
            <a-divider style="margin: 16px 0"></a-divider>
            <div style="text-align: left">
              <a-row :gutter="16">
                <!-- 左侧：作者信息 -->
                <a-col :xs="12" :sm="12">
                  <h3 style="font-size: 16px; margin-bottom: 8px">
                    {{ t('AUTHORS') }}
                  </h3>
                  <p style="margin: 4px 0; font-size: 14px">
                    <a
                      :href="appInfo.author.url"
                      target="_blank"
                      style="color: #1890ff"
                    >
                      {{ appInfo.author.name }}
                    </a>
                  </p>
                  <p>
                    <a
                      :href="appInfo.coauthor.url"
                      target="_blank"
                      style="color: #1890ff"
                    >
                      {{ appInfo.coauthor.name }}
                    </a>
                  </p>
                </a-col>
                <!-- 右侧：赞助商信息 -->
                <a-col :xs="12" :sm="12">
                  <h3 style="font-size: 16px; margin-bottom: 8px">
                    {{ t('SPONSORS') }}
                  </h3>
                  <ul style="list-style-type: none; padding: 0">
                    <li
                      v-for="(sponsor, index) in appInfo.sponsors"
                      :key="index"
                      style="margin-bottom: 4px"
                    >
                      <a
                        :href="sponsor.url"
                        target="_blank"
                        style="color: #1890ff"
                      >
                        {{ sponsor.name }}
                      </a>
                      :{{ sponsor.desc }}
                    </li>
                  </ul>
                </a-col>
              </a-row>
              <a-divider style="margin: 16px 0"></a-divider>
              <div v-if="appInfo.contributors && appInfo.contributors.length">
                <h3 style="font-size: 14px; margin: 16px 0 8px 0">
                  {{ t('CONTRIBUTORS') }}
                </h3>
                <div style="display: flex; flex-wrap: wrap">
                  <div
                    v-for="(contributor, index) in appInfo.contributors"
                    :key="index"
                    style="margin: 8px; text-align: center"
                  >
                    <a :href="contributor.url" target="_blank">
                      <a-avatar
                        :src="contributor.avatar"
                        :alt="contributor.name"
                        shape="circle"
                        :size="45"
                      ></a-avatar>
                    </a>
                    <p style="margin-top: 4px; font-size: 14px">
                      <a
                        :href="contributor.url"
                        target="_blank"
                        style="color: #1890ff"
                      >
                        {{ contributor.name }}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 版权和许可证信息 -->
            <div style="margin-top: 12px; text-align: left">
              <p style="margin: 4px 0; font-size: 12px">
                &copy; {{ appInfo.year }} {{ appInfo.company }}.
                {{ t('ALL_RIGHTS_RESERVED') }} {{ t('LICENSE') }}:
                {{ appInfo.license }}
              </p>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>

    <a-modal
      v-model:open="showModelModal"
      :title="t('SELECT_MODEL_TITLE')"
      :width="600"
      @ok="handleModelModalOk"
      @cancel="handleModelModalCancel"
      :confirm-loading="spinning"
      :ok-text="t('OK')"
      :cancel-text="t('CANCEL')"
      :closable="true"
    >
      <div>
        <div style="margin-bottom: 16px">
          {{ t('SELECTED_MODELS', { count: selectedModels.length }) }}
        </div>
        <div
          class="model-filter-container"
          style="display: flex; align-items: center; margin-bottom: 16px"
        >
          <a-input
            v-model:value="prefixFilter"
            :placeholder="t('FILTER_PLACEHOLDER')"
            style="width: 200px; margin-right: 8px"
          />
          <a-button
            type="primary"
            @click="filterModels"
            style="margin-right: 8px"
          >
            {{ t('FILTER') }}
          </a-button>
          <a-button @click="clearFilter">{{ t('CLEAR') }}</a-button>
        </div>
        <div class="checkbox-container" style="margin-bottom: 16px">
          <a-checkbox @change="onSelectAll" style="margin-right: 16px">
            {{ t('SELECT_ALL') }}
          </a-checkbox>
          <a-checkbox @change="onSelectAllChatOnly">
            {{ t('SELECT_ALL_CHAT_ONLY') }}
          </a-checkbox>
        </div>
        <div style="max-height: 300px; overflow-y: auto; overflow-x: hidden">
          <a-checkbox-group v-model:value="selectedModels">
            <a-row :gutter="[16, 16]">
              <a-col v-for="model in sortedModels" :key="model" :span="12">
                <a-checkbox :value="model" style="width: 100%"
                  >{{ model }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
      </div>
    </a-modal>

    <!--  测试总结   -->
    <a-modal
      v-model:open="isSummaryModalVisible"
      :title="t('TEST_RESULT_SUMMARY')"
      width="600px"
      centered
      @ok="handleSummaryOk"
    >
      <div v-html="summaryContent"></div>
      <div
        ref="chartContainer"
        style="width: 80%; height: 250px; margin: 30px auto 30px"
      ></div>
    </a-modal>
    <!-- 保持模板中其他相关部分不变 -->
    <a-modal
      v-model:open="showSVGModal"
      :title="t('SHARE_RESULTS')"
      :footer="null"
      @cancel="handleCloseSVGModal"
    >
      <div class="svg-container">
        <a-image :width="200" :src="svgDataUrl" alt="SVG Image" />
      </div>
      <div class="copy-close-container">
        <a-button type="primary" @click="copyToClipboardHandler"
          >{{ t('COPY_IMAGE') }}
        </a-button>
        <a-button @click="handleCloseSVGModal">{{ t('CLOSE') }}</a-button>
      </div>
    </a-modal>

    <a-modal
      v-model:open="customDialogModalVisible"
      :title="t('CUSTOM_DIALOG_VERIFICATION')"
      @cancel="handleCustomDialogCancel"
      :width="600"
      centered
      :confirmLoading="customDialogLoading"
      :footer="null"
    >
      <div v-if="!customDialogResult">
        <div style="margin-bottom: 16px">
          <p>{{ t('FUNCTION_INTRODUCTION') }}</p>
        </div>
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <!-- 模型下拉框 -->
          <a-form-item :label="t('SELECT_MODEL')">
            <a-select
              v-model:value="currentVerifyingModel"
              :options="modelOptions"
              :placeholder="t('SELECT_MODEL_PLACEHOLDER')"
              allowClear
            >
              <template #suffixIcon>
                <SmileOutlined />
              </template>
            </a-select>
          </a-form-item>

          <!-- 提示词下拉框 -->
          <a-form-item :label="t('SELECT_PROMPT')">
            <a-select
              v-model="selectedPresetPrompt"
              :options="promptOptions"
              :placeholder="t('SELECT_PROMPT_PLACEHOLDER')"
              @change="changePrompt"
            >
              <template #suffixIcon>
                <SmileOutlined />
              </template>
            </a-select>
          </a-form-item>

          <!-- 提示词输入框 -->
          <a-form-item :label="t('PROMPT_CONTENT')">
            <a-textarea
              v-model:value="customDialogPrompt"
              :placeholder="t('ENTER_PROMPT')"
              :rows="4"
            />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 24 }">
            <div style="text-align: right">
              <a-button
                type="primary"
                @click="handleCustomDialogSubmit"
                :loading="customDialogLoading"
                style="width: 100px"
              >
                {{ t('SEND') }}
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>

      <!-- 返回结果展示 -->
      <div v-else style="margin-top: 24px">
        <div class="dialog-result">
          <div class="result-item">
            <div class="label">{{ t('MODEL') }}:</div>
            <div class="content no-box">{{ customDialogResult.model }}</div>
          </div>

          <div class="result-item">
            <div class="label">{{ t('PROMPT') }}:</div>
            <div
              class="content no-box"
              style="display: flex; align-items: center"
            >
              <span style="flex: 1; margin-right: 8px">
                {{ customDialogResult.prompt }}
              </span>
              <a-popover :title="t('PROMPT_DESCRIPTION')" trigger="click">
                <template #content>
                  <pre class="popover-description-pre">{{
                    getPromptDescriptionByContent(customDialogResult.prompt)
                  }}</pre>
                </template>
                <a-button type="text" shape="circle">
                  <InfoCircleTwoTone />
                </a-button>
              </a-popover>
            </div>
          </div>

          <!-- 响应内容展示 -->
          <div class="result-item">
            <div class="label">{{ t('RESPONSE_CONTENT') }}:</div>
            <div
              class="content response-content"
              style="max-height: 300px; overflow-y: auto"
            >
              {{ customDialogResult.response }}
            </div>
          </div>

          <!-- 原始响应折叠面板 -->
          <a-collapse :bordered="false">
            <a-collapse-panel :header="t('RAW_RESPONSE')">
              <pre class="raw-response-pre">{{
                JSON.stringify(customDialogResult.raw_response, null, 2)
              }}</pre>
            </a-collapse-panel>
          </a-collapse>

          <!-- 继续测试按钮，靠右边，增加图标 -->
          <div style="text-align: right; margin-top: 16px">
            <a-button @click="handleContinueTesting">
              <DoubleRightOutlined />
              {{ t('CONTINUE_TESTING') }}
            </a-button>
          </div>
        </div>
      </div>
    </a-modal>
    <ExperimentalFeatures v-model:visible="showExperimentalFeatures" />
  </ConfigProvider>
</template>
<script setup>
import {
  CopyOutlined,
  GithubOutlined,
  LockOutlined,
  MessageOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UserOutlined,
  InfoCircleTwoTone,
  SmileOutlined,
  DoubleRightOutlined,
  ExperimentOutlined,
} from '@ant-design/icons-vue';
import ExperimentalFeatures from './Experimental.vue';
import { computed, h, nextTick, onMounted, reactive, ref, watch } from 'vue';
import {
  ConfigProvider,
  message,
  Modal,
  notification,
  Table as aTable,
  theme,
} from 'ant-design-vue';
import { useWindowSize } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import {
  initConsole,
  initializeLanguage,
  initializeTheme,
} from '../utils/initialization.js';
import { fetchModelList, fetchQuotaInfo, testModelList } from '../utils/api.js';
import {
  calculateSummaryData,
  errorHandler,
  extractApiInfo,
  isClaude,
  isGpt,
  maskApiKey,
} from '../utils/normal.js';
import { checkForUpdates } from '../utils/update.js';
import ModelVerifier from '../utils/verify.js';
import { toggleTheme } from '../utils/theme.js';
import { createSVGDataURL } from '../utils/svg.js';
import { announcement, appInfo } from '../utils/info.js';
import {
  cantFunctionModelList,
  cantOfficialModelList,
  cantTemperatureModelList,
  presetPromptsList,
} from '../utils/models.js';

// 注册必须的组件
echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  RadarChart,
  CanvasRenderer,
]);

const isDarkMode = ref(false);
const configProviderTheme = computed(() => ({
  algorithm: isDarkMode.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
}));

const spinning = ref(false);
const checkQuota_spinning = ref(false);
const testModels_spinning = ref(false);
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 767);

// 引入国际化资源
const { t, locale } = useI18n();
const results = reactive({
  valid: [],
  invalid: [],
  inconsistent: [],
  awaitOfficialVerification: [],
});

// 添加布尔变量，用于控制平移动画和结果容器的显示
const shouldShift = ref(false);
const showResultContainer = ref(false);
const handlePageChange = page => {
  currentPage.value = page;
};

// 关闭结果容器的函数
function closeResults() {
  // 隐藏结果容器
  showResultContainer.value = false;
  // 延迟重置 API 表单容器的位置，等待关闭动画完成
  setTimeout(() => {
    shouldShift.value = false;
  }, 300); // 延迟时间应与过渡持续时间匹配
}

// 定义响应式状态
const apiInfo = ref('');
const apiUrl = ref('');
const apiKey = ref('');
const modelName = ref('');
const modelTimeout = ref(10);
const modelConcurrency = ref(5);
const currentLanguage = computed(() =>
  locale.value.startsWith('zh') ? 'zh' : 'en'
);
const showLanguageMenu = ref(false);
const models = ref([]);
const selectedModels = ref([]);
const showModelModal = ref(false);
const prefixFilter = ref('');
const verificationLoading = ref(false);
const functionCallingModalVisible = ref(false);
const functionCallingA = ref(3);
const functionCallingB = ref(5);
const selectedModelForFunctionCalling = ref(null);
const currentPage = ref(1);
const pageSize = 3;
const isSummaryModalVisible = ref(false);
const chartContainer = ref(null);
let chartInstance = null;
const showSVGModal = ref(false);
const svgDataUrl = ref('');
const testingComplete = ref(false);
const tableData = ref([]);
const totalModels = ref(0);
const completedModels = ref(0);
const progressPercent = ref(0);
const chatSite = ref('https://chat.crond.dev');
const enableChat = ref(true);
const showExperimentalFeatures = ref(false);
const pagination = reactive({
  current: 1,
  pageSize: 8, // 默认每页显示8条，可以根据需要调整
  pageSizeOptions: ['8', '12', '20'], // 可供选择的每页条数
  showSizeChanger: true, // 显示每页条数切换器
  total: computed(() => tableData.value.length), // 数据总数
});
const handleTableChange = (paginationInfo, filters, sorter) => {
  pagination.current = paginationInfo.current;
  pagination.pageSize = paginationInfo.pageSize;
};

const appDescription = computed(() => {
  const currentLocale = locale.value || 'zh';
  return appInfo.description[currentLocale] || appInfo.description['zh'];
});

// 打开官方网站的方法
function openWebsite() {
  window.open(appInfo.officialUrl, '_blank');
}

// 打开更新日志的方法
function openChangelog() {
  window.open(appInfo.changelogUrl, '_blank');
}

// 修改 paginatedData 的定义，使用 tableData.value
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = currentPage.value * pageSize;
  return tableData.value.slice(start, end);
});
// 设置面板相关状态
const showAppSettingsModal = ref(false);

// 主题切换方法
const handleToggleTheme = () => {
  toggleTheme(isDarkMode);
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  document.body.classList.toggle('light-mode', !isDarkMode.value);
};

// 语言切换菜单显示隐藏方法
const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
};

// 语言切换方法
const setLanguage = language => {
  locale.value = language;
  localStorage.setItem('locale', language);
  showLanguageMenu.value = false; // 切换语言后隐藏菜单
};

const FUNCTION_VERIFICATION = computed(() => t('FUNCTION_VERIFICATION'));
const TEMPERATURE_VERIFICATION = computed(() => t('TEMPERATURE_VERIFICATION'));
const OFFICIAL_VERIFICATION = computed(() => t('OFFICIAL_VERIFICATION'));

const buttonColors = {
  functionVerification: '#1890ff', // 蓝色
  temperatureVerification: '#fa8c16', // 橙色
  officialVerification: '#52c41a', // 绿色
  officialVerificationPending: '#95de64',
};

function handleFunctionCallingCancel() {
  functionCallingModalVisible.value = false;
}

// 页面加载时初始化主题和语言
onMounted(() => {
  initializeTheme(isDarkMode);
  initializeLanguage(locale, currentLanguage);
  initConsole();
  // 初始化本地缓存列表
  const savedLocalDataList = localStorage.getItem('localCacheList');
  if (savedLocalDataList) {
    localCacheList.value = JSON.parse(savedLocalDataList);
  } else {
    localCacheList.value = [];
  }
  getQueryParams();
});

onMounted(() => {
  // 智能提取 api info
  document.getElementById('api_info').addEventListener('input', function () {
    let text = this.value;
    let { apiUrl: extractedUrl, apiKey: extractedKey } = extractApiInfo(text);
    if (extractedUrl) {
      apiUrl.value = extractedUrl;
    }
    if (extractedKey) {
      apiKey.value = extractedKey;
    }
  });
});

// 设置高度单位 vh
onMounted(() => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
});

// 显示更新提示的函数
function showUpdatePrompt(updateInfo) {
  Modal.confirm({
    title: t('UPDATE_AVAILABLE_TITLE', { version: updateInfo.latestVersion }),
    content: () =>
      h('div', [
        h('p', `${t('CURRENT_VERSION')}: ${appInfo.version}`),
        h('p', `${t('LATEST_VERSION')}: ${updateInfo.latestVersion}`),
        h('p', `${t('RELEASE_NOTES')}:`),
        h('div', { style: 'white-space: pre-wrap;' }, updateInfo.releaseNotes),
      ]),
    okText: t('GO_TO_UPDATE'),
    cancelText: t('CANCEL'),
    onOk() {
      // 打开 GitHub 发布页面
      window.open(updateInfo.htmlUrl, '_blank');
    },
  });
}

// 函数：获取 URL 参数
const getQueryParams = async () => {
  const params = new URLSearchParams(window.location.search);
  const settings = params.get('settings');
  const owner = appInfo.owner;
  const repo = appInfo.repo;
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
      if (settingsObj.chatSite) {
        chatSite.value = settingsObj.chatSite;
      }
      if (settingsObj.closeChat) {
        enableChat.value = false;
      }
      if (!settingsObj.closeAnnouncement) {
        showAnnouncement();
        const updateInfo = await checkForUpdates(
          appInfo.version,
          owner,
          repo,
          t
        );
        if (updateInfo && updateInfo.hasUpdate) {
          showUpdatePrompt(updateInfo);
        }
      }
      showSettingsModal();
    } catch (e) {
      console.error('解析URL参数失败:', e);
    }
  } else {
    showAnnouncement();
    const updateInfo = await checkForUpdates(appInfo.version, owner, repo, t);
    if (updateInfo && updateInfo.hasUpdate) {
      showUpdatePrompt(updateInfo);
    }
  }
};

// 使用 ant-design-vue 的 Modal 显示设置弹窗
const showSettingsModal = () => {
  const skMasked = apiKey.value.slice(0, 5) + '*****';

  const messageContent = `
        <div>
          <p><strong>已填入预设配置</strong></p>
          <div>🔑 密钥: ${skMasked}</div>
          <div>🔗 接口地址: ${apiUrl.value}</div>
          <div>📦 模型: ${modelName.value}</div>
          <div>⏱ 请求超时: ${modelTimeout.value} 秒</div>
          <div>🔁 并发数量: ${modelConcurrency.value}</div>
        </div>
      `;

  Modal.info({
    title: '预设配置',
    content: h('div', { innerHTML: messageContent }),
    width: 400,
    centered: true,
    okText: '确定',
  });
};

function showAnnouncement() {
  const isOfficialSite = window.location.hostname === appInfo.website;
  const lang = currentLanguage.value;
  let descriptionNodes = [];

  descriptionNodes.push(
    h(
      'div',
      {
        style: 'font-weight: bold; font-size: 16px; margin-bottom: 8px;',
      },
      `${appInfo.name} v${appInfo.version}`
    )
  );

  descriptionNodes.push(h('br'));
  descriptionNodes.push(
    h('div', [
      t('REPO_ADDRESS'),
      ': ',
      h(
        'a',
        {
          href: appInfo.githubUrl,
          target: '_blank',
          style: 'color: #1890ff;',
        },
        `${appInfo.repo}`
      ),
    ])
  );

  descriptionNodes.push(h('div', t('STAR_PROJECT')));
  descriptionNodes.push(h('br'));

  descriptionNodes.push(
    h('div', [
      t('NEW_DOMAIN'),
      ': ',
      h(
        'a',
        {
          href: appInfo.officialUrl,
          target: '_blank',
          style: 'color: #1890ff;',
        },
        appInfo.officialUrl
      ),
    ])
  );

  if (isOfficialSite) {
    descriptionNodes.push(h('br'));
    announcement.officialContent[lang].forEach(line => {
      descriptionNodes.push(h('div', line));
    });
  }

  descriptionNodes.push(h('br'));

  descriptionNodes.push(
    h('div', { style: 'font-weight: bold;' }, t('HOW_TO_USE'))
  );
  announcement.howToUse[lang].forEach(line => {
    descriptionNodes.push(h('div', line));
  });

  descriptionNodes.push(h('br'));

  const versionHistoryNodes = announcement.updateLog[lang].map(log =>
    h('div', { style: 'margin-bottom: 8px;' }, [
      h('strong', `${log.version} - ${log.date}`),
      log.url
        ? h(
            'a',
            {
              href: log.url,
              target: '_blank',
              style: 'margin-left: 10px; color: #1890ff;',
            },
            t('VIEW_DETAILS') // "View Details" text
          )
        : null,
    ])
  );

  descriptionNodes.push(
    h('div', [
      h(
        'div',
        { style: 'font-weight: bold; margin-bottom: 8px;' },
        t('VERSION_HISTORY')
      ),
      ...versionHistoryNodes,
    ])
  );

  notification.open({
    message: null,
    description: h('div', descriptionNodes),
    placement: 'topRight',
    duration: 0,
    onClose: () => {
      localStorage.setItem('announcementShown', 'true');
    },
    style: {
      width: '350px',
    },
  });
}

// 清除表单
const clearForm = () => {
  apiInfo.value = '';
  apiUrl.value = '';
  apiKey.value = '';
  modelName.value = '';
  modelTimeout.value = 10;
  modelConcurrency.value = 5;
};

const handleSubmit = () => {};

// 获取模型列表
async function getModelList() {
  spinning.value = true; // 开始加载动画
  try {
    const data = await fetchModelList(apiUrl.value, apiKey.value);
    // 需要去重  data.data
    models.value = [...new Set(data.data.map(model => model.id))].sort();
    showModelModal.value = true;
  } catch (error) {
    console.error('Error in getModelList:', error);
    message.error('获取模型失败，请检查API地址或密钥是否正确');
  } finally {
    spinning.value = false; // 停止加载动画
  }
}

function handleModelModalOk() {
  modelName.value = selectedModels.value.join(',');
  showModelModal.value = false;
}

function handleModelModalCancel() {
  showModelModal.value = false;
}

function onSelectAll(e) {
  if (e.target.checked) {
    selectedModels.value = [...models.value];
  } else {
    selectedModels.value = [];
  }
}

function onSelectAllChatOnly(e) {
  if (e.target.checked) {
    const notChatPattern =
      /^(dall|mj|midjourney|stable-diffusion|playground|flux|swap_face|tts|whisper|text|emb|luma|vidu|pdf|suno|pika|chirp|domo|runway|cogvideo|babbage|davinci|gpt-4o-realtime)/;
    selectedModels.value = models.value.filter(
      model =>
        !notChatPattern.test(model) &&
        !/(image|audio|video|music|pdf|flux|suno|embed)/.test(model)
    );
  } else {
    selectedModels.value = [];
  }
}

function filterModels() {
  let prefix = prefixFilter.value.trim().toLowerCase();
  // 获取当前筛选结果
  const filteredModels = models.value.filter(model =>
    model.toLowerCase().includes(prefix)
  );
  // 将新筛选的模型与已选择的模型合并，使用 Set 去重
  selectedModels.value = Array.from(
    new Set([...selectedModels.value, ...filteredModels])
  );
}

const sortedModels = computed(() => {
  const selectedSet = new Set(selectedModels.value);
  return models.value.slice().sort((a, b) => {
    const aSelected = selectedSet.has(a);
    const bSelected = selectedSet.has(b);
    if (aSelected && !bSelected) return -1; // a 已选中，排在前面
    if (!aSelected && bSelected) return 1; // b 已选中，a 未选中，b 排在前面
    return 0; // 保持原有顺序
  });
});

function clearFilter() {
  prefixFilter.value = '';
  selectedModels.value = [];
}

// 检查额度
const checkQuota = async () => {
  try {
    checkQuota_spinning.value = true;
    const { quotaInfo, usedInfo } = await fetchQuotaInfo(
      apiUrl.value,
      apiKey.value
    );

    // 计算剩余额度
    const quotaNumber = parseFloat(quotaInfo);
    const usedNumber = parseFloat(usedInfo);
    let remainInfo;
    if (!isNaN(quotaNumber) && !isNaN(usedNumber)) {
      remainInfo = `${(quotaNumber - usedNumber).toFixed(2)} $`;
    } else {
      remainInfo = '无法计算剩余额度';
    }

    const showInfo = `可用额度为: ${remainInfo}\n\n已用额度为: ${usedInfo} $\n\n总额度为: ${quotaInfo} $`;

    Modal.info({
      title: '检查额度',
      content: h('div', { innerHTML: showInfo.replace(/\n/g, '<br/>') }),
      centered: true,
      width: 400,
      okText: '确定',
    });
  } catch (error) {
    console.error('Error in checkQuota:', error);
    if (error.message.includes('Unexpected token')) {
      Modal.error({
        title: '检查额度失败',
        content: '请检查API地址或密钥是否正确',
        centered: true,
        okText: '确定',
      });
    } else {
      Modal.error({
        title: '检查额度失败',
        content: '检查额度失败',
        centered: true,
        okText: '确定',
      });
    }
  } finally {
    checkQuota_spinning.value = false;
  }
};

// 添加 testModels 函数
async function testModels() {
  // 重置结果
  results.valid = [];
  results.invalid = [];
  results.inconsistent = [];
  results.awaitOfficialVerification = [];

  // 清空表格数据
  tableData.value = [];

  const apiUrlValue = apiUrl.value.replace(/\/+$/, '');
  const apiKeyValue = apiKey.value;
  const timeout = parseInt(modelTimeout.value);
  const concurrency = parseInt(modelConcurrency.value);
  let inputModels = modelName.value
    .split(',')
    .map(name => name.trim())
    .filter(name => name !== '');
  let selectedModelNames = selectedModels.value;

  const modelNames = Array.from(
    new Set([...inputModels, ...selectedModelNames])
  );

  if (modelNames.length === 0) {
    message.error('请输入至少一个模型名称或从列表中选择模型');
    return;
  }

  // 显示结果容器
  shouldShift.value = true;
  showResultContainer.value = true;

  // 初始化进度
  totalModels.value = selectedModels.value.length;
  completedModels.value = 0;
  progressPercent.value = 0;
  testingComplete.value = false;
  testModels_spinning.value = true;

  try {
    await testModelList(
      apiUrlValue,
      apiKeyValue,
      modelNames,
      timeout,
      concurrency,
      progress => {
        updateTableData(progress);
        completedModels.value += 1;
        progressPercent.value = Math.round(
          (completedModels.value / totalModels.value) * 100
        );
        if (completedModels.value >= totalModels.value) {
          testingComplete.value = true;
        }
      }
    );
    testModels_spinning.value = false;
    showSummary(results);
  } catch (error) {
    testModels_spinning.value = false;
    message.error('测试模型时发生错误: ' + error.message);
  } finally {
    testModels_spinning.value = false;
    testingComplete.value = true;
  }
}

function updateTableData(progress) {
  const { type, data } = progress;
  if (type === 'valid') {
    results.valid.push(data);
  } else if (type === 'invalid') {
    results.invalid.push(data);
  } else if (type === 'inconsistent') {
    results.inconsistent.push(data);
  }
  // 重新计算表格数据
  tableData.value = computeTableData();
  // 更新进度
  progressPercent.value = Math.round(
    (completedModels.value / totalModels.value) * 100
  );
}

function computeTableData() {
  const data = [];

  // 处理 valid 模型
  results.valid.forEach((item, index) => {
    const buttons = [];
    const notChatPattern =
      /^(dall|mj|midjourney|stable-diffusion|playground|flux|swap_face|tts|whisper|text|emb|luma|vidu|pdf|suno|pika|chirp|domo|runway|cogvideo|babbage|davinci|gpt-4o-realtime)/;

    // 添加对话验证按钮 (放在最前面) 如果是对话模型
    if (!notChatPattern.test(item.model)) {
      buttons.push({
        label: t('CUSTOM_DIALOG_VERIFICATION'),
        type: 'default',
        key: 'customDialogVerification',
        onClick: () => verifyCustomDialog(item.model),
      });
    }

    if (!cantFunctionModelList.includes(item.model)) {
      buttons.push({
        label: FUNCTION_VERIFICATION.value,
        type: 'default',
        key: 'functionVerification',
        onClick: () => verifyFunctionCalling(item.model),
      });
    }
    if (!cantTemperatureModelList.includes(item.model)) {
      if (isGpt(item.model) || isClaude(item.model)) {
        buttons.push({
          label: TEMPERATURE_VERIFICATION.value,
          type: 'default',
          key: 'temperatureVerification',
          onClick: () => verifyTemperature(item.model),
        });
      }
    }
    if (!cantOfficialModelList.includes(item.model)) {
      if (isGpt(item.model)) {
        buttons.push({
          label: OFFICIAL_VERIFICATION.value,
          type: 'default',
          key: 'officialVerification',
          onClick: () => verifyOfficial(item.model),
        });
      }
    }
    // 针对 o1- 模型的特殊处理
    let remark = '';
    let fullRemark = '';
    if (item.model.startsWith('o1-')) {
      if (item.has_o1_reason) {
        remark = t('O1_API_RELIABLE'); // '✨API 可靠'
        fullRemark = t('O1_API_RELIABLE_DETAIL'); // '返回响应中包含非空 reasoning_tokens，API 可靠'
      } else {
        remark = t('O1_API_POSSIBLE_ISSUE'); // '⚠️API 可能存在问题'
        fullRemark = t('O1_API_POSSIBLE_ISSUE_DETAIL'); // '返回响应中不包含 reasoning_tokens 或为空，API 非官'
      }
    }

    data.push({
      key: `valid-${index}`,
      status: `🥳${t('MODEL_STATE_AVAILABLE')} `,
      model: item.model,
      responseTime: item.responseTime.toFixed(2),
      buttons: buttons,
      remark: remark,
      fullRemark: fullRemark,
    });
  });

  // 处理 inconsistent 模型
  results.inconsistent.forEach((item, index) => {
    const buttons = [];

    const notChatPattern =
      /^(dall|mj|midjourney|stable-diffusion|playground|flux|swap_face|tts|whisper|text|emb|luma|vidu|pdf|suno|pika|chirp|domo|runway|cogvideo|babbage|davinci|gpt-4o-realtime)/;

    // 添加对话验证按钮 (放在最前面) 如果是对话模型
    if (!notChatPattern.test(item.model)) {
      buttons.push({
        label: t('CUSTOM_DIALOG_VERIFICATION'),
        type: 'default',
        key: 'customDialogVerification',
        onClick: () => verifyCustomDialog(item.model),
      });
    }

    if (!cantFunctionModelList.includes(item.model)) {
      buttons.push({
        label: FUNCTION_VERIFICATION.value,
        type: 'default',
        key: 'functionVerification',
        onClick: () => verifyFunctionCalling(item.model),
      });
    }
    if (!cantTemperatureModelList.includes(item.model)) {
      if (isGpt(item.model) || isClaude(item.model)) {
        buttons.push({
          label: TEMPERATURE_VERIFICATION.value,
          type: 'default',
          key: 'temperatureVerification',
          onClick: () => verifyTemperature(item.model),
        });
      }
    }
    if (!cantOfficialModelList.includes(item.model)) {
      if (isGpt(item.model)) {
        buttons.push({
          label: OFFICIAL_VERIFICATION.value,
          type: 'default',
          key: 'officialVerification',
          onClick: () => verifyOfficial(item.model),
        });
      }
    }

    // 根据返回的模型名称，判断是模型映射还是未匹配
    let status;
    let remark;
    let fullRemark;

    if (item.returnedModel && item.returnedModel.startsWith(`${item.model}-`)) {
      status = `😲${t('MODEL_STATE_INCONSISTENT')} `;
      remark = t('MODEL_MAPPING'); // 添加国际化
      fullRemark = `${t('MAPPED_TO_MODEL')}: ${item.returnedModel}`;
    } else {
      status = `🤔${t('NO_MATCH')}`; // 使用国际化字符串
      remark = t('NO_MATCH'); // 如果需要，也可以添加 remark 的国际化
      fullRemark = `${t('RETURNED_MODEL')}: ${item.returnedModel}`;
    }

    // 针对 o1- 模型的特殊处理
    if (item.model.startsWith('o1-')) {
      if (item.has_o1_reason) {
        remark = t('O1_API_RELIABLE'); // '✨API 可靠'
        fullRemark = t('O1_API_RELIABLE_DETAIL'); // '返回响应中包含非空 reasoning_tokens，API 可靠'
      } else {
        remark = t('O1_API_POSSIBLE_ISSUE'); // '⚠️API 可能存在问题'
        fullRemark = t('O1_API_POSSIBLE_ISSUE_DETAIL'); // '返回响应中不包含 reasoning_tokens 或为空，API 非官'
      }
    }

    data.push({
      key: `inconsistent-${index}`,
      status: status,
      model: item.model,
      responseTime: item.responseTime.toFixed(2),
      buttons: buttons,
      remark: remark,
      fullRemark: fullRemark,
    });
  });

  // 处理 invalid 模型
  results.invalid.forEach((item, index) => {
    let displayedRemark;
    let fullRemark = item.response_text || item.error || '';
    displayedRemark = errorHandler(fullRemark);

    data.push({
      key: `invalid-${index}`,
      status: `😡${t('MODEL_STATE_UNAVAILABLE')} `,
      model: item.model,
      responseTime: '-',
      buttons: [],
      remark: displayedRemark,
      fullRemark: fullRemark,
    });
  });
  return data;
}

function showSummary(results) {
  const summaryData = calculateSummaryData(results);
  const { summaryHtml, radarChartOption } = summaryData;
  summaryContent.value = summaryHtml;
  isSummaryModalVisible.value = true;
  // 等待下一次 DOM 更新后渲染雷达图
  nextTick(() => {
    renderRadarChart(radarChartOption);
  });
}

function handleSummaryOk() {
  isSummaryModalVisible.value = false;
  shouldShift.value = true;
  showResultContainer.value = true;
}

const summaryContent = ref('');

function renderRadarChart(radarChartOption) {
  if (!chartContainer.value) return;

  // 销毁之前的实例
  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chartContainer.value);
  chartInstance.setOption(radarChartOption);
}

// 定义 columns
const columns = [
  {
    title: '模型状态',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    width: 100,
    customCell: () => ({ attrs: { 'data-label': t('MODEL_STATUS_LABEL') } }),
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: '模型名称',
    dataIndex: 'model',
    key: 'model',
    width: 180,
    ellipsis: true,
    resizable: true,
    sorter: (a, b) => a.model.localeCompare(b.model),
    customCell: () => ({ attrs: { 'data-label': t('MODEL_NAME_LABEL') } }),
  },
  {
    title: '用时',
    dataIndex: 'responseTime',
    width: 70,
    key: 'responseTime',
    resizable: true,
    sorter: (a, b) => parseFloat(a.responseTime) - parseFloat(b.responseTime),
    customCell: () => ({ attrs: { 'data-label': t('RESPONSE_TIME_LABEL') } }),
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 100,
    ellipsis: true,
    resizable: true,
    customCell: () => ({ attrs: { 'data-label': t('REMARK_LABEL') } }),
  },
  {
    title: '验证',
    dataIndex: 'buttons',
    key: 'buttons',
    width: 90,
    fixed: 'right',
    customCell: () => ({
      attrs: { 'data-label': t('VERIFICATION_BUTTONS_LABEL') },
    }),
  },
];

function handleResizeColumn(w, col) {
  col.width = w;
}

// 复制文本函数
function copyText(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success(`"${text}" 已复制到剪贴板`);
    })
    .catch(err => {
      console.error('复制失败:', err);
      message.error('复制失败，请手动复制');
    });
}

// 修改 verifyTemperature 函数
async function verifyTemperature(model) {
  verificationLoading.value = true;
  try {
    const verifier = new ModelVerifier(apiUrl.value, apiKey.value);
    const result = await verifier.verifyTemperature(model);
    verificationLoading.value = false;
    // 使用弹窗显示结果
    showTemperatureVerificationResult(result);
  } catch (error) {
    verificationLoading.value = false;
    message.error('验证过程中发生错误：' + error.message);
  } finally {
    verificationLoading.value = false; // 结束加载动画
  }
}

// 定义显示温度验证结果的函数
function showTemperatureVerificationResult(result) {
  // 准备数据
  const dataSource = result.responses.map((response, index) => ({
    key: index,
    testNumber: `测试 ${index + 1}`,
    response,
  }));

  // 定义列
  const columns = [
    {
      title: t('TEST'),
      dataIndex: 'testNumber',
      key: 'testNumber',
      width: '20%',
    },
    {
      title: t('RESPONSE'),
      dataIndex: 'response',
      key: 'response',
      width: '80%',
    },
  ];

  Modal.info({
    title: t('TEMPERATURE_VERIFICATION_RESULT'),
    content: h('div', {}, [
      h(
        'p',
        { style: 'font-weight: bold;' },
        `当前待验证模型：${result.model}`
      ),
      h('p', {}, t('REFERENCE_VALUES')),
      h(
        aTable,
        {
          dataSource,
          columns,
          pagination: false,
          style: 'margin-top: 16px;',
        },
        {}
      ),
      h(
        'p',
        { style: 'margin-top: 16px; font-weight: bold;' },
        `结论：${result.conclusion}`
      ),
    ]),
    width: 600,
    okText: t('OK'),
  });
}

// 修改 verifyOfficial 函数
async function verifyOfficial(model) {
  verificationLoading.value = true;
  try {
    const verifier = new ModelVerifier(apiUrl.value, apiKey.value);
    const result = await verifier.performOfficialVerification(model, 331);
    verificationLoading.value = false;
    // 使用弹窗显示结果
    showOfficialVerificationResult(result);
  } catch (error) {
    verificationLoading.value = false;
    message.error('验证过程中发生错误：' + error.message);
  } finally {
    verificationLoading.value = false;
  }
}

// 定义显示官方验证结果的函数
function showOfficialVerificationResult(result) {
  // 准备数据
  const dataSource = result.texts.map((text, index) => ({
    key: index,
    testNumber: `测试${index + 1}`,
    text,
    fingerprint: result.fingerprints[index],
  }));

  // 定义列
  const columns = [
    {
      title: '测试',
      dataIndex: 'testNumber',
      key: 'testNumber',
      width: '25%',
    },
    {
      title: '文本',
      dataIndex: 'text',
      key: 'text',
      width: '50%',
    },
    {
      title: '系统指纹',
      dataIndex: 'fingerprint',
      key: 'fingerprint',
      width: '25%',
    },
  ];

  // 相似度结果以文本形式展示
  const similarityText = Object.entries(result.similarity)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  Modal.info({
    title: t('OFFICIAL_VERIFICATION_RESULT'),
    content: () =>
      h('div', {}, [
        h(
          'p',
          { style: 'font-weight: bold;' },
          `${t('MODEL')}: ${result.model}`
        ),
        h('p', {}, result.conclusion),
        h(
          aTable,
          {
            dataSource,
            columns,
            pagination: false,
            style: 'margin-top: 12px;',
          },
          {}
        ),
        h('p', { style: 'margin-top: 16px;' }, t('SIMILARITY_RESULTS') + '：'),
        h(
          'pre',
          { style: 'white-space: pre-wrap; font-size: 12px;' },
          similarityText
        ),
      ]),
    width: 800,
    okText: t('OK'),
  });
}

// 修改 verifyFunctionCalling 函数
async function verifyFunctionCalling(model) {
  selectedModelForFunctionCalling.value = model;
  functionCallingModalVisible.value = true;
}

function handleFunctionCallingOk() {
  const a = functionCallingA.value;
  const b = functionCallingB.value;
  if (isNaN(a) || isNaN(b)) {
    message.error('请输入有效的数字 a 和 b');
    return;
  }
  functionCallingModalVisible.value = false;
  performFunctionCallingVerification(
    selectedModelForFunctionCalling.value,
    a,
    b
  );
  setTimeout(() => {
    const triggerButton = document.querySelector(
      '[data-model="' + selectedModelForFunctionCalling.value + '"]'
    );
    if (triggerButton) {
      triggerButton.focus();
    }
  }, 0);
}

async function performFunctionCallingVerification(model, a, b) {
  verificationLoading.value = true; // 开始加载动画
  try {
    const verifier = new ModelVerifier(apiUrl.value, apiKey.value);
    const result = await verifier.verifyFunctionCalling(model, a, b);
    verificationLoading.value = false;
    // 使用弹窗显示结果
    showFunctionCallingResult(result);
  } catch (error) {
    verificationLoading.value = false;
    message.error('验证过程中发生错误：' + error.message);
  } finally {
    verificationLoading.value = false; // 结束加载动画
  }
}

// 定义显示函数调用验证结果的函数
function showFunctionCallingResult(result) {
  Modal.info({
    title: t('FUNCTION_VERIFICATION_RESULT'),
    content: () =>
      h('div', {}, [
        h(
          'p',
          { style: 'font-weight: bold;' },
          `${t('MODEL')}: ${result.model}`
        ),
        h('div', { style: 'display: flex; justify-content: space-between;' }, [
          h('div', { style: 'width: 48%;' }, [
            h(
              'p',
              { style: 'font-weight: bold;' },
              `${t('STANDARD_RESPONSE')}:`
            ),
            h(
              'pre',
              {
                style:
                  'font-size: 12px; border: 1px solid #ddd; padding: 8px; border-radius: 4px;',
              },
              JSON.stringify(result.standardResponse, null, 4)
            ),
          ]),
          h('div', { style: 'width: 48%;' }, [
            h('p', { style: 'font-weight: bold;' }, `${t('MODEL_RESPONSE')}:`),
            h(
              'pre',
              {
                style:
                  'font-size: 12px; border: 1px solid #ddd; padding: 8px; border-radius: 4px;',
              },
              JSON.stringify(result.modelResponse, null, 4)
            ),
          ]),
        ]),
      ]),
    width: 600,
    okText: t('OK'),
  });
}

// 云端缓存相关状态
const isCloudLoggedIn = ref(false);
const cloudUrl = ref('');
const cloudPassword = ref('');
let cloudAuthHeader = ''; // 存储 Authorization 头的值
const cloudDataList = ref([]);

const localListStyle = computed(() => {
  if (localCacheList.value.length > 4) {
    return { maxHeight: '320px', overflowY: 'auto' };
  } else {
    return {};
  }
});

const cloudListStyle = computed(() => {
  if (cloudDataList.value.length > 5) {
    return { maxHeight: '420px', overflowY: 'auto' };
  } else {
    return {};
  }
});

// 本地缓存相关状态
const settingsApiUrl = ref('');
const settingsApiKey = ref('');
const localCacheList = ref([]);

// 打开设置面板时，自动将主表单中的 apiUrl 和 apiKey 赋值给设置面板的输入框
function openSettingsModal() {
  settingsApiUrl.value = apiUrl.value;
  settingsApiKey.value = apiKey.value;

  // 检查云端登录状态
  const savedCloudUrl = localStorage.getItem('cloudUrl');
  const savedCloudPassword = localStorage.getItem('cloudPassword');
  const savedIsCloudLoggedIn = localStorage.getItem('isCloudLoggedIn');

  if (savedIsCloudLoggedIn === 'true' && savedCloudUrl && savedCloudPassword) {
    cloudUrl.value = savedCloudUrl;
    cloudPassword.value = savedCloudPassword;
    isCloudLoggedIn.value = true;
    cloudAuthHeader = `Bearer ${cloudPassword.value}`;
    fetchCloudData();
  }
  showAppSettingsModal.value = true;
}

function openGitHub() {
  window.open(appInfo.githubUrl);
}

// 关闭设置面板
function closeSettingsModal() {
  showAppSettingsModal.value = false;
  setTimeout(() => {
    const settingsButton = document.querySelector(
      '[aria-label="' + t('SETTINGS') + '"]'
    );
    if (settingsButton) {
      settingsButton.focus();
    }
  }, 0);
}

// 保存到本地缓存
function saveToLocal() {
  // 将设置面板中的值赋回主表单
  apiUrl.value = settingsApiUrl.value;
  apiKey.value = settingsApiKey.value;

  // 获取已有的本地缓存列表
  const existingList = JSON.parse(localStorage.getItem('localCacheList')) || [];
  //查找是否有相同的 url 和 sk
  const existingIndex = existingList.findIndex(
    existingItem =>
      normalizeUrl(existingItem.url) === normalizeUrl(apiUrl.value) &&
      existingItem.apiKey.trim() === apiKey.value.trim()
  );
  if (existingIndex !== -1) {
    message.error(t('RECORD_ALREADY_EXISTS'));
    return;
  }
  // 加入时间戳
  const id = Math.floor(Math.random() * 100);
  // 创建新的缓存项
  const newCacheItem = {
    id: Date.now() + id,
    url: apiUrl.value,
    apiKey: apiKey.value,
    name: `配置 ${existingList.length + 1}`,
  };

  // 添加新的缓存项到列表
  existingList.push(newCacheItem);

  // 新本地缓存表
  localCacheList.value = existingList;
  localStorage.setItem('localCacheList', JSON.stringify(existingList));

  message.success(t('DATA_SAVED'));
}

// 导入本地缓存记录
function loadLocalRecord(id) {
  const record = localCacheList.value.find(item => item.id === id);
  if (record) {
    apiUrl.value = record.url;
    apiKey.value = record.apiKey;
    message.success(t('CONFIG_IMPORTED'));
  }
}

// 删除本地缓存记录
function deleteLocalRecord(id) {
  localCacheList.value = localCacheList.value.filter(item => item.id !== id);
  localStorage.setItem('localCacheList', JSON.stringify(localCacheList.value));
  message.success(t('RECORD_DELETED'));
}

// 导出本地缓存
function exportLocalCache() {
  // 导出的数据仅包含 url 和 sk
  const dataToExport = localCacheList.value.map(item => ({
    url: item.url,
    sk: item.apiKey,
  }));
  const dataStr = JSON.stringify(dataToExport, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'api-check-local.json'; // 修改文件名
  link.click();
  URL.revokeObjectURL(url);
  message.success(t('DATA_EXPORTED'));
}

// 导入本地缓存
function importLocalCache() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const importedData = JSON.parse(event.target.result);
        // 将 importedData 规范为数组形式，方便统一处理
        const dataArray = Array.isArray(importedData)
          ? importedData
          : [importedData];

        dataArray.forEach(item => {
          // 兼容不同的字段名
          const importedUrl = normalizeUrl(item.url || item.apiUrl || '');
          const importedApiKey = (item.sk || item.apiKey || '').trim();
          if (!importedUrl || !importedApiKey) {
            // 如果缺少必要的字段，跳过该项
            return;
          }
          // 查找是否有相同的 url 和 apiKey
          const existingIndex = localCacheList.value.findIndex(
            existingItem =>
              normalizeUrl(existingItem.url) === importedUrl &&
              existingItem.apiKey.trim() === importedApiKey
          );

          // 随机两位数字
          const id = Date.now() + Math.floor(Math.random() * 100);
          const newItem = {
            id: id,
            url: importedUrl,
            apiKey: importedApiKey,
            name: `导入的配置 ${localCacheList.value.length + 1}`,
          };

          if (existingIndex !== -1) {
            // 存在相同的配置，进行覆盖
            localCacheList.value[existingIndex] = newItem;
          } else {
            // 不存在，添加新的配置
            localCacheList.value.push(newItem);
          }
        });

        localStorage.setItem(
          'localCacheList',
          JSON.stringify(localCacheList.value)
        );
        message.success(t('DATA_IMPORTED'));
      } catch (error) {
        message.error(t('IMPORT_PARSE_ERROR'));
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function normalizeUrl(url) {
  return url.replace(/\/+$/, '').toLowerCase();
}

// 处理云端登录
async function handleCloudLogin() {
  if (!cloudUrl.value || !cloudPassword.value) {
    message.error(t('PLEASE_ENTER_CLOUD_URL_AND_PASSWORD'));
    return;
  }
  try {
    // 向 /auth 接口发送 POST 请求
    const response = await fetch(`${cloudUrl.value}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: cloudPassword.value }),
    });
    if (response.ok) {
      isCloudLoggedIn.value = true;
      cloudAuthHeader = `Bearer ${cloudPassword.value}`;
      message.success(t('CLOUD_LOGIN_SUCCESS'));
      // 登录后，获取云端数据
      await fetchCloudData();

      // 保存登录信息到 localStorage
      localStorage.setItem('cloudUrl', cloudUrl.value);
      localStorage.setItem('cloudPassword', cloudPassword.value);
      localStorage.setItem('isCloudLoggedIn', 'true');
    } else {
      message.error(t('CLOUD_LOGIN_FAILED'));
    }
  } catch (error) {
    message.error(t('CLOUD_LOGIN_ERROR'));
    console.error(error);
  }
}

// 处理云端登出
function handleCloudLogout() {
  isCloudLoggedIn.value = false;
  cloudPassword.value = '';
  cloudAuthHeader = '';
  cloudDataList.value = [];
  localStorage.removeItem('cloudUrl');
  localStorage.removeItem('cloudPassword');
  localStorage.removeItem('isCloudLoggedIn');
}

// 获取云端数据
async function fetchCloudData() {
  if (!isCloudLoggedIn.value) {
    message.error(t('PLEASE_LOGIN_TO_CLOUD'));
    return;
  }
  try {
    const response = await fetch(cloudUrl.value, {
      headers: { Authorization: cloudAuthHeader },
    });
    if (response.ok) {
      const data = await response.json();
      // 将数据转换为与本地缓存一致的格式
      cloudDataList.value = data.map((item, index) => ({
        id: Date.now() + index,
        url: item.url,
        apiKey: item.apiKey,
        name: item.name || `配置 ${index + 1}`,
        // 移除 description 字段，直接在渲染时显示更多信息
      }));
      message.success(t('CLOUD_DATA_LOADED'));
    } else {
      message.error(t('CLOUD_DATA_LOAD_FAILED'));
    }
  } catch (error) {
    message.error(t('CLOUD_DATA_LOAD_ERROR'));
    console.error(error);
  }
}

// 保存数据到云端
async function saveToCloud() {
  if (!isCloudLoggedIn.value) {
    message.error(t('PLEASE_LOGIN_TO_CLOUD'));
    return;
  }
  try {
    const response = await fetch(cloudUrl.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cloudAuthHeader,
      },
      body: JSON.stringify(cloudDataList.value),
    });
    if (response.ok) {
      message.success(t('DATA_SAVED_TO_CLOUD'));
    } else {
      message.error(t('DATA_SAVE_TO_CLOUD_FAILED'));
    }
  } catch (error) {
    message.error(t('DATA_SAVE_TO_CLOUD_ERROR'));
    console.error(error);
  }
}

// 确认保存数据到云端
function confirmSaveCloudData() {
  Modal.confirm({
    title: t('CONFIRM_SAVE'),
    content: t('CONFIRM_SAVE_PROMPT'),
    okText: t('OK'),
    cancelText: t('CANCEL'),
    onOk() {
      saveToCloud();
    },
  });
}

// 导入云端缓存记录
function loadCloudRecord(id) {
  const record = cloudDataList.value.find(item => item.id === id);
  if (record) {
    apiUrl.value = record.url;
    apiKey.value = record.apiKey;
    message.success(t('CONFIG_IMPORTED'));
  }
}

// 删除云端记录
function deleteCloudRecord(id) {
  cloudDataList.value = cloudDataList.value.filter(item => item.id !== id);
  message.success(t('RECORD_DELETED_PLEASE_SAVE'));
}

// 导出云端缓存
function exportCloudCache() {
  const dataToExport = cloudDataList.value.map(item => ({
    url: item.url,
    sk: item.apiKey,
  }));
  const dataStr = JSON.stringify(dataToExport, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'api-check-cloud.json'; // 修改文件名
  link.click();
  URL.revokeObjectURL(url);
  message.success(t('DATA_EXPORTED'));
}

// 导入云端缓存
function importCloudCache() {
  if (!isCloudLoggedIn.value) {
    message.error(t('PLEASE_LOGIN_TO_CLOUD'));
    return;
  }
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const importedData = JSON.parse(event.target.result);
        // 将 importedData 规范为数组形式，方便统一处理
        const dataArray = Array.isArray(importedData)
          ? importedData
          : [importedData];

        dataArray.forEach(item => {
          // 兼容不同的字段名
          const importedUrl = normalizeUrl(item.url || item.apiUrl || '');
          const importedApiKey = (item.sk || item.apiKey || '').trim();

          if (!importedUrl || !importedApiKey) {
            // 如果缺少必要的字段，跳过该项
            return;
          }
          // 查找是否有相同的 url 和 apiKey
          const existingIndex = cloudDataList.value.findIndex(
            existingItem =>
              normalizeUrl(existingItem.url) === importedUrl &&
              existingItem.apiKey.trim() === importedApiKey
          );
          // 随机两位数字
          const id = Date.now() + Math.floor(Math.random() * 100);

          const newItem = {
            id: id,
            url: importedUrl,
            apiKey: importedApiKey,
            name: `导入的配置 ${cloudDataList.value.length + 1}`,
          };

          if (existingIndex !== -1) {
            // 存在相同的配置，进行覆盖
            cloudDataList.value[existingIndex] = newItem;
          } else {
            // 不存在，添加新的配置
            cloudDataList.value.push(newItem);
          }
        });

        message.success(t('DATA_IMPORTED_PLEASE_SAVE'));
      } catch (error) {
        message.error(t('IMPORT_PARSE_ERROR'));
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// 页面加载时尝试读取本地缓存
onMounted(() => {
  // 尝试读取本地缓存列表
  const savedLocalDataList = localStorage.getItem('localCacheList');
  if (savedLocalDataList) {
    localCacheList.value = JSON.parse(savedLocalDataList);
  } else {
    localCacheList.value = [];
  }

  // 检查云端登录状态
  const savedCloudUrl = localStorage.getItem('cloudUrl');
  const savedCloudPassword = localStorage.getItem('cloudPassword');
  const savedIsCloudLoggedIn = localStorage.getItem('isCloudLoggedIn');

  if (savedIsCloudLoggedIn === 'true' && savedCloudUrl && savedCloudPassword) {
    cloudUrl.value = savedCloudUrl;
    cloudPassword.value = savedCloudPassword;
    isCloudLoggedIn.value = true;
    cloudAuthHeader = `Bearer ${cloudPassword.value}`;
    // 自动获取云端数据
    fetchCloudData();
  }
});

// goChat
function goChat(modelName) {
  // 模拟获取模型并打印数据
  if (!apiKey.value || !apiUrl.value) {
    message.error('请先填写 API Key 和 API URL');
    return;
  }
  //判断是否有modelName 没有就不给url 传值
  let url = `${chatSite.value}/#/?settings={"key":"${apiKey.value}","url":"${apiUrl.value}"}`;
  if (modelName) {
    url = `${chatSite.value}/#/?settings={"key":"${apiKey.value}","url":"${apiUrl.value}","model":"${modelName}"}`;
  }
  window.open(url);
}

function goShare() {
  // 生成 SVG Data URL

  svgDataUrl.value = createSVGDataURL(results, apiUrl.value);
  showSVGModal.value = true;
}

function handleCloseSVGModal() {
  showSVGModal.value = false;
}

function copyToClipboardHandler() {
  if (!svgDataUrl.value) {
    message.error('请先生成SVG图片');
    return;
  }

  // 创建一个临时的 Image 对象
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(function (blob) {
      if (blob) {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(
          function () {
            message.success('PNG图片已复制到贴板！');
          },
          function (err) {
            console.error('复制到剪贴板失败: ', err);
            message.error('复制到剪贴板失败');
          }
        );
      } else {
        message.error('转换图片失败');
      }
    }, 'image/png');
  };
  img.onerror = function () {
    message.error('加载SVG数据时发生错误');
  };
  img.src = svgDataUrl.value;
}

function copyModels(type) {
  let models = [];
  if (type === 'valid') {
    models = results.valid.map(r => r.model);
  } else if (type === 'available') {
    models = results.valid.map(r => r.model);
    models = models.concat(results.inconsistent.map(r => r.model));
    if (
      results.awaitOfficialVerification &&
      results.awaitOfficialVerification.length
    ) {
      models = models.concat(
        results.awaitOfficialVerification.map(r => r.model)
      );
    }
  }
  if (models.length === 0) {
    message.info(t('NO_MODELS_TO_COPY'));
    return;
  }
  //需要加入,分割
  const textToCopy = models.join(',');
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      message.success(
        t('COPIED_MODELS_TO_CLIPBOARD', {
          type:
            type === 'valid' ? t('IDENTICAL_MODELS') : t('AVAILABLE_MODELS'),
          count: models.length,
        })
      );
    })
    .catch(err => {
      console.error('复制失败:', err);
      message.error(t('COPY_FAILED'));
    });
}

// 模态框显示控制
const customDialogModalVisible = ref(false);
const currentVerifyingModel = ref('');
// 计算模型列表
const modelNames = computed(() => {
  let inputModels = modelName.value
    .split(',')
    .map(name => name.trim())
    .filter(name => name !== '');
  let selectedModelNames = selectedModels.value || [];
  let currentModel = currentVerifyingModel.value
    ? [currentVerifyingModel.value]
    : [];
  return Array.from(
    new Set([...inputModels, ...selectedModelNames, ...currentModel])
  );
});

// 模型选项列表，用于下拉框
const modelOptions = computed(() =>
  modelNames.value.map(name => ({
    label: name,
    value: name,
  }))
);

// 提示词相关
const customDialogPrompt = ref('');
const customDialogResult = ref(null);
const customDialogLoading = ref(false);

// 预设的提示词列表，包含标题、内容和描述
const presetPrompts = ref(presetPromptsList);

// 提示词选项列表，用于下拉框
const promptOptions = computed(() =>
  presetPrompts.value.map(prompt => ({
    label: prompt.title,
    value: prompt.title,
  }))
);

const selectedPresetPrompt = ref(null);

// 修改 changePrompt 函数
function changePrompt(value) {
  const prompt = presetPrompts.value.find(item => item.title === value);
  if (prompt) {
    customDialogPrompt.value = prompt.content;
  } else {
    customDialogPrompt.value = '';
  }
}

// 添加根据提示词内容获取描述的方法
function getPromptDescriptionByContent(content) {
  const prompt = presetPrompts.value.find(item => item.content === content);
  return prompt ? prompt.description : t('NO_DESCRIPTION_AVAILABLE');
}

// 处理发送请求
async function handleCustomDialogSubmit() {
  if (!customDialogPrompt.value) {
    message.error(t('ENTER_PROMPT'));
    return;
  }

  if (!currentVerifyingModel.value) {
    message.error(t('SELECT_MODEL'));
    return;
  }

  customDialogLoading.value = true;
  try {
    const verifier = new ModelVerifier(apiUrl.value, apiKey.value);
    customDialogResult.value = await verifier.verifyCustomDialog(
      currentVerifyingModel.value,
      customDialogPrompt.value
    );
  } catch (error) {
    message.error(error.message);
  } finally {
    customDialogLoading.value = false;
  }
}

// 处理继续测试
function handleContinueTesting() {
  customDialogResult.value = null;
  // 模型和提示词保持默认值，无需重新设置
}

// 处理关闭模态框
function handleCustomDialogCancel() {
  customDialogModalVisible.value = false;
  customDialogPrompt.value = '';
  customDialogResult.value = null;
  selectedPresetPrompt.value = null;
}

// 打开验证对话框的函数
function verifyCustomDialog(model) {
  currentVerifyingModel.value = model || modelNames.value[0] || '';
  customDialogModalVisible.value = true;
}

// 添加粘贴处理函数
async function handlePaste() {
  try {
    const text = await navigator.clipboard.readText();
    // 先设置文本值
    apiInfo.value = text;
    let { apiUrl: extractedUrl, apiKey: extractedKey } = extractApiInfo(text);
    if (extractedUrl) {
      apiUrl.value = extractedUrl;
    }
    if (extractedKey) {
      apiKey.value = extractedKey;
    }
    message.success(t('PASTE_SUCCESS'));
  } catch (err) {
    console.error('粘贴失败:', err);
    message.error(t('PASTE_FAILED'));
  }
}
</script>

<style scoped>
.left-icons {
  display: flex;
  align-items: center;
  gap: 10px;
  /* 靠左对齐 */
  justify-content: flex-start;
}

/* 统一图标按钮的样式 */
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color);
  transition: color 0.3s;
  cursor: pointer;
}

.icon-button.disabled-icon {
  pointer-events: none; /* 禁用点击 */
  opacity: 0.5; /* 调整透明度，表示禁用状态 */
  cursor: not-allowed; /* 光标为禁用状态 */
}

.icon-button:hover:not(.disabled-icon) {
  color: #0366d6;
}

.icon-button:hover {
  color: #0366d6;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 通用样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(var(--vh, 1vh) * 100);
}

.page-content {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

.container {
  width: 100%;
  max-width: 600px; /* 根据需要设置最大宽度 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--background-color); /* 使用主题变量 */
  color: var(--font-color);
  border-radius: 10px; /* 圆角 */
  border-top: 4px solid var(--border-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影，使容器更突出 */
  align-items: center;
  transition: transform 0.3s ease-in-out;
  margin: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: var(--font-color);
  font-size: 24px;
  cursor: pointer;
}

.close-button:hover {
  color: #ff0000; /* 悬停时的颜色变化 */
}

.container.result-container {
  opacity: 0;
  transform: translateX(5%);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.container.result-container.show {
  opacity: 1;
  transform: translateX(0);
}

.container.shift-left {
  transform: translateX(-5%); /* 向左移动 5% */
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  min-width: 0; /* 防止子元素溢出 */
}

.header > * {
  min-width: 0; /* 允许子元素缩小 */
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

.language-menu-button {
  display: block;
  width: 100%;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  color: #333;
  transition: background 0.3s;
}

.language-menu-button:hover {
  background: #e0e0e0;
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
  height: 97px;
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

.model-timeout label,
.model-concurrency label {
  margin-right: 5px;
  font-size: 14px;
}

.model-timeout input,
.model-concurrency input {
  flex: 1;
  padding: 5px;
  font-size: 14px;
}

.submit-container input[type='button'] {
  flex: 1;
  min-width: 0;
  padding: 8px;
  font-size: 14px;
  height: 50px;
  margin-right: 25px;
}

.submit-container input[type='button']:last-child {
  margin-right: 0;
}

.model-input-container textarea {
  width: 100%;
  margin-bottom: 10px;
}

.submit-container input[type='button'] {
  width: 100%;
}

/* 主题样式 */
body.dark-mode {
  background-color: #1e1e1e;
  color: #e0e0e0;
  --background-color: #2e2e2e; /* 修改为不透明的深灰色 */
  --font-color: #e0e0e0;
  --input-background-color: #3c3c3c;
  --input-border-color: #555555;
}

body.light-mode {
  background-color: #ffffff;
  color: #000000;
  --background-color: #f8f8f8; /* 修改为深灰色 */
  --font-color: #000000;
  --input-background-color: #ffffff;
  --input-border-color: #cccccc;
}

body.light-mode .submit-query {
  background-color: #007bff;
}

body.light-mode .submit-query:hover {
  background-color: #006ae6;
}

body.light-mode .check-quota {
  background-color: #28a745;
  color: white;
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

/* 适配黑色模式的模态框样式 */

.checkbox-container a-checkbox {
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 8px;
}

/* 确保复选框在正确的模式下的可读性 */

.ant-checkbox + span {
  color: var(--font-color) !important;
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

@media (pointer: coarse) {
  /* 针对触摸设备的优化 */
  .submit-container input[type='button'] {
    padding: 12px;
  }
}

input[type='text'],
textarea,
input[type='number'] {
  font-size: 14px;
  font-family: 'SmileySans Oblique', sans-serif;
}

input[type='text']::placeholder,
textarea::placeholder,
input[type='number']::placeholder {
  font-style: italic;
  color: #888;
}

/* 当输入框有内容时，增加字体的区分度 */
input[type='text']:not(:placeholder-shown),
textarea:not(:placeholder-shown),
input[type='number']:not(:placeholder-shown) {
  font-weight: 500;
  color: var(--font-color);
}

/* 响应式设计 */
@media (max-width: 600px) {
  .container {
    max-width: 95%;
  }

  .model-input-container,
  .model-timeout-concurrency,
  .submit-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .model-input-container textarea {
    width: 60%;
    margin-right: 5px;
  }

  .model-timeout,
  .model-concurrency {
    width: 48%;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .page-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    max-width: 1200px;
    margin: 20px auto;
  }

  .container,
  .container.result-container {
    max-width: 600px;
    flex: 0 1 auto;
    min-height: 0; /* 允许容器根据内容收缩 */
    margin: 0 10px;
    display: flex;
    flex-direction: column;
  }

  .container.result-container {
    opacity: 0;
    transform: translateX(0%);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .container.result-container.show {
    opacity: 1;
    transform: translateX(0);
  }

  .container:not(:last-child) {
    margin-bottom: 0;
  }

  .container.shift-left {
    transform: translateX(0%); /* 将左移距离调整为20% */
  }

  .container:not(:last-child) {
    margin-bottom: 0;
  }

  .verify-btn-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 80px;
  }
}

/* 移动端样式 */
@media (max-width: 767px) {
  .container {
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  .container.shift-left,
  .container.result-container {
    transform: none;
    opacity: 1;
  }

  .result-container {
    width: 100%;
    overflow: hidden; /* 防止内容溢出 */
    max-width: 95%;
    margin-bottom: 20px;
  }

  /* 添加以下内容，确保 .page-content 仍然占据可用空间，并且内容可滚动 */
  .page-content {
    flex-grow: 1;
    overflow-y: auto;
  }
}

/* 调整表格容器 */
.table-container {
  width: 100%;
}

.result-table .ant-table-cell {
  padding: 8px;
  table-layout: fixed;
  white-space: normal; /* 允许内容换行 */
  word-break: break-all; /* 长单词会换行 */
}

.result-table .ant-table {
  margin: 0; /* 去除外边距 */
}

.result-table .ant-table-thead > tr > th {
  padding: 8px;
}

.result-table .ant-table-row {
  word-break: break-all;
}

/* 更新 h1 元素的样式，使闪光效果适应文字边界，并调整闪光颜色 */
h1 {
  position: relative;
  display: inline-block;
  font-weight: bold;
  color: #007bff;
  overflow: hidden; /* 确保伪元素不超出文字区域 */
}

h1::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%; /* 初始位置在左侧不可见区域 */
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  ); /* 定义闪光的渐变效果 */
  transform: skewX(-30deg); /* 倾斜闪光，以增加动感 */
}

h1:hover::after {
  animation: shine 0.75s forwards; /* 悬停时触发动画 */
}

@keyframes shine {
  to {
    left: 100%; /* 最终位置在右侧不可见区域 */
  }
}

/* 调整按钮样式 */
.verify-btn-group .ant-btn {
  margin-bottom: 5px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: var(--font-color);
  font-size: 16px;
  cursor: pointer;
}

.close-button:hover {
  color: #ff4d4f;
}

/* 黑色模式适配 */
body.dark-mode {
  --bg-color: #2e2e2e;
  --font-color: #e0e0e0;
  --border-color: #555;
}

body.light-mode {
  --bg-color: #ffffff;
  --font-color: #000000;
  --border-color: #ddd;
}

.result-table {
  background-color: var(--bg-color);
  color: var(--font-color);
}

.result-table .ant-table-thead > tr > th {
  background-color: var(--bg-color);
  color: var(--font-color);
}

.result-table .ant-table-tbody > tr > td {
  background-color: var(--bg-color);
  color: var(--font-color);
}

/* 移动端样式调整 */
@media (max-width: 767px) {
  .result-table .ant-table-thead {
    display: none;
  }

  .result-table .ant-table-row {
    display: block;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--border-color);
  }

  .result-table .ant-table-row > td {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border: none;
  }

  .result-table .ant-table-cell {
    background-color: var(--background-color);
    color: var(--font-color);
  }

  .result-table .ant-table-cell-fix-right {
    background-color: var(--background-color);
  }

  .result-table .ant-table-cell::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 8px;
    color: var(--font-color);
  }

  .result-table .ant-table-cell {
    display: flex;
    align-items: center;
    padding: 4px 8px;
  }

  /* 调整按钮在移动端的显示 */
  .verify-btn-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center; /* 使按钮在水平方向居中 */
    gap: 5px;
  }

  input[type='text'],
  textarea,
  input[type='number'] {
    font-size: 16px; /* 在移动设备上将字体大小设置为 16px */
  }
}

.list-item {
  border-bottom: 1px solid var(--border-color);
  padding: 8px 0;
}

.list-item-content {
  display: flex;
  flex-direction: column;
}

.list-item-field {
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  padding: 8px 0;
  display: flex;
  flex-direction: row; /* 确保子元素水平排列 */
  align-items: flex-start; /* 垂直方向顶部对齐 */
  text-align: left; /* 确保文本左对齐 */
}

.field-label {
  font-weight: bold;
  margin-right: 8px;
  min-width: 100px;
  text-align: left;
}

.field-value {
  flex: 1;
  word-break: break-all;
  text-align: left;
}

/* 调整按钮在移动端的显示 */

.list-item {
  border: 1px solid var(--border-color, #e0e0e0); /* 使用CSS变量，提供默认值 */
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: var(--background-color, #fff);
  display: flex;
  flex-direction: column; /* 确保子元素垂直排列 */
  flex-grow: 1;
}

/* 去除最后一个字段的下边框 */
.list-item-field:last-child {
  border-bottom: none;
}

/* 字段标签的样式 */
.field-label {
  font-weight: 600;
  margin-right: 8px;
  color: var(--font-color, #333);
}

/* 字段值的样式 */
.field-value {
  flex: 1;
  color: var(--font-color, #333);
}

/* 深色模式下的样式 */
body.dark-mode .list-item {
  background-color: var(--background-color, #2b2b2b);
  border-color: var(--border-color, #444);
}

body.dark-mode .list-item-field {
  border-bottom-color: var(--border-color, #444);
}

body.dark-mode .field-label {
  color: var(--font-color, #ddd);
}

body.dark-mode .field-value {
  color: var(--font-color, #ccc);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

/* 根据主题换背景色 */
body.dark-mode {
  --overlay-background-color: rgba(0, 0, 0, 0.3);
}

body.light-mode {
  --overlay-background-color: rgba(255, 255, 255, 0.7);
}

.result-content {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.table-container {
  flex: 0 1 auto; /* 防止表格容器过度拉伸 */
  display: flex;
  flex-direction: column;
}

/* 确保表格不会过度拉伸 */
.result-table .ant-table-wrapper,
.result-table .ant-table,
.result-table .ant-table-container {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
}

.result-table .ant-table-body {
  flex: 0 1 auto;
  overflow-y: auto; /* 当内容超出时，出现滚动条 */
}

.result-table {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.result-table .ant-table {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.result-table .ant-table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.result-table .ant-table-body {
  flex: 1;
  overflow-y: auto; /* 表格主体部分滚动 */
}

.svg-container {
  text-align: center;
  margin-top: 20px;
}

.copy-close-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px; /* 根据需要调整顶部间距 */
}

.copy-close-container .ant-btn {
  flex: 0 0 auto; /* 防止按钮过度拉伸 */
}

.copy-close-container .ant-btn:first-child {
  margin-right: auto; /* 将第一个按钮（复制按钮）推到最左侧 */
}

.copy-close-container .ant-btn:last-child {
  margin-left: auto; /* 将最后一个按钮（关闭按钮）推到最右侧 */
}

/* 折叠面板标题样式 */
.announcement-collapse .ant-collapse-header {
  font-weight: bold;
  font-size: 14px;
  padding: 8px;
}

/* 折叠面板内容样式 */
.announcement-collapse .ant-collapse-content {
  padding: 8px;
}

/* 调整折叠面板的边框和背景 */
.announcement-collapse .ant-collapse {
  border: none;
  background-color: transparent;
}

.announcement-collapse .ant-collapse-item {
  border-bottom: 1px solid #e8e8e8;
}

.announcement-collapse .ant-collapse-content > .ant-collapse-content-box {
  padding: 0 8px;
}

/* 调整列表项的样式 */
.announcement-collapse li {
  margin: 4px 0;
}

.ant-modal .ant-modal-body {
  max-height: 70vh;
  overflow-y: auto;
}

.ant-list-item {
  min-height: 80px; /* 根据需要调整 */
}

.ant-list {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.5) transparent;
}

.ant-list::-webkit-scrollbar {
  width: 6px;
}

.ant-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.announcement-popup strong {
  font-size: 14px;
}

.announcement-popup a {
  color: #1890ff;
  text-decoration: none;
}

.announcement-popup a:hover {
  text-decoration: underline;
}

.dialog-result {
  .result-item {
    margin-bottom: 16px;

    .label {
      font-weight: bold;
      margin-bottom: 4px;
    }

    .content {
      /* 移除背景和边框，使布局更加紧凑 */
      background: none;
      padding: 0;
      border: none;

      /* 设置水平布局时的样式 */
      display: flex;
      align-items: center;

      &.no-box {
        /* 特殊样式，用于移除框框 */
        background: none;
        padding: 0;
        border: none;
        display: inline;
      }

      &.response-content {
        background: var(--background-color);
        padding: 8px;
        border-radius: 4px;
        white-space: pre-wrap;
        border: 1px solid #d9d9d9;
        max-height: 150px;
        overflow-y: auto;
      }

      pre {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-all;
        font-size: 12px;
      }
    }
  }
}

/* 调整原始响应字体大小 */
.raw-response-pre {
  font-size: 12px;
}

.popover-description-pre {
  margin: 0; /* 去除默认的 margin */
  white-space: pre-wrap; /* 保留换行符，自动换行 */
  word-break: break-word; /* 单词过长时换行 */
  font-size: 14px; /* 根据需要调整字体大小 */
}
</style>
