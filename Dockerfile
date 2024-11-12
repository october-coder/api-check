# 阶段1：基础镜像准备
FROM node:18-alpine AS base

ARG USE_CN_MIRROR

# 设置工作目录
WORKDIR /app

# 配置国内镜像源（如果需要）
RUN \
    if [ "${USE_CN_MIRROR:-false}" = "true" ]; then \
        npm config set registry https://registry.npmmirror.com/; \
    fi

# 安装必要的系统依赖（例如CA证书）
RUN apk add --no-cache ca-certificates

# 创建distroless目录，准备复制必要的运行时文件
RUN mkdir -p /distroless/bin /distroless/lib /distroless/etc/ssl/certs /distroless/etc

# 复制Node.js可执行文件
RUN cp /usr/local/bin/node /distroless/bin/

# 复制Node.js运行时依赖的库文件
RUN ldd /usr/local/bin/node | awk '{print $3}' | grep -v '^$' | xargs -I '{}' cp '{}' /distroless/lib/

# 复制动态链接器
RUN cp /lib/ld-musl-$(uname -m).so.1 /distroless/lib/

# 复制CA证书
RUN cp -r /etc/ssl/certs /distroless/etc/ssl/

# 创建非root用户
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# 复制用户和组信息
RUN cp /etc/passwd /distroless/etc/passwd && \
    cp /etc/group /distroless/etc/group



# 阶段2：构建应用程序
FROM base AS builder

ARG USE_CN_MIRROR

WORKDIR /app

# 复制依赖文件
COPY package.json yarn.lock ./

# 确保在构建阶段NODE_ENV不为production
ENV NODE_ENV=development

# 配置国内镜像源并安装依赖
RUN \
    if [ "${USE_CN_MIRROR:-false}" = "true" ]; then \
        npm config set registry https://registry.npmmirror.com/; \
    fi && \
    yarn install

# 复制项目源代码
COPY . .

# 构建应用程序
RUN yarn build

# 重新设置NODE_ENV为production
ENV NODE_ENV=production

# 删除devDependencies，减小最终镜像大小
RUN yarn install --production --ignore-scripts --prefer-offline

# 修改文件权限，使appuser拥有所有权
RUN chown -R appuser:appgroup /app



# 阶段3：构建最终的生产镜像
FROM scratch

# 复制distroless文件
COPY --from=base /distroless /

# 复制应用程序文件
COPY --from=builder /app /app

# 设置环境变量
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=13000
ENV NODE_OPTIONS="--dns-result-order=ipv4first --use-openssl-ca"

# 设置工作目录
WORKDIR /app

# 暴露端口
EXPOSE 13000

# 使用非root用户
USER appuser

# 启动命令
ENTRYPOINT ["/bin/node"]
CMD ["server.js"]
