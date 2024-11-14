# 阶段1：基础镜像准备
FROM node:18-alpine AS base

# 设置工作目录
WORKDIR /app

# 配置国内镜像源
RUN npm config set registry https://registry.npmmirror.com/

# 安装必要的系统依赖（例如 CA 证书）
RUN apk add --no-cache ca-certificates

# 阶段2：构建应用程序
FROM base AS builder

WORKDIR /app

# 复制依赖文件
COPY package.json yarn.lock ./

# 安装所有依赖，包括开发依赖
RUN yarn install

# 复制项目源代码
COPY . .

# 构建应用程序
RUN yarn build

# 删除 node_modules 目录
RUN rm -rf node_modules

# 设置 NODE_ENV 为 production
ENV NODE_ENV=production

# 安装生产依赖
RUN yarn install --production --ignore-scripts --prefer-offline

# 清理 yarn 缓存
RUN yarn cache clean --all

# 阶段3：构建最终的生产镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 创建非 root 用户
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# 复制应用程序文件
COPY --from=builder /app/server.js /app/server.js
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/api /app/api
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# 修改文件权限，使 appuser 拥有所有权
RUN chown -R appuser:appgroup /app

# 设置环境变量
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=13000
ENV NODE_OPTIONS="--dns-result-order=ipv4first --use-openssl-ca"

# 暴露端口
EXPOSE 13000

# 使用非 root 用户
USER appuser

# 启动命令
CMD ["node", "server.js"]
