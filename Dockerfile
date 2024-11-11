# 使用 Node.js 18 作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install

# 复制其余项目文件
COPY . .

# 构建前端项目（Vue.js 项目）
RUN yarn build

# 创建数据目录
RUN mkdir -p /app/data

# 将数据目录设置为卷，以便使用 -v 映射
VOLUME /app/data

# 暴露端口（如果您的应用在 13000 端口运行）
EXPOSE 13000

# 启动应用
CMD ["node", "server.js"]
