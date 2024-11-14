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

  if (req.method === 'POST') {
    try {
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }
      console.log('Request body:', body);

      const content = JSON.parse(body);
      console.log('Parsed request content:', content);
      const type = content.type;

      if (type === 'refreshTokens') {
        const responseBody = await handleRefreshTokens(content.tokens);
        res.writeHead(200, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        });
        res.end(JSON.stringify(responseBody));
      } else if (type === 'sessionKeys') {
        const responseBody = await handleSessionKeys(content);
        res.writeHead(200, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        });
        res.end(JSON.stringify(responseBody));
      } else if (type === 'geminiAPI') {
        const responseBody = await handleTestAPIs(content);
        res.writeHead(200, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        });
        res.end(JSON.stringify(responseBody));
      } else {
        res.writeHead(400, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        });
        res.end(JSON.stringify({ error: 'Invalid request type' }));
        return;
      }
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(500, {
        'Content-Type': 'application/json',
        ...corsHeaders,
      });
      res.end(JSON.stringify({ error: error.message }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain', ...corsHeaders });
    res.end('Not Found');
  }
}

async function handleRefreshTokens(refreshTokens) {
  try {
    const results = await Promise.all(refreshTokens.map(checkTokenValidity));
    return results;
  } catch (error) {
    throw new Error('Error processing refresh tokens: ' + error.message);
  }
}

function checkTokenValidity(refreshToken) {
  return fetch('https://token.oaifree.com/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'refresh_token=' + encodeURIComponent(refreshToken),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          return {
            refreshToken: refreshToken,
            accessToken: data.access_token,
            valid: true,
          };
        });
      }
      return { refreshToken: refreshToken, accessToken: null, valid: false };
    })
    .catch(function () {
      return { refreshToken: refreshToken, accessToken: null, valid: false };
    });
}

async function handleSessionKeys(content) {
  const sessionKeys = content.tokens;
  const maxAttempts = content.maxAttempts;
  const requestsPerSecond = content.requestsPerSecond;
  const delayBetweenRequests = 1000 / requestsPerSecond;

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  async function checkSessionKey(sessionKey) {
    let attempts = 0;
    let successCount = 0;

    async function attemptCheck() {
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
        const objects = JSON.parse(responseText);
        successCount++;
        const name = objects[0].name || 'Unknown';
        const capabilities = objects[0].capabilities
          ? objects[0].capabilities.join(';')
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
        if (attempts < maxAttempts) {
          await delay(delayBetweenRequests);
          return attemptCheck();
        }
        return {
          sessionKey: sessionKey,
          name: 'Invalid',
          capabilities: '',
          available: false,
          attempts: attempts,
          successRate: successCount / attempts,
        };
      }
    }

    return attemptCheck();
  }

  try {
    const results = await Promise.all(sessionKeys.map(checkSessionKey));
    return results;
  } catch (error) {
    throw new Error('Error processing session keys: ' + error.message);
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

  try {
    const results = await batchTestAPI(apiKeys, model, rateLimit, prompt, user);
    const validKeys = results
      .filter(function (r) {
        return r.valid;
      })
      .map(function (r) {
        return r.key;
      });
    const invalidKeys = results
      .filter(function (r) {
        return !r.valid;
      })
      .map(function (r) {
        return r.key;
      });
    const errors = results
      .filter(function (r) {
        return r.error;
      })
      .map(function (r) {
        return { key: r.key, error: r.error };
      });
    const validResults = results.filter(function (r) {
      return r.valid && r.data;
    });

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

function batchTestAPI(apiKeys, model, rateLimit, prompt, user) {
  const results = [];
  const delayBetweenRequests = 1000 / rateLimit;

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function testNextKey(index) {
    if (index >= apiKeys.length) {
      return Promise.resolve(results);
    }

    return testAPI(apiKeys[index], model, prompt, user)
      .then(function (result) {
        results.push(result);
      })
      .catch(function (error) {
        results.push({
          key: apiKeys[index],
          valid: false,
          error: error.message,
        });
      })
      .then(function () {
        return delay(delayBetweenRequests);
      })
      .then(function () {
        return testNextKey(index + 1);
      });
  }

  return testNextKey(0);
}

function testAPI(apiKey, model, prompt, user) {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    model +
    ':generateContent?key=' +
    apiKey;
  return fetch(url, {
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
  })
    .then(function (response) {
      if (!response.ok) {
        return response.text().then(function (errorText) {
          throw new Error(
            'API request failed: ' +
              response.status +
              ' ' +
              response.statusText +
              ' - ' +
              errorText
          );
        });
      }
      return response.json();
    })
    .then(function (data) {
      return { key: apiKey, valid: true, data: data };
    });
}
