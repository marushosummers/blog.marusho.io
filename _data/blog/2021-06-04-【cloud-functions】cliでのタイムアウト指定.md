---
template: BlogPost
path: /cloud-functions-timeout
date: 2021-06-04T04:04:57.693Z
title: 【Cloud Functions】CLIでのタイムアウト指定
thumbnail: /assets/timeout.jpg
---
# Cloud Functionsのタイムアウトについて

デフォルトは60秒です。最大540秒(9分間)まで設定することができます。



## CLIでのデプロイ時に指定する方法

```shell
gcloud functions deploy FUNCTION_NAME --timeout=TIMEOUT 
```

- 実行時間を180秒(3分間)としてpythonのfunctionsをデプロイする例

```shell
gcloud functions deploy python-sample \
    --entry-point hello_python \
    --runtime python37 \
    --timeout=180
```

#### 参考

- [Cloud Functions 実行環境](https://cloud.google.com/functions/docs/concepts/exec?hl=ja#functions-concepts-after-timeout-python)
- [gcloud functions deploy](https://cloud.google.com/sdk/gcloud/reference/functions/deploy)
