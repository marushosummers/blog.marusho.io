---
template: BlogPost
path: /deploy-cloud-function
date: 2021-06-02T05:05:05.791Z
title: 【Firebase】特定のFunctionsのみデプロイする
thumbnail: /assets/fire.jpg
---
FirebaseのCloud Functionsでバッチ処理などを実装していると、変更を加えたFunctionsのみをデプロイしたいときがありますよね。

Functionsのデプロイは意外と時間がかかることがあるので、更新したいものだけを以下のコマンドでさっとデプロイできて嬉しいです。

```bash
firebase deploy --only functions:<function_name>
```
`<function_name>`にデプロイしたいFunction名を入れます。


例: `addMessage`というFunctionをデプロイしたい場合
```bash
firebase deploy --only functions:addMessage
```


### 参考
[https://firebase.google.com/docs/cli/targets](https://firebase.google.com/docs/cli/targets)

