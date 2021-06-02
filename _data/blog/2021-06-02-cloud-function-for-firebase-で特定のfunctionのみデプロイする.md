---
template: BlogPost
path: /deploy-cloud-function
date: 2021-06-02T05:05:05.791Z
title: Cloud Function for Firebase で特定のfunctionのみデプロイする
thumbnail: /assets/fire.jpg
---
```bash
firebase deploy --only functions:<function_name>
```
特定のfunctionのみをCloudFunctionにデプロイしたいときはこちら

全てをデプロイすると時間がかかるので、デバック時に便利です

### 参考
[https://firebase.google.com/docs/cli/targets](https://firebase.google.com/docs/cli/targets)

以上です
