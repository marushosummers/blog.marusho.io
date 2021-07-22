---
template: BlogPost
path: /repository-with-cloud-functions
date: 2021-07-22T06:32:07.193Z
title: 【GCP】Cloud Functionsで外部APIからデータを定期取得しCloud Storageに保存する
thumbnail: /assets/cloud-functions-eyecatch.png
---
# はじめに

定期的にAPIからデータを取得して、保存したい。

よくあるケースですが、意外と環境を用意したりcronを組んだりと大変ですよね。

扱うデータが少なかったり、SpreadSheetで管理する場合は[GAS](https://developers.google.com/apps-script?hl=ja)で実装するのが一番楽な印象です。

拡張性も考えると、Cloud Functionsで取得してStorageに溜め込むのが良さそうです。定期実行はCloud Schedulerで手軽に行えます。

以下の記事のソースコードは[Github](https://github.com/marushosummers/sample-cloud-functions-uploader)で公開してますので、参考にして頂けたら嬉しいです。

# Cloud Functionsで外部APIからデータを定期取得し、Cloud Storageに保存する

## 前提

* Python 3.7
* [Cloud SDK](https://cloud.google.com/sdk/docs/install?hl=JA)

GCPのプロジェクト、Cloud Storageのバケットは作成済みとしてスタートします。 GCPの始め方は[公式チュートリアル](https://cloud.google.com/deployment-manager/docs/step-by-step-guide/installation-and-setup)が分かりやすくてオススメです。

### 構成

![structure](/assets/cloud-functions.png "structure")

APIからのデータ取得は、[JSON Placeholder](https://jsonplaceholder.typicode.com/)をサンプルとして使います。 [/posts](https://jsonplaceholder.typicode.com/posts)で返却されるjsonを、Cloud StorageにJSONファイルとして保存するケースで実装してみましょう。

フォルダ構成は[Github](https://github.com/marushosummers/sample-cloud-functions-uploader)を参考にして頂ければと思います。

### モジュール

GCPへのデプロイ時に使用するライブラリを明記する必要があるので、まずは以下を参考に`requirements.txt`を作成してください。

```
google-cloud-storage
requests
```
<br>

## 実装

```python
# main.py

import requests
import json

from google.cloud import storage
from datetime import datetime, timedelta, timezone

API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts"
BUCKET_NAME = "test-api-data"

def data_uploader(request):
    """fetch data and upload to GCS
    """
    JST = timezone(timedelta(hours=+9), 'JST')

    data = fetcher(API_ENDPOINT)

    file_name = getFileName(datetime.now(JST))

    repository(BUCKET_NAME, file_name, data)

    return "OK"

def getFileName(time: datetime) -> str:
    return f'data_{time}.json'

def fetcher(url: str) -> str:
    """fetch api data and return json string
    """
    print(f"Access: {url}")
    response = requests.get(url)

    # Raise error if status code is not 200
    response.raise_for_status()

    data = response.json()
    return json.dumps(data)

def repository(bucket_name: str, file_name: str, data: str):
    """upload json file to GCS
    """
    # Select Bucket
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    print(f'Bucket: {bucket.name}')

    # Upload Data
    blob = bucket.blob(file_name)
    blob.upload_from_string(data, content_type='application/json')
    print(f"Uploaded: {file_name}")
```
<br>

JSON Spaceholderから取得したjsonデータを、`data_[日付].json`という形式で保存しています。

実装した関数について、軽く説明します。

<br>

#### `data_uploader`

今回はHTTPリクエストで動作する形式でCloud Functionsを実装しています。

Cloud Functionsのエンドポイントが叩かれると、この関数が実行されます。

今回は使用していませんが、`request`オブジェクトからクエリパラメータやPOSTでのオブジェクトを取得できます。

<br>

#### `fetcher`

APIからのデータ取得を行う関数です。

requestsを使ってjsonをGETするシンプルな実装になっています。 最低限のHTTP statusのハンドリングだけしています。

APIの仕様や返却されるデータの形式に合わせて変更してください。

<br>

#### `repository`

Cloud Storageへファイルをアップロードする関数です。

Cloud Storageのアップロードは[Python用Cloudクライアントライブラリ](https://cloud.google.com/python/docs/setup?hl=ja#installing_the_cloud_client_libraries_for_python)を使用します。

jsonファイルとして保存するため、`content_type='application/json'`を指定しています。

<br>

## Cloud Functionsへのデプロイ

以下のコマンドでGCPにデプロイすることができます。 デプロイされると`data-uploader`という名前でfunctionが生成されます。

```shell
# ログイン
gcloud auth login

# プロジェクトを設定
gcloud config set project <Yout Project>

# デプロイ
gcloud functions deploy data-uploader --entry-point data_uploader --runtime python37 --trigger-http
```

<br>

デプロイ時に、HTTPのエンドポイントを叩くのに認証を必要とするか聞かれます。

```
Allow unauthenticated invocations of new function [data-uploader]? 
(y/N)?
```

<br>


`y`とすると未認証を許可します。テスト用であればこちらでOKですが、誰でもエンドポイントを叩けるようになるため、それを避けたい場合は`N`にしましょう。 Cloud Schedulerを設定する際に、認証情報を持たせるため定期実行には問題ありません。

デプロイに成功すると以下のように表示されます。

```
Deploying function (may take a while - up to 2 minutes)...done.                                                                                                                                                                                                                                                              
availableMemoryMb: 256
buildId: ...
entryPoint: data_uploader
httpsTrigger:
  securityLevel: SECURE_OPTIONAL
  url: https://us-central1-<projectName>.cloudfunctions.net/<functionName>
ingressSettings: ALLOW_ALL
labels:
  deployment-tool: cli-gcloud
name: projects/...
runtime: python37
serviceAccountEmail: <projectName@appspot.gserviceaccount.com>
sourceUploadUrl: https://storage.googleapis.com/...
status: ACTIVE
timeout: 60s
updateTime: '2021-07-14T14:45:39.883Z'
versionId: '1'
```

<br>

## Cloud Schedulerの設定

スケジューラも同様にCLIから設定できます。

```shell
gcloud scheduler jobs create http daily-data-uploader --schedule="every 24 hours" --uri=<ENDPOINT> --oidc-service-account-email=<serviceAccountEmail>
```

<br>

scheduleの表記は[unix-cron構文](https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules?hl=ja)と[App-Engine cron構文](https://cloud.google.com/appengine/docs/standard/python/config/cronref?hl=ja)どちらでも動作します。

urlには、Functionsをデプロイしたときに出力された`httpsTrigger`の`url`に表示されているエンドポイントを設定します。

oidc-service-account-emailもデプロイ時に出力された`serviceAccountEmail`のアドレスを設定しましょう。

<br>

設定された時間にFunctionが実行され、Storageにファイルが保存されていれば成功です。

![result](/assets/storage-sample.png "result")



# おわりに

定期的なデータ取得 -> 保存はよく必要になるので、一度実装しておくと取得先と保存先を切り替えるだけで流用できて便利です。

AWSでLambda + S3で実装する記事は見かけるのですが、GCPで実装している記事が少なかったので今回紹介させていただきました。

Storageに貯めたデータはBigQueryに接続して分析ができるので、様々な用途にカスタマイズして使ってみてくれたら嬉しいです。
