---
template: BlogPost
path: /repository-with-cloud-functions
date: 2021-07-07T06:32:07.193Z
title: 【GCP】Cloud Functionsで外部APIからデータを定期取得しCloud Storageに保存する
---
# Cloud Functionsで外部APIからデータを定期取得し、Cloud Storageに保存する

データ分析のためにAPIから特定のデータを定期的に取得して保存したい。

意外と定期実行って面倒くさくて、どこにデプロイするかを考えなくてはいけません。

今回はBigQueryでの分析をしたかったので、GCP上に構築しました。

## 前提 
