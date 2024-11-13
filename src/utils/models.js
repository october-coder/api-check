export const commonModelList = [
  // 常用模型名称列表  gpt-4o,gpt-4o-2024-05-13,gpt-4o-2024-08-06,gpt-4o-mini,gpt-4o-mini-2024-07-18 o1-mini,o1-mini-2024-09-12,o1-preview,o1-preview-2024-09-12,claude-3-5-sonnet,claude-3-5-sonnet-20240620
  'gpt-4o',
  'gpt-4o-2024-08-06',
  'gpt-4o-mini',
  'o1-mini',
  'o1-mini-2024-09-12',
  'o1-preview',
  'o1-preview-2024-09-12',
  'claude-3-5-sonnet',
  'claude-3-5-sonnet-20240620',
];

export const priorityModelList = [
  // 优先模型名称列表
  'gpt-4o-2024-05-13',
  'gpt-4o-mini-2024-07-18',
  'llama-3.1-405b',
];
export const cantFunctionModelList = [
  'chatgpt-4o-latest',
  // 无法使用函数验证列表
  'o1-mini',
  'o1-mini-2024-09-12',
  'o1-preview',
  'o1-preview-2024-09-12',
];
export const cantTemperatureModelList = [
  'o1-mini',
  'o1-mini-2024-09-12',
  'o1-preview',
  'o1-preview-2024-09-12',
];
export const cantOfficialModelList = [
  // 无法使用官方验证列表
  'o1-mini',
  'o1-mini-2024-09-12',
  'o1-preview',
  'o1-preview-2024-09-12',
];
export const presetPromptsList = [
  {
    title: '鲁迅暴打周树人',
    content: '鲁迅为什么暴打周树人？',
    description:
      'GPT3.5 ：会一本正经的胡说八道。\nGPT4 ：表示鲁迅和周树人是同一个人。',
  },
  {
    title: '爸妈结婚未邀请我',
    content: '我爸妈结婚时为什么没有邀请我？',
    description:
      'GPT3.5 ：他们当时认为你还太小，所以没有邀请你。\nGPT4 ：他们结婚时你还没出生。',
  },
  {
    title: '昨日的今天是明天的什么',
    content: "What yesterday's today is tomorrow's?",
    description: 'GPT3.5 ：Yesterday (昨天)\nGPT4 ：Past (前天)',
  },
  {
    title: '树上鸟的数量',
    content:
      'There are 9 birds in the tree,the hunter shoots one,how many birds are left in the tree?',
    description:
      'GPT3.5 ：8 birds(只会回答8只)\nGPT4 ：None(其它鸟被吓跑，树上可能不剩任何鸟)',
  },
  {
    title: '不存在的专辑',
    content: '音乐专辑什么时候发行的 Ariana Grande Eternal Sunshine？',
    description: 'claude-3-5-sonnet/haiku: 3月8号',
  },
  {
    title: '无限序列问题',
    content: `有一个无限序列，从第 1 项开始，分别为 1,2,1,1,2,3,4,3,2,1,1,2,3,4,5,6,5,4,3,2,1
    求第 n 项的函数g
    用 Python 实现，main 函数直接输出g的前 30 项`,
    description:
      'o1系列能答对，gemini-1.5-pro-002概率答对\n(可以根据思考时间分辨):\n 1 2 1 1 2 3 4 3 2 1 1 2 3 4 5 6 5 4 3 2 1 1 2 3 4 5 6 7 8 7',
  },
  {
    title: '给主人留下些什么吧英文翻译',
    content: '给主人留下些什么吧翻译成英文',
    description:
      'gpt-4o：乱回答 \n 比如：好好表现 can be translated into English as perform well or do well.',
  },
];
