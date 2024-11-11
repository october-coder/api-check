// /api/auth.js

export default async function handler(req, res) {
    // 设置 CORS 响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        // 处理预检请求
        res.status(204).end();
        return;
    }

    // 从环境变量中获取密码
    const PASSWORD = process.env.PASSWORD;

    if (req.method === 'POST') {
        try {
            // 解析 JSON 请求体
            const data = await parseRequestBody(req);
            const { password } = data;

            if (password === PASSWORD) {
                res.status(200).json({ message: 'Authenticated' });
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Invalid request', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
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
