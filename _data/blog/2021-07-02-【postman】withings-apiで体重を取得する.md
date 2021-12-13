---
template: BlogPost
path: /withings-api-with-postman
date: 2021-07-02T07:16:07.517Z
title: Withings APIで体重を取得する
thumbnail: /assets/logo_withings.png
tags: ["tech", "Withings", "Postman"]
icon: 👟
---
[Withings](https://www.withings.com/jp/ja/)はいろーんなヘルスデータを取得できるガジェットを出しています。

どれも少し値段は高いですが、デザインがシンプルなのでお気に入りです。

[Body Composition Smart Scales by Withings](https://www.withings.com/jp/ja/scales)

Witings Bodyは、いわゆるスマート体重計です。

記録したヘルスデータをAPI経由で取得できるので、

APIを活用して自分のヘルスデータを公開するページを作ったりしてます。

[open marusho](https://open.marusho.io/admin/dashboard)

![openmarusho](/assets/IMG_0741.jpg "openmarusho")

今回は、Withings API経由で自分の体重を取得した際のメモを書き残そうと思います。

# Postmanを使ってWithings APIから体重を取得する

## 環境

* macOS BigSur (M1)
* Postman(8.4.0)

## 事前準備

### Postmanをインストール

[Postman](https://www.postman.com/downloads/)

Postmanを使うと、手軽にAPIを検証できるのでおすすめです。

PostmanはWeb版とクライアント版がありますが、今回はクライアント版を利用しました。

### Withingsのアカウントを作成

[Withings Healthmate](https://healthmate.withings.com/)

Withingsのアカウントを作成します。既に登録済みの方は不要です。

### Withings Developer登録

[Withings Developer](https://account.withings.com/partner/add_oauth2)

APIを利用するためにWithings Developerとしてパートナー登録をします。

Postmanで利用するため、コールバックURLには`https://oauth.pstmn.io/v1/callback`を入力します。

 (Web版を使うとエンドポイントが異なる可能性があります)

登録が完了すると、`Client ID`, `Client Secret`が発行されます。

これで事前準備は完了です。

## PostmanでAccess Tokenを取得する

APIドキュメントを参考にしながら体重を取得していきます。

### CollectionsをImportする

2021年7月2日時点で、[公式からPostmanのコレクション](https://developer.withings.com/developer-guide/getting-started/sample-code/)が配布されています。

CollectionsのImport -> Linkで以下のURLを入れると使うことができます。

`https://raw.githubusercontent.com/withings-sas/api-oauth2-postman/master/Public_API.postman_collection.json`

![collections](/assets/Postman-8.png "collections")

### Authorizationを設定する

インポートしたCollectionsのAuthorizationで認証情報を設定していきます。

Oauth2.0認証を利用するため、設定値は以下のようになります。

![Oauth2.0](/assets/Postman-3.png "Oauth2.0")

* Type: OAuth2.0
* Add auth data to: Request URL
* Access Tokens: Available Tokens
* Header Prefix: Bearer
* Token Name: withings(何でも良い)
* Grant Type: Authorization Code
* Callback URL: https://oauth.pstmn.io/v1/callback (using browserにチェック)
* Auth URL: https://account.withings.com/oauth2_user/authorize2
* Access Token URL: https://account.withings.com/oauth2/token
* Client ID: <取得したClient ID>
* Client Secret: <取得したClient Secret>
* Scope: user.info,user.metrics,user.activity
* State: hoge(何でも良い)
* Client Authentication: Send client credentials in body

「Get New Access Token」を押すと、Withingsのログイン画面になります。

自分のアカウントを入力して、連携を許可するとAccess Tokenを取得できます。

（ブラウザの設定によってはポップアップブロックされるので許可する）

use Tokenをクリックすると、Current Tokenに取得された`Access Token`が表示されます。

### 体重を取得する

いよいよ体重を取得します。

![getmeas](/assets/Postman-5.png "getmeas")

Collectionsの`Measures -> Getmeas`のリクエストを開き、AuthorizationのTypeを`Inherit auth from parent`に設定します。 

これで先ほど取得したAccess Tokenを利用して体重を取得することができます。

![body](/assets/Postman-6.png "body")

Bodyタブからパラメータは設定します。

ドキュメントを参考に`meastype: 1`, `category: 1`とすると体重を取得できます。

[Measure - Getmeas](https://developer.withings.com/api-reference#operation/measure-getmeas)

### 結果

以下のようなJSONが返ってきたら成功です。

```json
{
    "status": 0,
    "body": {
        "updatetime": 1625217057,
        "timezone": "Asia/Tokyo",
        "measuregrps": [
            {
                "grpid": xxxxxx,
                "attrib": 0,
                "date": 1624975530,
                "created": 1624975558,
                "category": 1,
                "deviceid": "xxxxxx",
                "hash_deviceid": "xxxxxx",
                "measures": [
                    {
                        "value": 53600,
                        "type": 1,
                        "unit": -3,
                        "algo": 0,
                        "fm": 131
                    }
                ],
                "comment": null
            }
        ]
    }
}
```

<br>

`value`の値が体重ですが、`value * 10^(unit) kg`という形で提供されています。

53.6kgということで問題なく取得できていますね。



# おわりに

ヘルスデータを手軽に取得できるWeb APIは少なく、Withingsはヘルスデータを使って何か開発する際の選択肢になるかと思います。

体重計の他にも睡眠計やスマートウォッチもあり、身に付けておくだけで色々なヘルスデータを取得できます。 私は[Sleep](https://www.withings.com/jp/ja/sleep)と[Steel HR](https://www.withings.com/jp/ja/steel-hr)を愛用しています。

日々の健康を可視化したい方は、試してみてはいかがでしょうか！
