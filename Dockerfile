FROM node:12

# Create app directory
WORKDIR /data/app

# 接下来我们需要将package*.json文件拷贝进image中，并且运行npm install来安装依赖库：
COPY package*.json ./
RUN npm install

# 拷贝应用程序
COPY src/index.js .

# 暴露端口
EXPOSE 8080

# 运行命令
CMD [ "npm", 'run', 'dev' ]


