// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config(); // 加载 .env 文件中的环境变量

const app = express();

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 中间件：解析 JSON 请求体
app.use(express.json());

// 引入路由
import authRouter from './api/local/auth.js';
import apiRouter from './api/local/index.js';

// 设置后端接口路由，位于 `/api` 路径下
app.use('/api/auth', authRouter);
app.use('/api', apiRouter);

// 设置静态文件目录，位于根路径 `/`
app.use(express.static(path.join(__dirname, 'dist')));

// 处理 SPA 前端路由
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error('全局错误处理捕获到错误：', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 启动服务器
const PORT = process.env.PORT || 13000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
