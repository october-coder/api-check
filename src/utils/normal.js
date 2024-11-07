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
    }else{
        errorMsg= '测试失败';
    }
    return errorMsg;
}

export  function maskApiKey(apiKey) {
    if (!apiKey || apiKey.length < 10) {
        return apiKey;
    }
    const length = apiKey.length;
    const maskedSection = '****';
    return apiKey.slice(0, 6) + maskedSection + apiKey.slice(length - 4);
}
