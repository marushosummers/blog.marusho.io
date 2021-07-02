---
template: BlogPost
path: /withings-api-with-postman
date: 2021-07-02T07:16:07.517Z
title: 【Postman】Withings APIで体重を取得する
---
Withingsの体重計は自動で体重を記録し、アプリやWebでいつでも見ることができます。

whitingsは記録したヘルスデータをAPI経由で取得できるので、

最近では、これを使って自分のヘルスデータを公開するページを作ったりしてました。

open marusho

今回は、Withings API経由で自分の体重を取得した際のメモを書き残そうと思います。

[Withings | スマートスケール、ウォッチ、ヘルスモニター](https://www.withings.com/jp/ja/)

[Body Composition Smart Scales by Withings](https://www.withings.com/jp/ja/scales)

## Postmanをインストール

## Withingsのアカウントを作成

[Withings Healthmate](https://healthmate.withings.com/)

アプリなどで自分の体重を確認する際に登録している場合が多いかと思います。

## Withings Developer登録

[My account](https://account.withings.com/partner/add_oauth2)

APIを利用するためにWithings Developerとしてパートナー登録をします。

設定値は以下のようにしました

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f3a54e4-d495-406f-8de9-0ff38816ee5d/_2021-07-02_15.51.24.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f3a54e4-d495-406f-8de9-0ff38816ee5d/_2021-07-02_15.51.24.png)

Postmanで利用するため、コールバックURLにはhogehogeを入力します。

これを入れることによって、Postman経由でOAuth2.0認証を利用し、Access Tokenを取得することができます。

## Postmanを叩いてみる

APIドキュメントを参考にしながら体重を取得していきます。

2021年7月2日時点で、公式からPostmanのドキュメントが配布されています。
