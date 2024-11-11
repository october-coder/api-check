// api/local/index.js

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 数据目录（在 Dockerfile 中指定的挂载点）
const dataDir = path.join(__dirname, '../../data');

// 确保数据目录存在
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 数据文件的路径，修改为 data.json
const dataFilePath = path.join(dataDir, 'data.json');

// 中间件：认证
router.use((req, res, next) => {
    const PASSWORD = process.env.PASSWORD ? process.env.PASSWORD.trim() : '';
    const authHeader = req.headers['authorization'];

    console.log('Authorization Header:', authHeader);

    if (!authHeader || authHeader !== `Bearer ${PASSWORD}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
});

// GET 方法：获取数据
router.get('/', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            // 如果文件不存在，则创建 xx.json 并写入空的 JSON
            if (err.code === 'ENOENT') {
                const emptyData = {};
                fs.writeFile(dataFilePath, JSON.stringify(emptyData), 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error('创建 xx.json 文件时发生错误：', writeErr);
                        return res.status(500).json({ message: 'Server error' });
                    }
                    return res.json(emptyData);
                });
            } else {
                console.error('读取文件时发生错误：', err);
                return res.status(500).json({ message: 'Server error' });
            }
        } else {
            // 处理空文件或无效的 JSON 数据
            let jsonData;
            if (!data) {
                // 文件为空，返回空对象
                jsonData = {};
            } else {
                try {
                    jsonData = JSON.parse(data);
                } catch (parseErr) {
                    console.error('解析 JSON 数据时发生错误：', parseErr);
                    jsonData = {};
                }
            }

            res.json(jsonData);
        }
    });
});

// POST 方法：保存数据
router.post('/', (req, res) => {
    const data = req.body;

    // 验证数据是否为对象或数组
    if (typeof data !== 'object' || data === null) {
        return res.status(400).json({ message: 'Bad Request: Data should be a valid JSON object or array' });
    }

    fs.writeFile(dataFilePath, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            console.error('保存数据时发生错误：', err);
            return res.status(500).json({ message: 'Failed to save data' });
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

export default router;
