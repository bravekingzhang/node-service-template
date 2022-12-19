# node-service-template
基于 koa+mongodb+typescript+gulp 的后端服务

## features

- gulp 任务流，本地开发自动简单文件变化，重新加载服务
- 简单易于理解的后端api模型，路由配置灵活多变
- mongodb 支持
- typescript 支持

### how to use

##### install mongodb and start service
```shell
# install mongodb
brew tap mongodb/brew
brew install mongodb-community
# start mongodb
brew services start mongodb-community
#  stop mongodb
# brew services stop mongodb-community

```
##### start service

```shell
yarn && yarn dev
```

#####  build
```shell
yarn build
```
