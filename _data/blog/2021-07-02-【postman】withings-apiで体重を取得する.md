---
template: BlogPost
path: /withings-api-with-postman
date: 2021-07-02T07:16:07.517Z
title: 【Postman】Withings APIで体重を取得する
---
[Withings](https://www.withings.com/jp/ja/)はいろーんなヘルスデータを取得できるガジェットを出しています。

少し値段は高いですが、デザインがシンプルなのと必要最低限の機能は付いているのでお気に入りです。

[Body Composition Smart Scales by Withings](https://www.withings.com/jp/ja/scales)

Witings Bodyは、いわゆるスマート体重計です。

特徴として、記録したヘルスデータをAPI経由で取得できるので、

これを使って自分のヘルスデータを公開するページを作ったりしてました。

[open marusho](https://open.marusho.io/admin/dashboard)

Withings API経由で自分の体重を取得した際のメモを書き残そうと思います。

# Postmanを使ってWithings APIから体重を取得する

## 環境

* macOS Big Sur (M1)
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

[My account](https://account.withings.com/partner/add_oauth2)

APIを利用するためにWithings Developerとしてパートナー登録をします。



Postmanで利用するため、コールバックURLにはhogehogeを入力します。
(Web版を使うとエンドポイントが異なる可能性があります)


登録が完了すると、`Client ID`, `Client Secret`が発行されます。

これで事前準備は完了です。


## PostmanでAccess Tokenを取得する

APIドキュメントを参考にしながら体重を取得していきます。

2021年7月2日時点で、公式からPostmanのコレクションが配布されています。

### Collectionsを作成する
![postman](/assets/Postman.png)

`Collections -> 追加(+)をクリック -> Collections名を追加`

Collectionsを作っておくとAPIが整理されるので、後から使う際に助かります。



### Authorizationを設定する

インポートしたCollectionsのAuthorizationで認証情報を設定していきます。

Oauth2.0認証を利用するため、設定値は以下のようになります。

<画像>

- `Type`: OAuth2.0
- `Add auth data to`: Request URL
- `Access Tokens`: Available Tokens
- `Header Prefix`: Bearer

- `Token Name`: withings(何でも良い)
- `Grant Type`: Authorization Code
- `Callback URL`: https://oauth.pstmn.io/v1/callback (using browserにチェック)
- `Auth URL`: https://account.withings.com/oauth2_user/authorize2
- `Access Token URL`: https://account.withings.com/oauth2/token
- `Client ID`: <取得したClient ID>
- `Client Secret`: <取得したClient Secret>
- `Scope`: user.info,user.metrics,user.activity
- `State`: hoge(何でも良い)
- `Client Authentication`: Send client credentials in body
 

「Get New Access Token」を押すと、Withingsのログイン画面になります。

自分のアカウントを入力して、連携を許可するとAccess Tokenを取得できます。

（ブラウザの設定によってはポップアップブロックされるので許可する）

`use Token`をクリックすると、`Current Token`に取得されたAccess Tokenが表示されます。

### 体重を取得する

いよいよ体重を取得します。

