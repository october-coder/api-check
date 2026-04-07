# API Check 项目文档

## 1. 项目概述

**API Check** 是一个纯前端 OpenAI API 测试工具，用于测试 API 代理的可用性、一致性和真实性。支持 one-api、new-api 及 OpenAI 格式的 API。

- **版本**: 2.1.0
- **技术栈**: Vue 3 + Vite 5 + Ant Design Vue 4 + ECharts 5
- **部署方式**: Vercel / Docker / Cloudflare Pages

---

## 2. 项目结构

```
api-check/
├── api/                    # 后端 API (Vercel Serverless / Local Express)
│   ├── index.js           # 云存储
│   ├── auth.js            # 认证
│   ├── alive.js           # 实验性功能
│   └── local/             # 本地 Express 路由
├── src/
│   ├── main.js           # Vue 入口
│   ├── App.vue           # 根组件
│   ├── components/
│   │   ├── Check.vue     # 核心测试组件
│   │   └── Experimental.vue # 实验性功能 (GPT/Claude/Gemini 批量测试)
│   ├── views/
│   │   ├── Home.vue      # 首页
│   │   └── Layout.vue    # 布局
│   ├── router/index.js   # 路由配置
│   ├── utils/
│   │   ├── api.js        # API 测试函数
│   │   ├── verify.js     # 模型验证器
│   │   ├── normal.js      # 辅助函数
│   │   ├── svg.js         # SVG 分享卡片
│   │   ├── models.js      # 模型列表和预设
│   │   ├── theme.js       # 主题切换
│   │   ├── info.js        # 应用信息
│   │   └── update.js      # 版本检查
│   ├── i18n/             # 国际化
│   └── styles/global.css # 全局样式
├── server.js             # Express 生产服务器
└── vite.config.js        # Vite 配置
```

---

## 3. 核心功能

### 3.1 API 测试

| 功能 | 说明 |
|------|------|
| 模型可用性测试 | 并发测试多个模型，配置超时和并发数 |
| 模型列表获取 | 从 API 端点获取可用模型列表 |
| 配额检查 | 查询账户使用量和剩余额度 |
| 智能信息提取 | 自动从粘贴文本中提取 URL 和 API Key |

### 3.2 高级验证

| 验证类型 | 说明 |
|----------|------|
| **Temperature 一致性验证** | 使用低温度(0.01)测试模型输出一致性 |
| **官方 API 验证** | 检测系统指纹和响应相似度 |
| **Function Calling 验证** | 测试函数调用能力 |
| **自定义对话验证** | 使用预设 prompt 测试（如"鲁迅暴打周树人"）|

### 3.3 存储与分享

- **本地存储**: 保存/加载配置到浏览器 localStorage
- **云存储**: 保存配置到后端（Vercel KV 或本地 Express）
- **SVG 分享卡片**: 生成可分享的结果图片
- **URL 预设**: 通过 URL 参数分享配置

### 3.4 实验性功能

- GPT Refresh Token 批量测试
- Claude Session Key 批量测试
- Gemini API Key 批量测试

---

## 4. 运行逻辑

### 4.1 数据流程

```
用户输入 (API URL + Key + Models)
        │
        ▼
┌─────────────────────────────┐
│  Check.vue - 主组件          │
│  - 表单验证                  │
│  - 模型选择弹窗              │
│  - URL 参数解析             │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  api.js - API 测试函数       │
│  - fetchModelList()          │
│  - fetchQuotaInfo()          │
│  - testModelList()           │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  目标 API                   │
│  - POST /v1/chat/completions │
│  - GET /v1/models            │
│  - GET /dashboard/billing/*  │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  结果处理                    │
│  - ModelVerifier 验证        │
│  - calculateSummaryData()   │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  UI 展示                     │
│  - 可排序列的表格            │
│  - ECharts 雷达图           │
│  - SVG 分享卡片             │
└─────────────────────────────┘
```

### 4.2 关键业务逻辑

#### 模型测试 (`api.js`)

```javascript
testModelList(apiUrl, apiKey, modelNames, timeoutSeconds, concurrency, progressCallback)
```

- 向 `/v1/chat/completions` 发送并发请求
- o1-* 模型超时时间乘以 6
- 结果分类: 有效 / 无效 / 不一致
- 支持进度回调实时更新 UI

#### 模型验证 (`verify.js`)

`ModelVerifier` 类提供 4 种验证方式:

1. **Temperature 验证** - seed=331, temperature=0.01, 发送 4 次请求
2. **官方验证** - 检查 system_fingerprint 和响应相似度
3. **Function Calling** - 测试 add_numbers 函数
4. **自定义对话** - 使用用户提供的 prompt

#### 云存储

| 环境 | 存储方式 |
|------|----------|
| Vercel | `@vercel/kv` (Redis/KV) |
| 本地 | JSON 文件 (`/data/data.json`) |

---

## 5. API 端点

### 本地 Express 服务器

| 路由 | 方法 | 功能 |
|------|------|------|
| `/api/auth` | POST | 密码认证 |
| `/api/alive` | POST | 实验性功能 |
| `/api` | GET | 获取云存储数据 |
| `/api` | POST | 保存云存储数据 |
| `/*` | GET | 静态资源 |

### Vercel Serverless

| 路由 | 文件 | 功能 |
|------|------|------|
| `/api/auth` | `api/auth.js` | 密码认证 |
| `/api/alive` | `api/alive.js` | 实验性功能 |
| `/api` | `api/index.js` | 云存储 (Vercel KV) |

---

## 6. 配置方式

### 环境变量

| 变量 | 说明 |
|------|------|
| `PASSWORD` | 后端认证密码 |
| `PORT` | 服务器端口 (默认: 13000) |

### URL 参数预设

```
?settings={"key":"*sk*","url":"*api*","models":["gpt-4o"],"timeout":10,"concurrency":2}
```

---

## 7. 启动方式

| 环境 | 命令 |
|------|------|
| 开发 | `npm run dev` (Vite, 端口 3000) |
| 构建 | `npm run build` |
| 生产 | `node server.js` (Express, 端口 13000) |
| Docker | `docker run` |
