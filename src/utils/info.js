export const appInfo = {
    name: 'API CHECK', // 应用名称
    description: {
        zh: [
            '✨ 适用：支持one-api、new-api 等中转 OpenAI 格式的 API 检测',
            '🔐 安全：纯前端版本，无需担心网关超时，数据安全有保障',
            '🔎 直观：测试数据完整，响应时间、模型一致性直观',
            '☁️ 便捷：支持快速图片分享和云端数据保存',
        ],
        en: [
            '✨ Suitable for testing API proxies like one-api, new-api supporting OpenAI format',
            '🔐 Secure: Pure front-end version, no gateway timeout concerns, data security assured',
            '🔎 Intuitive: Complete testing data, intuitive response times and model consistency',
            '☁️ Convenient: Supports quick image sharing and cloud data saving',
        ],
    },
    subtitle: '纯前端 OpenAI API 检测工具',
    version: '2.0.0', // 版本号
    author: {
        name: "RICK",
        url: "https://blog.rick.icu"
    },
    coauthor: {
        name: "MEGASOFT",
        url: "https://linux.do/u/zhong_little"
    },
    sponsors: [
        {
            name: 'VME50',
            url: 'mailto:rickhgh@foxmail.com',
            desc: '虚位以待'
        },
        {
            name: '黄花机场',
            url: 'https://www.hunanairport.cn',
            desc: '最好的机场'
        }
    ],
    updateLogUrl: 'https://github.com/october-coder/api-check/releases',
    contributors: [
        {
            name: 'rick',
            url: 'https://linux.do/u/rick',
            avatar: 'https://linux.do/user_avatar/linux.do/rick/288/254826_2.png',
        }, {
            name: 'megasoft',
            url: 'https://linux.do/u/zhong_little',
            avatar: 'https://linux.do/user_avatar/linux.do/zhong_little/288/104887_2.png',
        }, {
            name: 'fangyuan',
            url: 'https://linux.do/u/fangyuan99',
            avatar: 'https://linux.do/letter_avatar_proxy/v4/letter/f/b3f665/144.png',
        }, {
            name: 'juzeon',
            url: 'https://github.com/juzeon',
            avatar: 'https://avatars.githubusercontent.com/u/12206799?s=60&v=4',
        }
    ],
    company: 'rick & megasoft', // 公司名称
    year: '2024', // 年份
    website: 'check.crond.dev',
    officialUrl: 'https://check.crond.dev',
    license: 'Apache', // 许可证,
    changelogUrl: 'https://github.com/october-coder/api-check/releases',
    githubUrl: 'https://github.com/october-coder/api-check',
    owner: 'october-coder',
    repo: 'api-check',
};

export const banner = `

    ___    ____  ____   ________  ________________ __ ______
   /   |  / __ \\/  _/  / ____/ / / / ____/ ____/ //_// ____/
  / /| | / /_/ // /   / /   / /_/ / __/ / /   / ,<  / __/
 / ___ |/ ____// /   / /___/ __  / /___/ /___/ /| |/ /___
/_/  |_/_/   /___/   \\____/_/ /_/_____/\\____/_/ |_/_____/



    `;
export const announcement = {
    content: {
        zh: [
            '🎉 欢迎使用 API CHECK，一个纯前端 OpenAI API 检测工具',
            '启用新域名: https://check.crond.dev',
        ],
        en: [
            '🎉 Welcome to API CHECK, a pure front-end OpenAI API testing tool',
            'New domain: https://check.crond.dev',
        ]
    },
    officialContent: {
        zh: [
            '公益API地址: https://api.crond.dev',
            '项目介绍&捐赠详情: https://api.crond.dev/about',
            '承接赞助和捐赠，支持项目持续发展',
        ],
        en: [
            'Public API address: https://api.crond.dev',
            'Project introduction & donation details: https://api.crond.dev/about',
            'Accepting sponsorship and donations to support the project\'s continued development',
        ]
    },
    introduce: {
        zh: [
            '🎉 欢迎使用 API CHECK，一个纯前端 OpenAI API 检测工具',
            '🔥 本工具支持测试 one-api、new-api 等中转 OpenAI 格式的 API',
            '🔒 纯前端版本，无需担心网关超时，数据安全有保障',
            '🔍 测试数据完整，响应时间、模型一致性直观',
            '☁️ 支持快速图片分享和云端数据保存',
            '🚀 本工具由 rick & megasoft 开发，欢迎体验！'
        ],
        en: [
            '🎉 Welcome to API CHECK, a pure front-end OpenAI API testing tool',
            '🔥 This tool supports testing API proxies like one-api, new-api supporting OpenAI format',
            '🔒 Pure front-end version, no gateway timeout concerns, data security assured',
            '🔍 Complete testing data, intuitive response times and model consistency',
            '☁️ Supports quick image sharing and cloud data saving',
            '🚀 Developed by rick & megasoft, welcome to experience!'
        ]
    },
    howToUse: {
        zh: [
            '🕵️ 使用“官转验证”功能确认API的真实性',
            '🧊 使用“温度验证”功能确认API的一致性',
            '📊 使用“函数验证”功能检测API的FC支持'
        ],
        en: [
            '🕵️ Use the "Official Verification" feature to confirm the authenticity of the API',
            '🧊 Use the "Temperature Verification" feature to confirm the consistency of the API',
            '📊 Use the "Function Verification" feature to detect the FC support of the API'
        ]
    },
    updateLog: {
        zh: [{
            version: 'v1.5',
            date: '2024-11-10',
            content: [
                '新域名 ：https://check.crond.dev',
                '新增：黑暗模式',
                '优化：优化前端交互体验',
            ],
            url: ''
        }, {
            version: '1.4.0',
            date: '2024-09-08',
            content: [
                '优化:模型名称一致性时无返回模型参数的提示信息',
                '新增：增加温度验证方式',
                '新增：增加验证按钮悬停提示',
            ],
            url: 'https://linux.do/t/topic/199694'
        }, {
            version: '1.3.0',
            date: '2024-08-31',
            content: [
                '新增：增加函数验证方式',
                '新增：增加官转验证方式',
            ],
            url: 'https://linux.do/t/topic/191420'
        }
        ], en: [
            {
                version: 'v1.5',
                date: '2024-11-10',
                content: [
                    'New domain: https://check.crond.dev',
                    'New: Dark mode',
                    'Optimization: Optimize front-end interactive experience',
                ],
                url: ''
            }, {
                version: '1.4.0',
                date: '2024-09-08',
                content: [
                    'Optimization: Prompt information when the model name consistency does not return model parameters',
                    'New: Added temperature verification method',
                    'New: Added verification button hover prompt',
                ],
                url: 'https://linux.do/t/topic/199694'
            }, {
                version: '1.3.0',
                date: '2024-08-31',
                content: [
                    'New: Added function verification method',
                    'New: Added official verification method',
                ],
                url: 'https://linux.do/t/topic/191420'
            }
        ]
    },
    url: {
        githubUrl: 'https://github.com/october-coder/api-check',
        officialUrl: 'https://check.crond.dev',
    }
}
