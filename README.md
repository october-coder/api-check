<div align="center">
<img src="./docs/images/logo.png" alt="logo.png" style="zoom:30%;" />

# API CHECK

</div>

**English** · [简体中文](./README_CN.md)

> [!TIP]
> Click to try: https://check.crond.dev

## Pure Front-End API Testing Tool

- ✅ **Supports Liveness Testing for Various OpenAI API Proxies**

  - Compatible with OpenAI proxy APIs like oneapi and newapi, fully testing availability.

- 🔒 **Pure Front-End Version for Enhanced Data Security**

  - All operations are performed on the front end, eliminating concerns about network timeouts and ensuring data security.

- 📊 **Detailed Testing Data**

  - Displays response time, model consistency, and more, making test results clear at a glance.

- 💾 **Cloud Storage and Local Storage**

  - **Cloud Storage**: Save configurations to the cloud for multi-device sharing.
  - **Local Storage**: Save frequently used configurations locally for quick loading and convenience.

- 🌙 **Theme and Language Switching**

  - **Dark/Light Mode**: Choose a theme that suits you to protect your eyesight.
  - **Multi-Language Support**: Supports Chinese and English to meet different language needs.

- 🖥️ **Multiple Deployment Methods**
  - **Vercel Deployment**: Supports one-click deployment to Vercel for convenience.
  - **Docker Deployment**
  - **Cloudflare Deployment**

## 📦 Getting Started

### Vercel Deployment

