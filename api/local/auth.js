// api/local/auth.js

import express from 'express';

const router = express.Router();

// 处理 POST 请求到 `/api/auth`
router.post('/', (req, res) => {
    const PASSWORD = process.env.PASSWORD ? process.env.PASSWORD.trim() : '';
    const { password } = req.body;
    console.log('Request body:', req.body);
    console.log('Received password:', password);
    console.log('Expected password:', PASSWORD);

    if (password && password.trim() === PASSWORD) {
        res.status(200).json({ message: 'Authenticated' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

export default router;
