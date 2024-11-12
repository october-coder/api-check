// /api/index.js

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // 设置 CORS 响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    // 处理预检请求
    res.status(204).end();
    return;
  }

  // 从环境变量中获取密码
  const PASSWORD = process.env.PASSWORD;

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/api/auth' && req.method === 'POST') {
    // 处理身份验证
    try {
      const data = await parseRequestBody(req);
      const { password } = data;

      if (password === PASSWORD) {
        res.status(200).json({ message: 'Authenticated' });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Invalid request', error: error.message });
    }
  } else if (pathname === '/api' || pathname === '/api/') {
    // 验证请求头中的 Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== `Bearer ${PASSWORD}`) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (req.method === 'GET') {
      try {
        // 从 KV 获取数据
        const data = await kv.get('data');
        res.status(200).json(data || []);
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error retrieving data', error: error.message });
      }
    } else if (req.method === 'POST') {
      try {
        // 解析请求体
        const data = await parseRequestBody(req);
        // 保存数据到 KV
        await kv.set('data', data);
        res.status(200).json({ message: 'Data saved successfully' });
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error saving data', error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
}

// 辅助函数：解析请求体
async function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', error => {
      reject(error);
    });
  });
}