1. Click the button on the right to start deployment:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/october-coder/api-check&env=PASSWORD&project-name=api-check&repository-name=api-check). Simply log in using your GitHub account, and remember to fill in the backend password on the environment variables page.
2. After deployment, you can start using it.
3. (Optional) To deploy the backend service, please refer to the [Detailed Tutorial](./docs/vercel.md).
4. (Optional) [Bind a Custom Domain Name](https://vercel.com/docs/concepts/projects/domains/add-a-domain): The domain name assigned by Vercel may be polluted in some regions. Binding a custom domain name allows direct access.

### Docker Deployment

1. One-click deployment command

2. ```bash
   docker run -d -p 13000:13000 \
     -e PASSWORD=you_password \
     -v you_path:/app/data \
     --name api-check ghcr.io/rickcert/api-check:latest
   ```

### Cloudflare Backend Deployment

1. Refer to the [Detailed Tutorial](./docs/cloudflare.md).
2. It's best to bind a custom domain name.

## 📜 Recent Updates

<img src="./docs/images/testing.png" alt="Testing" style="zoom:50%;" />

### v2.1.0

🔔 **New Features and Optimizations**

- ✨ **Added Quick Chat Testing**
  - Integrated with the modified NextChat for quick model testing.
  - Added `closeChat` setting for convenient proxy usage.
- 🧪 **Added Experimental Features Module** from [elfmaid](https://linux.do/u/elfmaid)
  - Batch testing of GPT Refresh Tokens
  - Batch testing of Claude Session Keys
  - Batch testing of Gemini API Keys
- ✂️ **Added Paste Button** by [fangyuan](https://linux.do/u/fangyuan99)
- 📝 **Added Custom Conversation Verification**
  - Quick prompt testing by [fangyuan](https://linux.do/u/fangyuan99)

🔧 **Optimizations and Fixes**

- 🐳 **Optimized Dockerfile** to reduce image size.
- 🎨 **Fixed Layout Issues** to improve interface display.

### v2.0.0

🔔 **Brand New Features and Optimizations**

- 🌐 **Added Cloud Storage and Local Storage**
  - **Cloud Storage**: Supports saving API configuration information to the cloud server for multi-device synchronization, allowing you to access your configurations anytime, anywhere.
  - **Local Storage**: Provides a local caching function for quick local saves, avoiding repeated inputs and improving efficiency.
  - **Data Management**: Added a settings panel for easy management of local and cloud configuration data.
- ✨ **Supports Preset Parameters**
  - **Convenient One-Click Configuration**
  - **Quickly Bind to new-api**
- 💻 **Supports One-Click Deployment with Vercel and Docker**
- 🌙 **Added Dark Mode**
  - **Theme Switching**: Supports switching between dark and light modes to suit different environments and user preferences.
  - **Automatic Adaptation**: Can automatically switch themes based on system settings to protect your eyesight.
- 🌐 **Internationalization Support**
  - **Multi-Language**: Added internationalization support, currently supporting Chinese and English.
- 📱 **Mobile Adaptation Optimization**
- 🛠 **Other Optimizations and Fixes**

### 🧪 Version History

<details>

### v1.5.0

- 📱 Adapted for Mobile Mode
- 🌙 Added Dark Theme
- 🧠 Optimized o1 Model Testing

### v1.4.0

- 🔍 Added Temperature Verification
- 📊 Added Function Verification
- 🔧 Optimized Test Prompts

### v1.3.0

- 🔍 Added Official API Verification
- 🖥️ Supports Filtering Queries

### v1.2.0

- 🖥️ Added Local One-Click Run
- 🌐 Supports Pages Online Hosting
- 📊 Improved Test Result Display

### v1.0.0

- ✨ Supports Multi-Model Testing
- 💰 Added Quota Check
- 📋 Implemented Model List Retrieval

</details>

## 📋 Feature Introduction

- 🧪 Test the availability and consistency of multiple models
- 💰 Check API account usage quota
- 📋 Retrieve and display the list of available models
- 📝 Intelligent extraction of API information
- 🖱️ Convenient copy function
- 💾 Cloud storage and local caching
- 🌙 Theme and language switching
- 🛠 Advanced Verification Features

  - **Official Proxy Verification**: Verify the authenticity of the API and view system fingerprints.
  - **Temperature Verification**: Verify the randomness and stability of the model.
  - **Function Call Verification**: Test the model's function-calling capabilities.

### 🛠 Cloud Storage

- **Docker Deployment** backend URL: Please use `https://your_website/api`
- **Vercel Deployment** backend URL: Please use `https://your_website/api`
- **Cloudflare Deployment** backend URL: Please use `https://your_website`

### 🛠 Preset Parameter Settings

<img src="./docs/images/config.png" alt="Test Report" style="zoom:50%;" />

🔗 url

- **Description**: API endpoint address.
- **Example**: `"url": "https://api.example.com"`

📦 models

- **Description**: An array of model names indicating which models are available.
- **Example**: `"models": ["model1", "model2"]`

⏱ timeout

- **Description**: Request timeout in seconds.
- **Example**: `"timeout": 30`

🔁 concurrency

- **Description**: Number of concurrent requests.
- **Example**: `"concurrency": 5`

🚫 closeAnnouncement **Convenient for Proxy Sites**

- **Description**: Whether to disable the announcement display. Set to `true` to disable, or `false`/undefined to display announcements. **Convenient for proxy sites**
- **Example**: `"closeAnnouncement": true`

🚪 closeChat **Convenient for Proxy Sites**

- **Description**: Whether to disable the quick chat function. Set to `true` to disable, or `false`/undefined to enable the chat function.
- **Example**: `"closeChat": true`

```url
https://check.crond.dev/?settings={"key":"*sk*","url":"*api*","models":["gpt-4o-mini","gpt-4o"],"timeout":10,"concurrency":2,"closeAnnouncement":true,"closeChat":true}
```

Decoded JSON string:

```json
{
  "key": "your_api_key",
  "url": "https://api.example.com",
  "models": ["gpt-4o-mini", "gpt-4o"],
  "timeout": 10,
  "concurrency": 2,
  "closeAnnouncement": true,
  "closeChat": true
}
```

- **voapi** Example

```json
{
  "name": "check",
  "link": "https://check.crond.dev/?settings={%22key%22:%22*sk*%22,%22url%22:%22*api*%22,%22models%22:[%22gpt-4o-mini%22],%22timeout%22:10,%22concurrency%22:2,%22closeAnnouncement%22:true,%22closeChat%22:true}",
  "icon": "https://check.crond.dev/logo.png"
}
```

- **newapi** Example

```json
{
  "CHECK": "https://check.crond.dev/?settings={\"key\":\"{key}\",\"url\":\"{address}\",\"models\":[\"gpt-4o-mini\"],\"timeout\":10,\"concurrency\":2,\"closeAnnouncement\":true,\"closeChat\":true}"
}
```

### 🛠 **Advanced Verification Features**

#### 🕵️ Official API Verification

1. 🔄 Send multiple identical requests.
2. 📊 Analyze the consistency of the responses.
3. 🔍 Check system fingerprints.
4. 🧮 Calculate similarity scores.

#### 🕵️‍♀️ Temperature Verification

1. 🧊 Set the temperature parameter to a low value (0.01).
2. 🔄 Send multiple identical requests (e.g., calculating the next number in a specific sequence).
3. 🎯 Check the hit rate based on the official API's reference values.

### 🛠 Generate Reports

<img src="./docs/images/report.png" alt="Test Report" style="zoom:50%;" />

## 🤝 Contributing

We welcome suggestions and improvements! Feel free to submit pull requests or open issues. Let's make this tool even better together! 🌈

## 📜 License

This project is licensed under the [Apache License 2.0](https://opensource.org/license/apache-2-0).

## 🙏 Acknowledgments

Special thanks to the following contributors whose efforts have made this project better:

- [Rick](https://linux.do/u/rick)
- [Megasoft](https://linux.do/u/zhong_little)
- [fangyuan99](https://linux.do/u/fangyuan99)
- [juzeon](https://github.com/juzeon)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=october-coder/api-check&type=Date)](https://star-history.com/#october-coder/api-check&Date)

[![image](iframe组件截图图片链接)](https://yxvm.com/)
[NodeSupport](https://github.com/NodeSeekDev/NodeSupport)赞助了本项目
