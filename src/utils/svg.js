import {errorHandler} from "./normal.js";
import {commonModelList, priorityModelList} from "./models.js";

// 设置其他模型的最大显示数量
const MAX_OTHER_MODELS = 20;

// 设置未展示模型的最大显示行数
const MAX_UNDISPLAYED_MODEL_LINES = 2;

// 处理结果数据的函数
function processResults(results) {
    // 定义模型识别函数
    function isGpt(model) {
        const lowerModel = model.toLowerCase();
        return (
            lowerModel.includes("gpt-4") ||
            lowerModel.includes("chatgpt") ||
            lowerModel.startsWith("o1-") ||
            /^(gpt-|chatgpt-|o1-)/i.test(model) ||
            lowerModel.includes("gpt")
        );
    }

    function isClaude(model) {
        return (
            /^claude-/i.test(model) ||
            model.toLowerCase().includes("claude")
        );
    }

    function isDeepSeek(model) {
        return model.toLowerCase().includes("deepseek");
    }

    function isPriorityModel(model) {
        return priorityModelList.includes(model.toLowerCase());
    }

    // 初始化存储处理后的数据结构
    const processedData = {
        summary: {
            totalTested: 0,
            availableModels: 0,
            availableRatio: 0,
            averageLatency: 0,
            gptCount: 0,
            claudeCount: 0,
        },
        commonModels: [],
        otherModels: [],
        undisplayedAvailableModels: [],
        failedModels: [],
    };

    // 统计总模型数量和可用模型数量
    const totalModelsTested =
        results.valid.length +
        results.inconsistent.length +
        results.invalid.length;
    const totalAvailableModels =
        results.valid.length + results.inconsistent.length;

    processedData.summary.totalTested = totalModelsTested;
    processedData.summary.availableModels = totalAvailableModels;

    // 计算可用率
    processedData.summary.availableRatio = totalModelsTested
        ? ((totalAvailableModels / totalModelsTested) * 100).toFixed(2)
        : 0;

    // 计算平均响应时间
    const availableModelsList = results.valid.concat(results.inconsistent);
    const totalLatency = availableModelsList.reduce(
        (sum, r) => sum + r.responseTime,
        0
    );
    processedData.summary.averageLatency = totalAvailableModels
        ? (totalLatency / totalAvailableModels).toFixed(2)
        : "0";

    // 统计 GPT 和 Claude 模型数量
    processedData.summary.gptCount = availableModelsList.filter((r) =>
        isGpt(r.model)
    ).length;
    processedData.summary.claudeCount = availableModelsList.filter((r) =>
        isClaude(r.model)
    ).length;

    // 从结果中整理模型数据，标记状态
    const allModels = [];

    results.valid.forEach((r) => {
        allModels.push({...r, status: "valid"});
    });
    results.inconsistent.forEach((r) => {
        allModels.push({...r, status: "inconsistent"});
    });
    results.invalid.forEach((r) => {
        allModels.push({...r, status: "invalid"});
    });

    // 常用模型列表，不截断，全部展示，无论状态
    const commonModelsSet = new Set(commonModelList.map((m) => m.toLowerCase()));
    processedData.commonModels = allModels.filter((r) =>
        commonModelsSet.has(r.model.toLowerCase())
    );

    // 已展示的模型集合
    const displayedModelNames = new Set(
        processedData.commonModels.map((r) => r.model)
    );

    // 其他模型列表

    // 在其他模型中，首先提取优先模型
    let otherModels = allModels.filter(
        (r) => !displayedModelNames.has(r.model)
    );

    // 优先模型列表
    let priorityModels = otherModels.filter((r) =>
        isPriorityModel(r.model)
    );

    // 移除已提取的优先模型
    otherModels = otherModels.filter(
        (r) => !isPriorityModel(r.model)
    );

    // 将优先模型按状态分类
    const priorityModelsByStatus = {
        valid: [],
        inconsistent: [],
        invalid: []
    };

    priorityModels.forEach((model) => {
        priorityModelsByStatus[model.status].push(model);
    });

    // 将剩余模型按状态分类
    const remainingModelsByStatus = {
        valid: [],
        inconsistent: [],
        invalid: []
    };

    otherModels.forEach((model) => {
        remainingModelsByStatus[model.status].push(model);
    });

    // 将优先模型中只有一个模型的状态合并到剩余模型对应的状态开头
    ["valid", "inconsistent", "invalid"].forEach((status) => {
        if (priorityModelsByStatus[status].length === 1) {
            const modelToMove = priorityModelsByStatus[status][0];
            remainingModelsByStatus[status].unshift(modelToMove);
            priorityModelsByStatus[status] = [];
        }
    });

    // 重新组合优先模型，只有状态中有多个模型的才保留
    const filteredPriorityModels = [];
    ["valid", "inconsistent", "invalid"].forEach((status) => {
        if (priorityModelsByStatus[status].length > 1) {
            filteredPriorityModels.push(...priorityModelsByStatus[status]);
        }
    });

    // 处理其他类别的模型（如 Claude、DeepSeek）
    let claudeModels = [];
    let deepSeekModels = [];
    let remainingModels = [];

    otherModels.forEach((model) => {
        if (isClaude(model.model)) {
            claudeModels.push(model);
        } else if (isDeepSeek(model.model)) {
            deepSeekModels.push(model);
        } else {
            remainingModels.push(model);
        }
    });

    // 合并所有模型，按照状态分类
    const combinedModelsByStatus = {
        valid: [],
        inconsistent: [],
        invalid: []
    };

    // 将过滤后的优先模型加入到对应的状态
    ["valid", "inconsistent", "invalid"].forEach((status) => {
        filteredPriorityModels.forEach((model) => {
            if (model.status === status) {
                combinedModelsByStatus[status].push(model);
            }
        });
    });

    // 将 Claude 和 DeepSeek 模型也加入到对应的状态
    [claudeModels, deepSeekModels, remainingModels].forEach((modelList) => {
        modelList.forEach((model) => {
            combinedModelsByStatus[model.status].push(model);
        });
    });

    // 计算每个状态的模型数量和总模型数量
    const totalModelsPerStatus = {};
    let totalModels = 0;
    ["valid", "inconsistent", "invalid"].forEach((status) => {
        totalModelsPerStatus[status] = combinedModelsByStatus[status].length;
        totalModels += combinedModelsByStatus[status].length;
    });

    // 按照比例分配每个状态应该展示的模型数量
    const counts = allocateModelsProportionally(
        totalModelsPerStatus,
        MAX_OTHER_MODELS
    );

    // 组合最终要展示的模型列表
    const displayedOtherModels = [];
    ["valid", "inconsistent", "invalid"].forEach((status) => {
        const modelsToDisplay = combinedModelsByStatus[status].slice(0, counts[status]);
        displayedOtherModels.push(...modelsToDisplay);
    });

    // 更新已展示的模型集合
    displayedOtherModels.forEach((r) => displayedModelNames.add(r.model));

    // 将未展示的模型添加到未展示的可用模型和调用失败的模型列表中
    ["valid", "inconsistent", "invalid"].forEach((status) => {
        const models = combinedModelsByStatus[status];
        const undisplayedModels = models.slice(counts[status]);
        undisplayedModels.forEach((r) => {
            if ((r.status === "valid" || r.status === "inconsistent") && !displayedModelNames.has(r.model)) {
                processedData.undisplayedAvailableModels.push(r);
            } else if (r.status === "invalid" && !displayedModelNames.has(r.model)) {
                processedData.failedModels.push(r);
            }
        });
    });

    processedData.otherModels = displayedOtherModels;

    return processedData;
}

