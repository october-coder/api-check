export function errorHandler(errorMsg) {
  if (errorMsg.includes('disabled.')) {
    errorMsg = '模型已禁用';
  } else if (errorMsg.includes('负载已饱和')) {
    errorMsg = '负载饱和';
  } else if (errorMsg.includes('is not enough')) {
    errorMsg = '余额不足';
  } else if (errorMsg.includes('无可用渠道')) {
    errorMsg = '无可用渠道';
  } else if (errorMsg.includes('令牌额度已用尽')) {
    errorMsg = '令牌额度已用尽';
  } else {
    errorMsg = '测试失败';
  }
  return errorMsg;
}

export function maskApiKey(apiKey) {
  if (!apiKey || apiKey.length < 10) {
    return apiKey;
  }
  const length = apiKey.length;
  const maskedSection = '****';
  return apiKey.slice(0, 6) + maskedSection + apiKey.slice(length - 4);
}

export function isGpt(model) {
  return /^(gpt-|chatgpt-|o1-)/i.test(model);
}

export function isClaude(model) {
  return /^claude-/i.test(model);
}

export function calculateSummaryData(results) {
  const resultsData = results;

  const totalModelsTested =
    resultsData.valid.length +
    resultsData.inconsistent.length +
    resultsData.invalid.length;
  const totalAvailableModels =
    resultsData.valid.length + resultsData.inconsistent.length;

  const availableModelsRatio = totalModelsTested
    ? (totalAvailableModels / totalModelsTested) * 100
    : 0;
  let availableModelsScore = ((availableModelsRatio - 50) / (90 - 50)) * 100;
  availableModelsScore = Math.max(0, Math.min(100, availableModelsScore));

  const availableModels = resultsData.valid.concat(resultsData.inconsistent);

  const totalAvailable = availableModels.length;
  const totalLatency = availableModels.reduce(
    (sum, r) => sum + r.responseTime,
    0
  );
  const averageLatency = totalAvailable
    ? (totalLatency / totalAvailable).toFixed(2)
    : '0';

  let avgLatency = parseFloat(averageLatency);
  avgLatency = Math.max(0.5, Math.min(3, avgLatency));
  let normalizedLatencyScore = ((3 - avgLatency) / (3 - 0.5)) * 100;
  normalizedLatencyScore = Math.max(0, Math.min(100, normalizedLatencyScore));

  const gptModels = availableModels.filter(r => isGpt(r.model));
  const claudeModels = availableModels.filter(r => isClaude(r.model));

  const gptCount = gptModels.length;
  const claudeCount = claudeModels.length;

  const gptTotalLatency = gptModels.reduce((sum, r) => sum + r.responseTime, 0);
  const gptAverageLatency = gptCount
    ? (gptTotalLatency / gptCount).toFixed(2)
    : '0';

  const claudeTotalLatency = claudeModels.reduce(
    (sum, r) => sum + r.responseTime,
    0
  );
  const claudeAverageLatency = claudeCount
    ? (claudeTotalLatency / claudeCount).toFixed(2)
    : '0';

  const maxModelCount = 5;
  let gptCountScore = (gptCount / maxModelCount) * 100;
  gptCountScore = Math.max(0, Math.min(100, gptCountScore));
  let claudeCountScore = (claudeCount / maxModelCount) * 100;
  claudeCountScore = Math.max(0, Math.min(100, claudeCountScore));

  const radarChartData = [
    availableModelsScore,
    normalizedLatencyScore,
    gptCountScore,
    claudeCountScore,
  ];
  let summaryHtml = `
    <h3>📊 模型测试数据：</h3>
    <p>
      🔍 总共测试了 <strong>${totalModelsTested}</strong> 个模型<br/>
      ✅ 可用模型总数：<strong>${totalAvailableModels}</strong><br/>
      🎯 可用且一致的模型数：<strong>${resultsData.valid.length}</strong><br/>
      ⚠️ 可用但不一致的模型数：<strong>${resultsData.inconsistent.length}</strong><br/>
      ❌ 不可用的模型数：<strong>${resultsData.invalid.length}</strong><br/>
      ⏱️ 平均用时：<strong>${averageLatency} 秒</strong>
    </p>
  `;

  let modelLatencyHtml = '';
  if (gptCount > 0) {
    modelLatencyHtml += `
      🤖 GPT 模型数：<strong>${gptCount}</strong>，平均用时：<strong>${gptAverageLatency} 秒</strong><br/>
    `;
  }
  if (claudeCount > 0) {
    modelLatencyHtml += `
      🧠 Claude 模型数：<strong>${claudeCount}</strong>，平均用时：<strong>${claudeAverageLatency} 秒</strong>
    `;
  }
  if (modelLatencyHtml !== '') {
    summaryHtml += `<h3>📈GPT & Claude统计：</h3><p>${modelLatencyHtml}</p>`;
  }
  const radarChartOption = {
    title: {
      text: '   ',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    radar: {
      indicator: [
        { name: '可用模型比例', max: 100 },
        { name: '平均延时（得分）', max: 100 },
        { name: 'GPT 模型数', max: 100 },
        { name: 'Claude 模型数', max: 100 },
      ],
      shape: 'circle',
      splitNumber: 5,
      axisName: {
        color: '#333',
      },
      splitLine: {
        lineStyle: {
          color: ['#ddd'],
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#bbb',
        },
      },
    },
    series: [
      {
        name: 'API 评估',
        type: 'radar',
        data: [
          {
            value: radarChartData,
            name: '评分',
            areaStyle: {
              color: 'rgba(0, 102, 204, 0.2)',
            },
          },
        ],
      },
    ],
  };

  return {
    summaryHtml,
    radarChartOption,
  };
}

export function extractApiInfo(text) {
  let apiUrl = '';
  let apiKey = '';

  let urlPattern = /(https?:\/\/[^\s，。、！,；;\n]+)/;
  let keyPattern = /(sk-[a-zA-Z0-9]+)/;

  let urlMatch = text.match(urlPattern);
  let keyMatch = text.match(keyPattern);

  if (urlMatch) {
    // 去除末尾的斜杠和多余字符，保留到最后一个斜杠前面
    let cleanUrlMatch = urlMatch[0].match(/(.*)\/.*/);
    if (cleanUrlMatch) {
      let cleanUrl = cleanUrlMatch[1];
      // 如果包含 '.'，则使用清理后的 URL
      if (cleanUrl.includes('.')) {
        apiUrl = cleanUrl;
      } else {
        apiUrl = urlMatch[0];
      }
    } else {
      apiUrl = urlMatch[0];
    }
  }

  if (keyMatch) {
    apiKey = keyMatch[0];
  }

  return { apiUrl, apiKey };
}
