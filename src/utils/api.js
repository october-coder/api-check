export async function fetchModelList(apiUrl, apiKey) {
    const apiUrlValue = apiUrl.replace(/\/+$/, '');
    const response = await fetch(`${apiUrlValue}/v1/models`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

export async function fetchQuotaInfo(apiUrl, apiKey) {
    const trimmedApiUrl = apiUrl.replace(/\/+$/, '');
    const authHeader = { 'Authorization': `Bearer ${apiKey}` };

    // Fetch subscription data
    const quotaResponse = await fetch(`${trimmedApiUrl}/dashboard/billing/subscription`, {
        headers: authHeader
    });
    const quotaData = await quotaResponse.json();
    const quotaInfo = quotaData.hard_limit_usd ? quotaData.hard_limit_usd : null;

    // Fetch usage data
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-${day}`;

    const usageResponse = await fetch(`${trimmedApiUrl}/dashboard/billing/usage?start_date=${startDate}&end_date=${endDate}`, {
        headers: authHeader
    });
    const usageData = await usageResponse.json();
    const usedInfo = usageData.total_usage / 100;

    return {
        quotaInfo,
        usedInfo
    };
}

export async function testModelList(apiUrl, apiKey, modelNames, timeoutSeconds, concurrency) {
    const valid = [];
    const invalid = [];
    const inconsistent = [];
    const awaitOfficialVerification = [];

    async function testModel(model) {
        const apiUrlValue = apiUrl.replace(/\/+$/, '');
        const timeout = timeoutSeconds * 1000; // 转换为毫秒
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const startTime = Date.now();

        let response_text;
        try {
            const requestBody = {
                model: model,
                messages: [{ role: "user", content: "写一个10个字的冷笑话" }]
            };
            if (/^(gpt-|chatgpt-|o1-)/.test(model)) {
                requestBody.seed = 331;
            }
            const response = await fetch(`${apiUrlValue}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            const endTime = Date.now();
            const responseTime = (endTime - startTime) / 1000; // 转换为秒

            if (response.ok) {
                const data = await response.json();
                const returnedModel = data.model || "no returned model"; // 确保 returnedModel 有效
                if (returnedModel === model) {
                    valid.push({ model, responseTime });
                    if (/^(gpt-|chatgpt-|o1-)/.test(model)) {
                        if (data.system_fingerprint) {
                            awaitOfficialVerification.push({
                                model,
                                system_fingerprint: data.system_fingerprint
                            });
                        }
                    }
                    console.log(`测试模型：${model} 一致，用时：${responseTime.toFixed(2)} 秒`);
                } else {
                    inconsistent.push({ model, returnedModel, responseTime });
                    console.log(`测试模型：${model} 不一致，期望：${model}，实际：${returnedModel}，用时：${responseTime.toFixed(2)} 秒`);
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
                invalid.push({ model, response_text });
                console.log(`测试模型：${model} 不可用，响应：${response.status} ${response.statusText} ${response_text}`);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                invalid.push({ model, error: '超时' });
                console.log(`测试模型：${model} 不可用（超时）`);
            } else {
                invalid.push({ model, error: error.message });
                console.log(`测试模型：${model} 不可用，错误：${error.message}`);
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