// 按照比例分配模型数量的函数
function allocateModelsProportionally(totalModelsPerStatus, maxModels) {
    const counts = {};
    const statuses = ["valid", "inconsistent", "invalid"];

    let totalModels = statuses.reduce((sum, status) => sum + totalModelsPerStatus[status], 0);
    let totalAssigned = 0;

    // 计算每个状态的初始配额
    const quotas = {};
    const remainders = {};

    statuses.forEach((status) => {
        quotas[status] = (totalModelsPerStatus[status] / totalModels) * maxModels;
        counts[status] = Math.floor(quotas[status]);
        remainders[status] = quotas[status] - counts[status];
    });

    totalAssigned = statuses.reduce((sum, status) => sum + counts[status], 0);

    // 确保每个有模型的状态至少分配一个模型
    statuses.forEach((status) => {
        if (counts[status] === 0 && totalModelsPerStatus[status] > 0) {
            counts[status] = 1;
            totalAssigned++;
        }
    });

    // 调整分配数量以符合总模型数量限制
    // 如果分配的总数超过最大值，减少分配
    while (totalAssigned > maxModels) {
        // 按照 remainders 从小到大排序
        statuses.sort((a, b) => remainders[a] - remainders[b]);
        for (let status of statuses) {
            if (counts[status] > 1) {
                counts[status]--;
                totalAssigned--;
                break;
            }
        }
    }

    // 如果分配的总数不足，增加分配
    while (totalAssigned < maxModels) {
        // 按照 remainders 从大到小排序
        statuses.sort((a, b) => remainders[b] - remainders[a]);
        for (let status of statuses) {
            if (counts[status] < totalModelsPerStatus[status]) {
                counts[status]++;
                totalAssigned++;
                break;
            }
        }
    }

    return counts;
}

