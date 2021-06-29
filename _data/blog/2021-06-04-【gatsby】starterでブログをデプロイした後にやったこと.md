---
template: BlogPost
path: /after-build-gatsby-starter
date: 2021-06-30T13:45:02.585Z
title: 【Gatsby】Starterでブログ作成した後にやったこと 【随時更新】
thumbnail: /assets/ivan-bandura-0-no6ywKMPY-unsplash (1).jpg
---
# gatsby-starterでブログを始める

gatsby-starterは[Get your Gatsby site in 1 min.](https://app.netlify.com/start/deploy?repository=https://github.com/W3Layouts/gatsby-starter-delog)とあるように、

爆速で爆速なサイト構築ができてしまいます。

このブログもStarterを使って作成したのですが、テンプレートをそのまま使い続けるのはやっぱり寂しい。 

デザインや機能を少しずつ付け加えながら、自分流にカスタマイズするのが楽しそうです。

Wordpressでよくある機能をGatsbyで実現する方法は、検索するとたくさん出てくるので
このブログに実装するついでに、この記事にまとめていこうと思います。

## 前提

Staterは[gatsby-starter-delog](https://www.gatsbyjs.com/starters/W3Layouts/gatsby-starter-delog)を使っています。

![gatsby-starter-delog](https://www.gatsbyjs.com/static/45d87c03cb6f0403e77abca7d1e4a60c/5803e/4b40e11da7ed0cff747d11422cf63dc9.webp "gatsby-starter-delog")

他のStarterでも基本的には同じ構成かと思いますので、参考にしていただければ幸いです。

# デプロイした後にやったこと

## サイト情報の変更

ブログタイトルなどは[site-meta-data.json](https://github.com/W3Layouts/gatsby-starter-delog/blob/master/site-meta-data.json)で変更できます。

私はNetlify CMS経由で修正しましたが、直接変更しても問題ないと思います。

```site-meta-data.json
{
  "title": "ブログタイトル",
  "siteUrl": "<ブログURL>",
  "description": "ブログ概要",
  "home": {
    "title": "ホームに表示されるタイトル",
    "description": "ホームに表示される概要"
  }
}
```

ブックマーク時などに表示されるタイトルも修正するために、 [gatsby-config.js](https://github.com/W3Layouts/gatsby-starter-delog/blob/master/gatsby-config.js)も自分のブログ情報に修正します。

デフォルトでは`Delog GatbsyJS Starter`というタイトルになっています。
manifestファイルの各設定項目は[こちら](https://developer.mozilla.org/ja/docs/Web/Manifest)。

```gatsby-config.js
...
{
resolve: `gatsby-plugin-manifest`,
options: {
  name: `Delog GatbsyJS Starter`,　 // ブログタイトル 
  short_name: `Delog`,  // ホーム画面追加時のブログタイトル
  start_url: `/`, // ブログのベースURL
  background_color: `#fff`,
  theme_color: `#381696`,
  display: `standalone`,
  icon: "src/images/icon.png",
},
}
...
```

## サイトカラーの変更

デフォルトカラーでもおしゃれですが、[src/styles/global.scss](https://github.com/W3Layouts/gatsby-starter-delog/blob/master/src/styles/global.scss)を修正して自分なりに色を変えてみました。

ライトモードとダークモードが選べるStarterなので、それぞれ色を指定していきます。

```src/styles/global.scss
body.light {
  --primary-color: #381696;
  --primary-text-color: #fff;
  --featured-bg: #493b8a;
  --featured-text: #fff;
  --secondary-color: #10072b;
  --background: #fff;
  --site-header: var(--background);
  --card-bg: #fff;
  --card-bdr: #eee;
  --card-shadow: #d5d5d5;
  --btn-bg: var(--background);
  --btn-bdr: #d3d6e7;
  --btn-text-color: #868892;
  --btn-hover-bg: var(--btn-bdr);
  --btn-hover-text-color: #00062b;
  --contact-bg: #f7f8fe;
  --contact-bdr: #d3d6e7;
  --input-bg: var(--background);
}
body.dark {
  --primary-color: #9984d5;
  --primary-text-color: #fff;
  --featured-bg: #66578d;
  --featured-text: #fff;
  --secondary-color: #66578d;
  --background: #0A041A;
  --text-color: rgba(255,255,255,0.88);
  --text-secondary-color: rgba(255,255,255,0.66);
  --site-header: var(--background);
  --card-bg: #181326;
  --card-bdr: #181326;
  --card-shadow: #020204;
  --btn-bg: var(--background);
  --btn-bdr: #d3d6e7;
  --btn-text-color: #868892;
  --btn-hover-bg: var(--btn-bdr);
  --btn-hover-text-color: #00062b;
  --contact-bg: var(--card-shadow);
  --contact-bdr: var(--card-bg);
  --input-bg: var(--card-bg);
}
```

カラーを選ぶツールはたくさんあるようで。。。

[【2021年版】もう配色デザインには迷わない！すごい無料カラーパレットツール83個まとめ](https://photoshopvip.net/72189)

私は[Picular](https://picular.co/)というイメージした単語から色を提案してくれるサービスを使って、お気に入りの色を探しました。


(2021/06/30 更新)
