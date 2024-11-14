import express from 'express';
const router = express.Router();

// 中间件：解析 JSON 请求体
router.use(express.json());

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// 处理 OPTIONS 请求
router.options('/', (req, res) => {
  res.set(corsHeaders);
  res.sendStatus(204);
});

// 处理 POST 请求
router.post('/', async (req, res) => {
  console.log('Received request:', req.method, req.url);

  try {
    const content = req.body;
    console.log('Parsed request content:', content);
    const type = content.type;

    let responsePromise;
    if (type === 'refreshTokens') {
      responsePromise = handleRefreshTokens(content.tokens);
    } else if (type === 'sessionKeys') {
      responsePromise = handleSessionKeys(content);
    } else if (type === 'geminiAPI') {
      responsePromise = handleTestAPIs(content);
    } else {
      res.status(400).json({ error: 'Invalid request type' });
      return;
    }

    const responseData = await responsePromise;
    res.set(corsHeaders);
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error processing request:', error);
    res.set(corsHeaders);
    res.status(500).json({ error: error.message });
  }
});

// 导出路由
export default router;

// 辅助函数
async function handleRefreshTokens(refreshTokens) {
  const results = await Promise.all(refreshTokens.map(checkTokenValidity));
  return results;
}

async function checkTokenValidity(refreshToken) {
  try {
    const response = await fetch('https://token.oaifree.com/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'refresh_token=' + encodeURIComponent(refreshToken),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        refreshToken: refreshToken,
        accessToken: data.access_token,
        valid: true,
      };
    }
    return { refreshToken: refreshToken, accessToken: null, valid: false };
  } catch (error) {
    return { refreshToken: refreshToken, accessToken: null, valid: false };
  }
}

async function handleSessionKeys(content) {
  const sessionKeys = content.tokens;
  const maxAttempts = content.maxAttempts;
  const requestsPerSecond = content.requestsPerSecond;
  const delayBetweenRequests = 1000 / requestsPerSecond;

  const results = await Promise.all(
    sessionKeys.map(sessionKey =>
      checkSessionKey(sessionKey, maxAttempts, delayBetweenRequests)
    )
  );
  return results;
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function checkSessionKey(sessionKey, maxAttempts, delayBetweenRequests) {
  let attempts = 0;
  let successCount = 0;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await fetch('https://api.claude.ai/api/organizations', {
        headers: {
          accept: 'application/json',
          cookie: 'sessionKey=' + sessionKey,
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64)',
        },
      });

      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }

      const data = await response.json();
      successCount++;
      const name = data[0].name || 'Unknown';
      const capabilities = data[0].capabilities
        ? data[0].capabilities.join(';')
        : '';
      return {
        sessionKey: sessionKey,
        name: name,
        capabilities: capabilities,
        available: true,
        attempts: attempts,
        successRate: successCount / attempts,
      };
    } catch (error) {
      if (attempts >= maxAttempts) {
        return {
          sessionKey: sessionKey,
          name: 'Invalid',
          capabilities: '',
          available: false,
          attempts: attempts,
          successRate: successCount / attempts,
        };
      }
      await delay(delayBetweenRequests);
    }
  }
}

async function handleTestAPIs(content) {
  const apiKeys = content.tokens;
  const model = content.model;
  const rateLimit = content.rateLimit;
  const prompt = content.prompt;
  const user = content.user;

  if (!apiKeys || !Array.isArray(apiKeys) || apiKeys.length === 0) {
    throw new Error('Invalid or empty API keys');
  }

  const results = await batchTestAPI(apiKeys, model, rateLimit, prompt, user);
  const validKeys = results.filter(r => r.valid).map(r => r.key);
  const invalidKeys = results.filter(r => !r.valid).map(r => r.key);
  const errors = results
    .filter(r => r.error)
    .map(r => ({ key: r.key, error: r.error }));
  const validResults = results.filter(r => r.valid && r.data);

  return {
    valid: validKeys.length,
    invalid: invalidKeys.length,
    invalidKeys: invalidKeys,
    errors: errors,
    validResults: validResults,
  };
}

async function batchTestAPI(apiKeys, model, rateLimit, prompt, user) {
  const results = [];
  const delayBetweenRequests = 1000 / rateLimit;

  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    try {
      const result = await testAPI(apiKey, model, prompt, user);
      results.push(result);
    } catch (error) {
      results.push({ key: apiKey, valid: false, error: error.message });
    }
    await delay(delayBetweenRequests);
  }

  return results;
}

async function testAPI(apiKey, model, prompt, user) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }, { text: user }],
        },
      ],
      safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE',
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return { key: apiKey, valid: true, data: data };
}
