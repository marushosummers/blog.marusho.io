---
template: BlogPost
path: /repository-with-cloud-functions
date: 2021-07-07T06:32:07.193Z
title: 【GCP】Cloud Functionsで外部APIからデータを定期取得しCloud Storageに保存する
thumbnail: /assets/cloud-functions-eyecatch.png
---
# はじめに

データ分析のためにAPIから特定のデータを定期的に取得して保存したい。

GCPでは定期実行をCloud Schedulerで手軽に使えるのが良いですね。

データ量が少なかったり、SpreadSheetで扱いたい場合は[GAS](https://developers.google.com/apps-script?hl=ja)で実装するのが楽ですが、今回は拡張性も考えてCloud Functionsで実装してみました。

以下の記事のソースコードは[Github](https://github.com/marushosummers/sample-cloud-functions-uploader)で公開してますので、参考にして頂けたら嬉しいです。

# Cloud Functionsで外部APIからデータを定期取得し、Cloud Storageに保存する

## 前提

* Python 3.7
* [Cloud SDK](https://cloud.google.com/sdk/docs/install?hl=JA)

GCPのプロジェクト、Cloud Storageのバケットは作成済みとしてスタートします。 GCPの始め方は[公式チュートリアル](https://cloud.google.com/deployment-manager/docs/step-by-step-guide/installation-and-setup)が分かりやすくてオススメです。

## 構成

![structure](/assets/cloud-functions.png "structure")

APIからデータ取得するサンプルとして、[JSON Placeholder](https://jsonplaceholder.typicode.com/)を使います。

[/posts](https://jsonplaceholder.typicode.com/posts)で返却されるjsonを、Cloud StorageにJSONファイルとして保存します。

## APIからのデータ取得

## Google Storageへのアップロード

## HTTPリクエストで動作するようにする

## Cloud Functionsへのデプロイ

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

## Cloud Schedulerの設定

```
Allow unauthenticated invocations of new function [data-uploader]? 
(y/N)?  N
```

# おわりに
