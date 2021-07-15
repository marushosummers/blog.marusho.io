---
template: BlogPost
path: /repository-with-cloud-functions
date: 2021-07-07T06:32:07.193Z
title: 【GCP】Cloud Functionsで外部APIからデータを定期取得しCloud Storageに保存する
---
# はじめに

データ分析のためにAPIから特定のデータを定期的に取得して保存したい。

意外と定期実行って面倒くさくて、どこにデプロイするかを考えなくてはいけません。

今回はBigQueryでの分析をしたかったので、GCP上に構築しました。

以下の記事はGithubに

# Cloud Functionsで外部APIからデータを定期取得し、Cloud Storageに保存する

## 前提 

- Python 3.7
- [Cloud SDK](https://cloud.google.com/sdk/docs/install?hl=JA)

GCPのプロジェクト、Cloud Storageのバケットは作成済みとしてスタートします。
GCPの始め方は[公式チュートリアル](https://cloud.google.com/deployment-manager/docs/step-by-step-guide/installation-and-setup)が分かりやすくてオススメです。

## 構成

<構成図を貼る>

APIからデータ取得するサンプルとして、[JSON Placeholder](https://jsonplaceholder.typicode.com/)を使います。

[/posts](https://jsonplaceholder.typicode.com/posts)で返却されるjsonを、Cloud StorageにJSONファイルとして保存します。


## APIからのデータ取得

## Google Storageへのアップロード

## HTTPリクエストで動作するようにする

## Cloud Functionsへのデプロイ

## Cloud Schedulerの設定

```
Allow unauthenticated invocations of new function [data-uploader]? 
(y/N)?  N
```

# おわりに
