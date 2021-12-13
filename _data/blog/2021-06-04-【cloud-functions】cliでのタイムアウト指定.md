---
template: BlogPost
path: /cloud-functions-timeout
date: 2021-06-04T04:04:57.693Z
title: 【Cloud Functions】タイムアウト時間を変更する
thumbnail: /assets/timeout.jpg
icon: 🕛
---
# Cloud Functionsのタイムアウトについて

デフォルトは60秒です。最大540秒(9分間)まで設定することができます。

## コンソール(GUI)から変更する

1. [一覧画面](https://console.cloud.google.com/functions/list)でFunctionを選択する
2. 編集をクリック

![timeout1](/assets/timeout1.png "timeout1")

3. 「ランタイム、ビルド、接続の設定」のランタイムタブのタイムアウト値を変更

![timeout2](/assets/timeout2.png "timeout2")

4. 次へ -> デプロイをクリックして完了です

## CLIで変更する

`--timeout`オプションで指定することができます

```shell
gcloud functions deploy <関数名> --timeout=<タイムアウト時間(秒)>
```

### 例) 実行時間を180秒(3分間)としてpythonのfunctionsをデプロイする例

```shell
gcloud functions deploy python-sample \
    --entry-point hello_python \
    --runtime python37 \
    --timeout=180
```

#### 参考

* [Cloud Functions 実行環境](https://cloud.google.com/functions/docs/concepts/exec?hl=ja#functions-concepts-after-timeout-python)
* [gcloud functions deploy](https://cloud.google.com/sdk/gcloud/reference/functions/deploy)
