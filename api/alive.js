const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function (req, res) {
  console.log('Received request:', req.method, req.url);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(404, { 'Content-Type': 'text/plain', ...corsHeaders });
    res.end('Not Found');
    return;
  }

  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    console.log('Request body:', body);

    const content = JSON.parse(body);
    console.log('Parsed request content:', content);

    const { type } = content;
    let responseBody;

    switch (type) {
      case 'refreshTokens':
        responseBody = await handleRefreshTokens(content.tokens);
        break;
      case 'sessionKeys':
        responseBody = await handleSessionKeys(content);
        break;
      case 'geminiAPI':
        responseBody = await handleGeminiAPI(content);
        break;
      default:
        res.writeHead(400, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        });
        res.end(JSON.stringify({ error: 'Invalid request type' }));
        return;
    }

    res.writeHead(200, {
      'Content-Type': 'application/json',
      ...corsHeaders,
    });
    res.end(JSON.stringify(responseBody));
  } catch (error) {
    console.error('Error processing request:', error);
    res.writeHead(500, {
      'Content-Type': 'application/json',
      ...corsHeaders,
    });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function handleRefreshTokens(tokens) {
  try {
    const results = await Promise.all(tokens.map(checkTokenValidity));
    return results;
  } catch (error) {
    throw new Error('Error processing refresh tokens: ' + error.message);
  }
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
        refreshToken,
        accessToken: data.access_token,
        valid: true,
      };
    } else {
      return {
        refreshToken,
        accessToken: null,
        valid: false,
      };
    }
  } catch (error) {
    return {
      refreshToken,
      accessToken: null,
      valid: false,
    };
  }
}

async function handleSessionKeys(content) {
  const sessionKeys = content.tokens;
  const maxAttempts = content.maxAttempts;
  const requestsPerSecond = content.requestsPerSecond;
  const delayBetweenRequests = 1000 / requestsPerSecond;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function checkSessionKey(sessionKey) {
    let attempts = 0;
    let successCount = 0;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        const response = await fetch(
          'https://api.claude.ai/api/organizations',
          {
            headers: {
              accept: 'application/json',
              cookie: 'sessionKey=' + sessionKey,
              'user-agent': 'Mozilla/5.0 (X11; Linux x86_64)',
            },
          }
        );

        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }

        const responseText = await response.text();

        if (
          responseText.toLowerCase().includes('unauthorized') ||
          responseText.trim() === ''
        ) {
          throw new Error('Invalid response');
        }

        const organizations = JSON.parse(responseText);
        successCount++;

        const name = organizations[0].name || 'Unknown';
        const capabilities = organizations[0].capabilities
          ? organizations[0].capabilities.join(';')
          : '';
        return {
          sessionKey,
          name,
          capabilities,
          available: true,
          attempts,
          successRate: successCount / attempts,
        };
      } catch (error) {
        if (attempts >= maxAttempts) {
          return {
            sessionKey,
            name: 'Invalid',
            capabilities: '',
            available: false,
            attempts,
            successRate: successCount / attempts,
          };
        }
        await delay(delayBetweenRequests);
      }
    }
  }

  try {
    const results = await Promise.all(sessionKeys.map(checkSessionKey));
    return results;
  } catch (error) {
    throw new Error('Error processing session keys: ' + error.message);
  }
}

async function handleGeminiAPI(content) {
  const apiKeys = content.tokens;
  const model = content.model;
  const rateLimit = content.rateLimit;
  const prompt = content.prompt;
  const user = content.user;

  if (!apiKeys || !Array.isArray(apiKeys) || apiKeys.length === 0) {
    throw new Error('Invalid or empty API keys');
  }

  try {
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
  } catch (error) {
    throw new Error('Error testing APIs: ' + error.message);
  }
}

async function batchTestAPI(apiKeys, model, rateLimit, prompt, user) {
  const results = [];
  const delayBetweenRequests = 1000 / rateLimit;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    try {
      const result = await testAPI(apiKey, model, prompt, user);
      results.push(result);
    } catch (error) {
      results.push({
        key: apiKey,
        valid: false,
        error: error.message,
      });
    }
    await delay(delayBetweenRequests);
  }

  return results;
}

async function testAPI(apiKey, model, prompt, user) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
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
    return { key: apiKey, valid: true, data };
  } catch (error) {
    return {
      key: apiKey,
      valid: false,
      error: error.message,
    };
  }
}
