---
template: BlogPost
path: /node-canvas-on-next
date: 2021-07-02T13:42:58.842Z
title: 【Vercel】node-canvasでのOGP動的生成でハマったポイント
thumbnail: /assets/sandie-clarke-0JPMHlHKos0-unsplash.jpg
---
React.jsの勉強の一環として[emoji slot](https://emoji-slot.marusho.io/)というものを作りました。

![emoji-slot](/assets/IMG_0745.jpg "emoji-slot")

機能の一つとして、twitterでつぶやいた際にOGP画像を動的に生成しています。

![twitter](/assets/スクリーンショット 2021-07-04 22.34.33.png "twitter")

仕組みとしては、パラメータに絵文字を入れるとOGP画像を生成するAPIが叩かれ、バイナリファイルが返ってきます。

以下の記事の案6として挙げられている方法で実装しています。（とても参考になりました）

[絶対にお金を払いたくない精神での動的OGP生成は辛い](https://blog.ojisan.io/dynamic-ogp)

[Next.jsのAPI Routes](https://nextjs.org/docs/api-routes/introduction)を利用して実装したのですが、Vercelにデプロイした際にいくつかのエラーに悩まされたので、その備忘録です。

# node-canvasをVercelにデプロイした際のエラー

## 前提

node-canvasで画像生成するAPIをVercelで動作させることを想定しています。

絵文字([twemoji](https://twemoji.twitter.com/))をnode-canvasで使用するために、[node-canvas-with-twemoji](https://www.npmjs.com/package/node-canvas-with-twemoji)というライブラリを使用しています。

実際のコードは[Github](https://github.com/marushosummers/emoji-slot)を参照ください。

## 1. libuuid.so.1 ライブラリエラー

デプロイ時に以下のようなエラーが出た場合

```shell
Error: libuuid.so.1: cannot open shared object file: No such file or directory
```

こちらは既に解決している記事がいくつかあり、デプロイ時にライブラリをinstallすることで解決できました。

package.jsonのscriptsに`now-build`を追加すると、デプロイ時に実行してくれるようです。

```js
  "scripts": {
    // 以下を追加
    "now-build": "yum install libuuid-devel libmount-devel zlib-devel && cp /lib64/{libuuid,libmount,libblkid,libz}.so.1 node_modules/canvas/build/Release/ && yarn build"
  }
```

#### 参考

[Vercel Now（旧ZEIT Now）上でnode-canvasを動かす](https://blanktar.jp/blog/2020/05/node-canvas-on-vercel-now)

## 2. ZLIB_1.2.9 not found エラー

次に以下のようなエラーが出ました。

```shell
Error: /lib64/libz.so.1: version `ZLIB_1.2.9` not found (required by /opt/nodejs/node_modules/canvas/build/Release/libpng16.so.16)
```

こちらは`node-canvas@2.6.1`に固定することで回避することができます。

現時点では[node-canvas-with-twemoji](https://www.npmjs.com/package/node-canvas-with-twemoji)を入れると`node-canvas@2.8.0`がinstallされるので、バージョン指定するように変更します。

```json
"resolutions": {
  "node-canvas-with-twemoji/canvas": "2.6.1"
}
```

#### 参考

[Error: /lib64/libz.so.1: version `ZLIB_1.2.9' not found (required by /opt/nodejs/node_modules/canvas/build/Release/libpng16.so.16) #1779](https://github.com/Automattic/node-canvas/issues/1779)

# おわりに

OGP画像はTwitterで一気に視認性が上がるので、動的に生成するしくみはとても有用だと思います。

他にもブログの各記事を生成している方もいらっしゃるようで、このブログでも実装してみようかな〜。