// 根据处理后的数据生成 SVG 的函数
export function createSVGDataURL(results, title) {
    // 调用 processResults 处理数据
    const processedData = processResults(results);

    const testTime =
        new Date()
            .toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\//g, ".") + "  ";
    const minSvgWidth = 400;
    const maxSvgWidth = 800;
    const marginX = 25; // 左右边距保持25像素
    const lineHeight = 25;

    // 计算实际需要显示的行数
    let displayedLines = 4; // 初始的标题和空行数

    if (processedData.commonModels.length > 0) {
        displayedLines += 2; // 空行 + "常用模型"标题
        displayedLines += processedData.commonModels.length; // 常用模型的行数
    }

    if (processedData.otherModels.length > 0) {
        displayedLines += 2; // 空行 + "其他模型"标题
        displayedLines += processedData.otherModels.length; // 其他模型的行数
    }

    // 如果有未展示的可用模型或调用失败的模型，增加 "省略部分" 标题行
    if (processedData.undisplayedAvailableModels.length > 0 ||
        processedData.failedModels.length > 0) {
        displayedLines += 2; // 空行 + "省略部分"标题
    }

    // 如果有未展示的可用模型，增加两行
    if (processedData.undisplayedAvailableModels.length > 0) {
        displayedLines += MAX_UNDISPLAYED_MODEL_LINES;
    }

    // 如果有未展示的调用失败的模型，增加两行
    if (processedData.failedModels.length > 0) {
        displayedLines += MAX_UNDISPLAYED_MODEL_LINES;
    }

    // 计算 SVG 高度
    const svgHeight = displayedLines * lineHeight + 150; // 额外的空间用于顶部和底部

    // **计算动态 SVG 宽度**

    // 定义最大字符串长度
    const maxModelNameLength = 30; // 不截断，显示完整名称
    const maxRemarkLength = 50; // 不截断，显示完整备注

    // 估计内容所需的宽度
    const textWidthPerChar = 8; // 每个字符约占8像素宽度

    // 计算列宽度
    const col1Width = 100;
    const col2Width = maxModelNameLength * textWidthPerChar;
    const col3Width = 80;
    const col4Width = maxRemarkLength * textWidthPerChar;

    // 计算总宽度
    let calculatedSvgWidth =
        marginX * 2 + col1Width + col2Width + col3Width + col4Width + 40; // 额外的40像素用于列间间距

    // 限制宽度在最小值和最大值之间
    calculatedSvgWidth = Math.max(minSvgWidth, calculatedSvgWidth);
    calculatedSvgWidth = Math.min(maxSvgWidth, calculatedSvgWidth);

    const svgWidth = calculatedSvgWidth;

    // 调整列的 X 坐标
    const col1X = marginX + 10; // 第一列的X坐标
    const col2X = col1X + col1Width;
    const col3X = col2X + col2Width + 10;
    const col4X = col3X + col3Width + 10;

    // 开始构建 SVG 内容
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMinYMin meet">`;

    // 定义渐变
    svgContent += `<defs><linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8B96AB"/><stop offset="50%" stop-color="#A7B0C2"/><stop offset="100%" stop-color="#BCCEE1"/></linearGradient></defs>`;

    // 应用背景渐变
    svgContent += `<rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="url(#backgroundGradient)" />`;

    const contentBoxY = 50; // 调整内容框的Y坐标，以上移内容
    const contentBoxHeight = svgHeight - 100; // 调整内容框高度

    svgContent += `<rect x="${marginX}" y="${contentBoxY}" width="${
        svgWidth - 2 * marginX
    }" height="${contentBoxHeight}" rx="10" fill="#2d2d2d" />`;

    // 标题和图标
    const icons = [
        {cx: marginX + 20, cy: contentBoxY + 25, r: 6, fill: "#ff5f56"},
        {cx: marginX + 40, cy: contentBoxY + 25, r: 6, fill: "#ffbd2e"},
        {cx: marginX + 60, cy: contentBoxY + 25, r: 6, fill: "#27c93f"},
    ];
    icons.forEach((icon) => {
        svgContent += `<circle cx="${icon.cx}" cy="${icon.cy}" r="${icon.r}" fill="${icon.fill}" />`;
    });

    // 标题
    svgContent += `<text x="${svgWidth / 2}" y="${
        contentBoxY + 30
    }" fill="#ffffff" font-size="20" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">API CHECK</text>`;

    let y = contentBoxY + 30;

    y += lineHeight; // 添加一个空行

    // 添加来源和时间，左对齐
    y += lineHeight;
    const fromX = marginX + 10; // 左对齐的起始位置
    svgContent += `<text x="${fromX}" y="${y}" font-size="14" font-family="Arial, sans-serif" font-weight="bold"><tspan fill="#FFFFFF">🔗 来源：</tspan><tspan fill="#00FF00">${title}</tspan><tspan fill="#FFFFFF">   ⏰ 时间：${testTime}</tspan></text>`;

    // 显示统计信息，左对齐
    y += lineHeight;

    const summaryText = `📊 共测试 ${processedData.summary.totalTested} 个模型，💡 可用率 ${processedData.summary.availableRatio}% ，⏱ 平均响应时间 ${processedData.summary.averageLatency}s  ，🧠 GPT ${processedData.summary.gptCount}  Claude ${processedData.summary.claudeCount} `;
    svgContent += drawText(fromX, y, summaryText, "14", "#FFFFFF", "bold");

    y += lineHeight; // 添加一个空行

    // 绘制常用模型
    if (processedData.commonModels.length > 0) {
        y += lineHeight; // 空行
        svgContent += drawText(col1X, y, "🌟 常用模型：", "16", "#FFA500", "bold");
        y += lineHeight;

        processedData.commonModels.forEach((r) => {
            let statusText = "";
            let statusColor = "#ffffff";
            let modelColor = "#59e3ff";
            let remarkColor = "#3f1"; // 默认备注颜色

            const modelName = r.model;

            if (r.status === "valid") {
                // 一致可用
                statusText = "🥳 一致可用";
                remarkColor = "#3f1";
                svgContent += drawText(col1X, y, statusText, "16", statusColor);
                svgContent += drawText(
                    col2X,
                    y,
                    modelName,
                    "16",
                    modelColor,
                    "bold"
                );
                svgContent += drawText(
                    col3X,
                    y,
                    r.responseTime.toFixed(2) + "s",
                    "16",
                    modelColor
                );
                svgContent += drawText(
                    col4X,
                    y,
                    "模型校验成功",
                    "16",
                    remarkColor
                );
            } else if (r.status === "inconsistent") {
                // 未匹配/模型映射
                const returnedModel = r.returnedModel || "";

                if (returnedModel.startsWith(`${r.model}-`)) {
                    statusText = "😲 模型映射";
                } else {
                    statusText = "🤔 未匹配";
                }
                svgContent += drawText(col1X, y, statusText, "16", statusColor);
                svgContent += drawText(
                    col2X,
                    y,
                    modelName,
                    "16",
                    "#ff6b6b",
                    "bold"
                );
                svgContent += drawText(
                    col3X,
                    y,
                    r.responseTime.toFixed(2) + "s",
                    "16",
                    modelColor
                );
                svgContent += drawText(
                    col4X,
                    y,
                    `${returnedModel}`,
                    "16",
                    modelColor
                );
            } else if (r.status === "invalid") {
                // 调用失败
                statusText = "😡 调用失败";
                let msg;
                if (r.error) {
                    msg = errorHandler(r.error);
                } else {
                    msg = errorHandler(r.response_text);
                }
                svgContent += drawText(col1X, y, statusText, "16", statusColor);
                svgContent += drawText(
                    col2X,
                    y,
                    modelName,
                    "16",
                    "#ffffff"
                );
                svgContent += drawText(col3X, y, "-", "16", "#ff6b6b");
                svgContent += drawText(col4X, y, msg, "16", "#ffffff");
            }
            y += lineHeight;
        });
    }

    // 绘制其他模型
    if (processedData.otherModels.length > 0) {
        y += lineHeight; // 空行
        svgContent += drawText(col1X, y, "🚀 其他模型：", "16", "#FFA500", "bold");
        y += lineHeight;

        processedData.otherModels.forEach((r) => {
            let statusText = "";
            let statusColor = "#ffffff";
            let modelColor = "#59e3ff";
            let remarkColor = "#3f1"; // 默认备注颜色

            const modelName = r.model;

            if (r.status === "valid") {
                // 一致可用
                statusText = "🥳 一致可用";
                remarkColor = "#3f1";
                svgContent += drawText(col1X, y, statusText, "16", statusColor);
                svgContent += drawText(
                    col2X,
                    y,
                    modelName,
                    "16",
                    modelColor,
                    "bold"
                );
                svgContent += drawText(
                    col3X,
                    y,
                    r.responseTime.toFixed(2) + "s",
                    "16",
                    modelColor
                );
                svgContent += drawText(
                    col4X,
                    y,
                    "模型校验成功",
                    "16",
                    remarkColor
                );
            } else if (r.status === "inconsistent") {
                // 未匹配/模型映射
                const returnedModel = r.returnedModel || "";

                if (returnedModel.startsWith(`${r.model}-`)) {
                    statusText = "😲 模型映射";
                } else {
                    statusText = "🤔 未匹配";
                }
                svgContent += drawText(col1X, y, statusText, "16", statusColor);
                svgContent += drawText(
                    col2X,
                    y,
                    modelName,
                    "16",
                    "#ff6b6b",
                    "bold"
                );
                svgContent += drawText(
                    col3X,
                    y,
                    r.responseTime.toFixed(2) + "s",
                    "16",
                    modelColor
                );
                svgContent += drawText(
                    col4X,
                    y,
                    `${returnedModel}`,
                    "16",
                    modelColor
                );
            } else if (r.status === "invalid") {
                // 调用失败
                statusText = "😡 调用失败";
                let msg;
                if (r.error) {
                    msg = errorHandler(r.error);
                } else {
                    msg = errorHandler(r.response_text);
                }
                svgContent += drawText(col1X, y, statusText, "16", statusColor);
                svgContent += drawText(
                    col2X,
                    y,
                    modelName,
                    "16",
                    "#ffffff"
                );
                svgContent += drawText(col3X, y, "-", "16", "#ff6b6b");
                svgContent += drawText(col4X, y, msg, "16", "#ffffff");
            }
            y += lineHeight;
        });
    }

    // 添加省略部分标题
    if (processedData.undisplayedAvailableModels.length > 0 ||
        processedData.failedModels.length > 0) {
        y += lineHeight; // 空行
        svgContent += drawText(col1X, y, "📌 省略部分：", "16", "#FFA500", "bold");
        y += lineHeight;
    }

    // 添加未展示的可用模型
    if (processedData.undisplayedAvailableModels.length > 0) {
        const maxLines = MAX_UNDISPLAYED_MODEL_LINES;
        let undisplayedModelNames = processedData.undisplayedAvailableModels.map(
            (r) => r.model
        );
        const lineWidth = svgWidth - 2 * marginX;
        const textPerLine = Math.floor(lineWidth / textWidthPerChar);
        // 修改 maxChars 计算方式，使其在第二行达到一半时截断
        const maxChars = Math.floor(textPerLine * 1.5);
        const prefix = "😀 可用模型：";
        let contentText = prefix + undisplayedModelNames.join("、");

        if (getTextWidth(contentText) <= maxChars * textWidthPerChar) {
            // 文本在限制的字符数内，正常显示
            let undisplayedTextLines = wrapText(
                contentText,
                textPerLine
            );

            undisplayedTextLines.forEach((line) => {
                svgContent += drawText(
                    fromX,
                    y,
                    line,
                    "14",
                    "#FFFFFF"
                );
                y += lineHeight;
            });
        } else {
            // 文本超过限制，需要截断并添加省略信息
            let availableChars = maxChars - Math.ceil(getTextWidth(prefix) / textWidthPerChar);
            let displayedNames = [];
            let totalLength = 0;
            for (let name of undisplayedModelNames) {
                let nameLength = name.length + 1; // 加1考虑“、”
                if (totalLength + nameLength <= availableChars) {
                    displayedNames.push(name);
                    totalLength += nameLength;
                } else {
                    break;
                }
            }
            let omittedCount = undisplayedModelNames.length - displayedNames.length;
            let finalText = prefix + displayedNames.join("、") + `...（省略${omittedCount}个模型）`;
            let undisplayedTextLines = wrapText(
                finalText,
                textPerLine
            );
            undisplayedTextLines.forEach((line) => {
                svgContent += drawText(
                    fromX,
                    y,
                    line,
                    "14",
                    "#FFFFFF"
                );
                y += lineHeight;
            });
        }
    }

    // 添加调用失败的模型
    if (processedData.failedModels.length > 0) {
        const maxLines = MAX_UNDISPLAYED_MODEL_LINES;
        let failedModelNames = processedData.failedModels.map((r) => r.model);
        const lineWidth = svgWidth - 2 * marginX;
        const textPerLine = Math.floor(lineWidth / textWidthPerChar);
        // 修改 maxChars 计算方式，使其在第二行达到一半时截断
        const maxChars = Math.floor(textPerLine * 1.5);
        const prefix = "😞 调用失败：";
        let contentText = prefix + failedModelNames.join("、");

        if (getTextWidth(contentText) <= maxChars * textWidthPerChar) {
            // 文本在限制的字符数内，正常显示
            let failedTextLines = wrapText(
                contentText,
                textPerLine
            );

            failedTextLines.forEach((line) => {
                svgContent += drawText(
                    fromX,
                    y,
                    line,
                    "14",
                    "#FFFFFF"
                );
                y += lineHeight;
            });
        } else {
            // 文本超过限制，需要截断并添加省略信息
            let availableChars = maxChars - Math.ceil(getTextWidth(prefix) / textWidthPerChar);
            let displayedNames = [];
            let totalLength = 0;
            for (let name of failedModelNames) {
                let nameLength = name.length + 1; // 加1考虑“、”
                if (totalLength + nameLength <= availableChars) {
                    displayedNames.push(name);
                    totalLength += nameLength;
                } else {
                    break;
                }
            }
            let omittedCount = failedModelNames.length - displayedNames.length;
            let finalText = prefix + displayedNames.join("、") + `...（省略${omittedCount}个模型）`;
            let failedTextLines = wrapText(
                finalText,
                textPerLine
            );
            failedTextLines.forEach((line) => {
                svgContent += drawText(
                    fromX,
                    y,
                    line,
                    "14",
                    "#FFFFFF"
                );
                y += lineHeight;
            });
        }
    }

    // 添加版权说明
    svgContent += `<text x="${svgWidth / 2}" y="${
        svgHeight - 20
    }" fill="#000000" font-size="16" font-family="Arial, sans-serif" text-anchor="middle">© 2024 API CHECK | DEV API | BY RICK</text>`;

    // 结束 SVG 标签
    svgContent += `</svg>`;

    // 将 SVG 内容编码为 Data URL
    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgContent
    )}`;

    // 返回 Data URL
    return svgDataUrl;
}

// 添加绘制文本的函数
function drawText(
    x,
    y,
    textContent,
    fontSize,
    fill,
    fontWeight = "normal"
) {
    return `<text x="${x}" y="${y}" fill="${fill}" font-size="${fontSize}" font-family="Arial, sans-serif" font-weight="${fontWeight}">${textContent}</text>`;
}

// 计算文本宽度的函数
function getTextWidth(text) {
    const textWidthPerChar = 8; // 每个字符约占8像素宽度
    return text.length * textWidthPerChar;
}

// 自动换行的函数
function wrapText(text, maxCharsPerLine) {
    let lines = [];
    let currentLine = "";
    let tokens = text.split(/(?<=、)/); // 保留分割符“、”
    tokens.forEach((token, index) => {
        const tokenLength = token.length;
        if ((currentLine.length + tokenLength) <= maxCharsPerLine) {
            currentLine += token;
        } else {
            if (currentLine) {
                lines.push(currentLine);
            }
            currentLine = token;
        }
    });
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines;
}
