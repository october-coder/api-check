export async function fetchModelList(apiUrl, apiKey) {
  const apiUrlValue = apiUrl.replace(/\/+$/, '');
  const response = await fetch(`${apiUrlValue}/v1/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function fetchQuotaInfo(apiUrl, apiKey) {
  const trimmedApiUrl = apiUrl.replace(/\/+$/, '');
  const authHeader = { Authorization: `Bearer ${apiKey}` };

  // Fetch subscription data
  const quotaResponse = await fetch(
    `${trimmedApiUrl}/dashboard/billing/subscription`,
    {
      headers: authHeader,
    }
  );
  const quotaData = await quotaResponse.json();
  const quotaInfo = quotaData.hard_limit_usd ? quotaData.hard_limit_usd : null;

  // Fetch usage data
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const startDate = `${year}-${month}-01`;
  const endDate = `${year}-${month}-${day}`;

  const usageResponse = await fetch(
    `${trimmedApiUrl}/dashboard/billing/usage?start_date=${startDate}&end_date=${endDate}`,
    {
      headers: authHeader,
    }
  );
  const usageData = await usageResponse.json();
  const usedInfo = usageData.total_usage / 100;

  return {
    quotaInfo,
    usedInfo,
  };
}

export async function testModelList(
  apiUrl,
  apiKey,
  modelNames,
  timeoutSeconds,
  concurrency,
  progressCallback
) {
  const valid = [];
  const invalid = [];
  const inconsistent = [];
  const awaitOfficialVerification = [];

  async function testModel(model) {
    const apiUrlValue = apiUrl.replace(/\/+$/, '');
    let timeout = timeoutSeconds * 1000; // 转换为毫秒

    // 对于 'o1-' 开头的模型，增加超时时间
    if (model.startsWith('o1-')) {
      timeout *= 6;
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const startTime = Date.now();

    let response_text;
    try {
      const requestBody = {
        model: model,
        messages: [{ role: 'user', content: '写一个10个字的冷笑话' }],
      };
      if (/^(gpt-|chatgpt-)/.test(model)) {
        requestBody.seed = 331;
      }
      const response = await fetch(`${apiUrlValue}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000; // 转换为秒

      let has_o1_reason = false;
      if (response.ok) {
        const data = await response.json();
        const returnedModel = data.model || 'no returned model';

        // 检查 'o1-' 模型的特殊字段
        if (
          returnedModel.startsWith('o1-') &&
          data?.usage?.completion_tokens_details?.reasoning_tokens > 0
        ) {
          has_o1_reason = true;
        }

        if (returnedModel === model) {
          const resultData = { model, responseTime, has_o1_reason };
          valid.push(resultData);
          progressCallback({
            type: 'valid',
            data: resultData,
          });
        } else {
          const resultData = {
            model,
            returnedModel,
            responseTime,
            has_o1_reason,
          };
          inconsistent.push(resultData);
          progressCallback({
            type: 'inconsistent',
            data: resultData,
          });
        }
      } else {
        try {
          const jsonResponse = await response.json();
          response_text = jsonResponse.error.message;
        } catch (jsonError) {
          try {
            response_text = await response.text();
          } catch (textError) {
            response_text = '无法解析响应内容';
          }
        }
        const resultData = { model, response_text };
        invalid.push(resultData);
        progressCallback({
          type: 'invalid',
          data: resultData,
        });
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        const resultData = { model, error: '超时' };
        invalid.push(resultData);
        progressCallback({
          type: 'invalid',
          data: resultData,
        });
      } else {
        const resultData = { model, error: error.message };
        invalid.push(resultData);
        progressCallback({
          type: 'invalid',
          data: resultData,
        });
      }
    } finally {
      clearTimeout(id);
    }
  }

  async function runBatch(models) {
    const promises = models.map(model =>
      testModel(model).catch(error => {
        console.error(`测试模型 ${model} 时发生错误：${error.message}`);
      })
    );
    await Promise.all(promises);
  }

  for (let i = 0; i < modelNames.length; i += concurrency) {
    const batch = modelNames.slice(i, i + concurrency);
    await runBatch(batch);
  }

  return { valid, invalid, inconsistent, awaitOfficialVerification };
}

// GPT Refresh Tokens
export function checkRefreshTokens(apiAddress, tokens) {
  return fetch(apiAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'refreshTokens',
      tokens: tokens,
    }),
  }).then(response => response.json());
}

// Claude Session Keys
export function checkSessionKeys(
  apiAddress,
  tokens,
  maxAttempts,
  requestsPerSecond
) {
  return fetch(apiAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'sessionKeys',
      tokens: tokens,
      maxAttempts: maxAttempts,
      requestsPerSecond: requestsPerSecond,
    }),
  }).then(response => response.json());
}

// Gemini Keys
export function checkGeminiKeys(
  apiAddress,
  tokens,
  model,
  rateLimit,
  prompt,
  user
) {
  return fetch(apiAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'geminiAPI',
      tokens: tokens,
      model: model,
      rateLimit: rateLimit,
      prompt: prompt,
      user: user,
    }),
  }).then(response => response.json());
}
