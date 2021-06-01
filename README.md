# blog.marusho.io

## 開発環境の構築

### docker

[Docker で Gatsby環境を構築する](https://collapse-natsu.com/post/createEnvForGatsbyWithDocker)を参考にしました

```
make

make enter
```

### Gatsby Starterの利用

- Starterは[yellowcake](https://github.com/thriveweb/yellowcake) を利用しています
```
npm install -g gatsby-cli

gatsby new blog.marusho.io https://github.com/thriveweb/yellowcake

```

### localでの立ち上げ

```
cd blog.marusho.io

npm install

gatsby develop
```
