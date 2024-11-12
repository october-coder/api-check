class ModelVerifier {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl.replace(/\/+$/, ''); // 去除末尾的斜杠
        this.apiKey = apiKey;
    }

    /**
     * 温度验证
     * @param {string} model - 模型名称
     * @returns {Object} - 包含响应结果和结论的对象
     */
    async verifyTemperature(model) {
        try {
            const results = await Promise.all(
                [1, 2, 3, 4].map(() => this.sendTemperatureVerificationRequest(model))
            );
            const responses = results.map((result) =>
                result.choices
                    ? result?.choices?.[0]?.message?.content?.trim()
                    : "该次调用响应异常"
            );

            const referenceMap = {
                "gpt-4o-mini": 32,
                "gpt-4o": 59,
                "claude-3-5": 51,
                "claude-3.5": 51
            };
            const matchedKey = Object.keys(referenceMap).find(key => model.startsWith(key));
            let referenceValue = matchedKey ? referenceMap[matchedKey] : null;

            let hitReferenceCount = 0;
            for (let i = 0; i < 4; i++) {
                if (responses[i] === referenceValue) {
                    hitReferenceCount++;
                }
            }

            const frequencyCheckResult = this.findMostFrequent(responses);
            const mostFrequentCount = frequencyCheckResult.count;

            let conclusion;
            if (mostFrequentCount === responses.length) {
                conclusion = "所有响应相同，可能是官方API";
            } else {
                conclusion = `响应结果重复度：${mostFrequentCount}/${responses.length}`;
                if (/^(gpt-4o|claude-3-5|claude-3.5)/.test(model)) {
                    conclusion += `，参考值命中率：${hitReferenceCount}/${responses.length}`;
                }
                conclusion += "，可能不是官方API";
            }

            // 返回结果对象
            return {
                model: model,
                responses: responses,
                referenceValue: referenceValue,
                hitReferenceCount: hitReferenceCount,
                conclusion: conclusion,
            };

        } catch (error) {
            console.error("Error in verifyTemperature:", error);
            throw error;
        }
    }

    /**
     * 发送温度验证请求
     * @param {string} model - 模型名称
     * @returns {Object} - 请求的响应结果
     */
    async sendTemperatureVerificationRequest(model) {
        try {
            const response = await fetch(`${this.apiUrl}/v1/chat/completions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content:
                                "You're an associative thinker. The user gives you a sequence of 6 numbers. Your task is to figure out and provide the 7th number directly, without explaining how you got there.",
                        },
                        {
                            role: "user",
                            content: "5, 15, 77, 19, 53, 54,",
                        },
                    ],
                    temperature: 0.01,
                    model: model,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error in sendTemperatureVerificationRequest:", error);
            return { error: error.message };
        }
    }

    /**
     * 查找数组中出现频率最高的元素
     * @param {Array} arr - 要检查的数组
     * @returns {Object} - 包含最频繁元素及其出现次数的对象
     */
    findMostFrequent(arr) {
        const frequency = {};
        let maxFreq = 0;
        let mostFrequentItem = null;

        arr.forEach(item => {
            frequency[item] = (frequency[item] || 0) + 1;
            if (frequency[item] > maxFreq) {
                maxFreq = frequency[item];
                mostFrequentItem = item;
            }
        });

        return { item: mostFrequentItem, count: maxFreq };
    }

    /**
     * 官方验证
     * @param {string} model - 模型名称
     * @param {number} seed - 随机种子
     * @returns {Object} - 包含响应文本、指纹、相似度和结论的对象
     */
    async performOfficialVerification(model, seed) {
        try {
            const results = await Promise.all([1, 2, 3, 4].map(() => this.sendVerificationRequest(model, seed)));
            const texts = [];
            const fingerprints = [];

            for (let i = 0; i < results.length; i++) {
                if (results[i].error) {
                    console.error(`Error in request ${i + 1}:`, results[i].error);
                    throw new Error(`请求 ${i + 1} 失败: ${results[i].error}`);
                }
                if (!results[i].choices?.[0]?.message?.content) {
                    console.error(`Invalid response structure in request ${i + 1}:`, results[i]);
                    throw new Error(`请求 ${i + 1} 返回的数据结构无效`);
                }
                texts.push(results[i].choices[0].message.content);
                fingerprints.push(results[i].system_fingerprint || 'N/A');
            }

            const similarity = this.compareTextSimilarity(texts);

            // 分析结果
            let validFingerprintsCount = fingerprints.filter(value => value !== 'N/A').length;
            let similarityCount = Object.values(similarity).filter(value => parseFloat(value) > 0.6).length;
            let lowSimilarityCount = Object.values(similarity).filter(value => parseFloat(value) < 0.1).length;

            // 根据统计结果得出结论
            let conclusion;
            if (validFingerprintsCount >= 3 && similarityCount >= 3) {
                conclusion = '恭喜你，大概率是官方API呀！这可能是官方API！';
            } else if (validFingerprintsCount >= 2 && similarityCount >= 2) {
                conclusion = '可能是官方API';
            } else if (validFingerprintsCount <= 2 && lowSimilarityCount >= 2) {
                conclusion = '可能是假的';
            } else {
                conclusion = '没有系统指纹且回答一致性差，则API大概率是假的，结果不确定，请进一步验证';
            }

            // 返回结果
            return {
                model: model,
                texts: texts,
                fingerprints: fingerprints,
                similarity: similarity,
                conclusion: conclusion,
            };

        } catch (error) {
            console.error('Error in performOfficialVerification:', error);
            throw error;
        }
    }

    /**
     * 发送验证请求
     * @param {string} model - 模型名称
     * @param {number} seed - 随机种子
     * @returns {Object} - 请求的响应结果
     */
    async sendVerificationRequest(model, seed) {
        try {
            const response = await fetch(`${this.apiUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: "写一个10个字的冷笑话"
                        }
                    ],
                    seed: seed,
                    temperature: 0.7,
                    model: model
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in sendVerificationRequest:', error);
            return { error: error.message };
        }
    }

    /**
     * 比较文本相似度
     * @param {Array} texts - 包含四个文本的数组
     * @returns {Object} - 相似度结果
     */
    compareTextSimilarity(texts) {
        function calculateSimilarity(str1, str2) {
            const len1 = str1.length;
            const len2 = str2.length;
            const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));

            for (let i = 0; i <= len1; i++) matrix[i][0] = i;
            for (let j = 0; j <= len2; j++) matrix[0][j] = j;

            for (let i = 1; i <= len1; i++) {
                for (let j = 1; j <= len2; j++) {
                    const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j - 1] + cost
                    );
                }
            }

            return 1 - matrix[len1][len2] / Math.max(len1, len2);
        }

        return {
            similarity12: calculateSimilarity(texts[0], texts[1]).toFixed(4),
            similarity13: calculateSimilarity(texts[0], texts[2]).toFixed(4),
            similarity14: calculateSimilarity(texts[0], texts[3]).toFixed(4),
            similarity23: calculateSimilarity(texts[1], texts[2]).toFixed(4),
            similarity24: calculateSimilarity(texts[1], texts[3]).toFixed(4),
            similarity34: calculateSimilarity(texts[2], texts[3]).toFixed(4)
        };
    }

    /**
     * 函数调用验证
     * @param {string} model - 模型名称
     * @param {number} a - 整数 a
     * @param {number} b - 整数 b
     * @returns {Object} - 包含标准响应和模型响应的对象
     */
    async verifyFunctionCalling(model, a, b) {
        try {
            const result = await this.sendFunctionCallingRequest(model, a, b);

            if (result.error) {
                console.error(`Error in request:`, result.error);
                throw new Error(`请求失败: ${result.error}`);
            }

            let standardResponse = {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": null,
                    "function_call": {
                        "name": "add_numbers",
                        "arguments": `{"a":${a},"b":${b}}`
                    },
                },
                "logprobs": null,
                "finish_reason": "function_call",
            };

            return {
                model: model,
                standardResponse: standardResponse,
                modelResponse: result.choices?.[0],
            };

        } catch (error) {
            console.error('Error in verifyFunctionCalling:', error);
            throw error;
        }
    }

    /**
     * 发送函数调用请求
     * @param {string} model - 模型名称
     * @param {number} a - 整数 a
     * @param {number} b - 整数 b
     * @returns {Object} - 请求的响应结果
     */
    async sendFunctionCallingRequest(model, a, b) {
        try {
            const response = await fetch(`${this.apiUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": `Please add ${a} and ${b}.`}
                    ],
                    functions: [
                        {
                            "name": "add_numbers",
                            "description": "Adds two numbers together",
                            "parameters": {
                                "type": "object",
                                "properties": {
                                    "a": {
                                        "type": "number",
                                        "description": "The first number"
                                    },
                                    "b": {
                                        "type": "number",
                                        "description": "The second number"
                                    }
                                },
                                "required": ["a", "b"]
                            }
                        }
                    ],
                    function_call: "auto",
                    temperature: 0.5,
                    model: model
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in sendFunctionCallingRequest:', error);
            return { error: error.message };
        }
    }

    /**
     * 自定义对话验证
     * @param {string} model - 模型名称
     * @param {string} prompt - 用户输入的提示词
     * @returns {Object} - 包含响应结果的对象
     */
    async verifyCustomDialog(model, prompt) {
        try {
            const result = await this.sendCustomDialogRequest(model, prompt);

            if (result.error) {
                console.error(`Error in request:`, result.error);
                throw new Error(`请求失败: ${result.error}`);
            }

            return {
                model: model,
                prompt: prompt,
                response: result.choices?.[0]?.message?.content || '',
                raw_response: result
            };

        } catch (error) {
            console.error('Error in verifyCustomDialog:', error);
            throw error;
        }
    }

    /**
     * 发送自定义对话请求
     * @param {string} model - 模型名称
     * @param {string} prompt - 用户输入的提示词
     * @returns {Object} - 请求的响应结果
     */
    async sendCustomDialogRequest(model, prompt) {
        try {
            const response = await fetch(`${this.apiUrl}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    model: model
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in sendCustomDialogRequest:', error);
            return { error: error.message };
        }
    }
}
export default ModelVerifier;
