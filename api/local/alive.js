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
    const requestData = req.body;
    console.log('Parsed request content:', requestData);
    const { type } = requestData;

    let responseData;
    switch (type) {
      case 'refreshTokens':
        responseData = await handleRefreshTokens(requestData.tokens);
        break;
      case 'sessionKeys':
        responseData = await handleSessionKeys(requestData);
        break;
      case 'geminiAPI':
        responseData = await handleGeminiAPI(requestData);
        break;
      default:
        res.status(400).json({ error: 'Invalid request type' });
        return;
    }

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
async function handleRefreshTokens(tokens) {
  const results = await Promise.all(tokens.map(refreshTokenValidity));
  return results;
}

async function refreshTokenValidity(token) {
  try {
    const response = await fetch('https://token.oaifree.com/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'refresh_token=' + encodeURIComponent(token),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        refreshToken: token,
        accessToken: data.access_token,
        valid: true,
      };
    }
    return { refreshToken: token, accessToken: null, valid: false };
  } catch (error) {
    return { refreshToken: token, accessToken: null, valid: false };
  }
}

async function handleSessionKeys({
  tokens: sessionKeys,
  maxAttempts,
  requestsPerSecond,
}) {
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

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await fetch('https://api.claude.ai/api/organizations', {
        headers: {
          Accept: 'application/json',
          Cookie: 'sessionKey=' + sessionKey,
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
        },
      });

      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }

      const organizations = await response.json();

      if (!Array.isArray(organizations) || organizations.length === 0) {
        throw new Error('Invalid response data');
      }

      const organization = organizations[0];
      const name = organization.name || 'Unknown';
      const capabilities = organization.capabilities
        ? organization.capabilities.join(';')
        : '';

      return {
        sessionKey,
        name,
        capabilities,
        available: true,
        attempts,
        successRate: 1 / attempts,
      };
    } catch (error) {
      if (attempts >= maxAttempts) {
        return {
          sessionKey,
          name: 'Invalid',
          capabilities: '',
          available: false,
          attempts,
          successRate: 0,
        };
      }
      await delay(delayBetweenRequests);
    }
  }
}

async function handleGeminiAPI({
  tokens: apiKeys,
  model,
  rateLimit,
  prompt,
  user,
}) {
  if (!apiKeys || !Array.isArray(apiKeys) || apiKeys.length === 0) {
    throw new Error('Invalid or empty API keys');
  }

  const results = await batchTestAPI(apiKeys, model, rateLimit, prompt, user);

  const validResults = results.filter(result => result.valid && result.data);
  const validKeys = validResults.map(result => result.key);
  const invalidResults = results.filter(result => !result.valid);
  const invalidKeys = invalidResults.map(result => result.key);
  const errors = invalidResults.map(result => ({
    key: result.key,
    error: result.error,
  }));

  return {
    valid: validKeys.length,
    invalid: invalidKeys.length,
    invalidKeys,
    errors,
    validResults,
  };
}

async function batchTestAPI(apiKeys, model, rateLimit, prompt, user) {
  const testResults = [];
  const delayBetweenRequests = 1000 / rateLimit;

  for (const apiKey of apiKeys) {
    try {
      const result = await testAPI(apiKey, model, prompt, user);
      testResults.push(result);
    } catch (error) {
      testResults.push({ key: apiKey, valid: false, error: error.message });
    }
    await delay(delayBetweenRequests);
  }

  return testResults;
}

async function testAPI(apiKey, model, prompt, user) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const requestBody = {
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
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return { key: apiKey, valid: true, data };
}
