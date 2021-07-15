---
template: BlogPost
path: /repository-with-cloud-functions
date: 2021-07-07T06:32:07.193Z
title: 【GCP】Cloud Functionsで外部APIからデータを定期取得しCloud Storageに保存する
---
# はじめに

データ分析のためにAPIから特定のデータを定期的に取得して保存したい。

定期実行って意外と面倒くさいな〜となるのですが、GCPだとCloud Schedulerが手軽に使えるので良いですね。

データ量が少なかったり、SpreadSheetで扱いたい場合は[GAS](https://developers.google.com/apps-script?hl=ja)で実装するのが楽ですが、今回は拡張性も考えてCloud Functionsで実装してみました。

以下の記事のソースコードは[Github](https://github.com/marushosummers/sample-cloud-functions-uploader)で公開してますので、参考にして頂けたら嬉しいです。

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
