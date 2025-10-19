How to Build
----
* 生HTMLをトップにしてると、生HTMLは「開発環境」で確認できない
* GitHub Page 用に出力先は 「public」 -> 「docs」に変更
* index.htmlの編集は「static/index.html」を編集すること

ビルド (初回のみ)
```
$ npm install
```

ビルド (public -> docsに出力)
```
$ npm run clean
$ npm run build:docs
$ npm run serve
```
windows version (Power Shell version)
```
$ npm run clean:win
$ npm run build:docs-win
$ npm run serve
```

💡 **Tips**
* デプロイ前に挙動を確認したいときは必ず
  ```bash
  gatsby build && gatsby serve
  ```
  を実行して、**本番ビルド後の静的サイト**を確認する

  ただし、gatsby標準staticディレクトリの「**public**」を参照する。  
  GitHub用に「**docs**」に出力先を変更していた場合は表示できない

  **docs**に変更していた場合は、**docs**ディレクトリを移動して、"http-sever"などのローカルHTTPサーバーを起動して確認する

  http-serverインストール
  ```
  $ npm install -g http-server
  ```
  
---

`gatsby develop` と `gatsby serve` の違いを整理すると以下のようになります👇

* gatsby develop は開発用サーバーで、実際の静的出力(public)には出力されない 
* gatsby build → public/ ディレクトリに生成されます。
* gatsby serve を使えばローカルで本番ビルドを確認できる

---

### 🧩 **1. gatsby develop**

* **用途**：開発用サーバーを立ち上げる（開発中に使う）
* **コマンド**：`gatsby develop`
* **URL**：通常 `http://localhost:8000`
* **特徴**

  * ホットリロード（変更即反映）が有効
  * ソースコードをリアルタイムに監視して、自動で再ビルド
  * ソースマップなどの開発用情報を含む
  * 環境変数 `.env.development` が使われる
* **目的**

  * 開発中にコンポーネントやデザインを即確認したいとき

---

### 🚀 **2. gatsby serve**

* **用途**：本番ビルドをローカルで確認する
* **コマンド**：

  ```
  gatsby build
  gatsby serve
  ```
* **URL**：通常 `http://localhost:9000`
* **特徴**

  * `gatsby build` で生成された静的ファイル（`public/`）を配信
  * ホットリロードはなし
  * 実際の本番サイトとほぼ同じ挙動
  * 環境変数 `.env.production` が使われる
* **目的**

  * 本番ビルド後の動作をテストしたいとき（デプロイ前の確認）

---

### 🔍 **まとめ**

| コマンド             | 目的      | 使用する環境変数           | 自動更新 | 用途       |
| ---------------- | ------- | ------------------ | ---- | -------- |
| `gatsby develop` | 開発      | `.env.development` | ✅ あり | 開発中の確認   |
| `gatsby serve`   | 本番ビルド確認 | `.env.production`  | ❌ なし | デプロイ前の確認 |

---

### 生のHTMLをトップに出したい
* 生のHTML”をトップに出したい（GatsbyのReactを通さない）
static/ 配下はビルド時にそのままサイト直下にコピーされます。
```
gatsby-project/
└── static/
    └── index.html

例: static/index.html → /index.html で配信される。
```

gatsby-node.js にリダイレクトを追加
```
// gatsby-node.js
exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: '/',           // ルートに来たら
    toPath: '/index.html',    // 生HTMLへ転送
    isPermanent: true,
    redirectInBrowser: true,
  })
}
```

index.js を名前を変更
```
gatsby-project/
└── src/
    └── pages/
        ├── index.js  -->  index_backup.js もしくは削除する
```

### gatsbyでのindex.html

static/index.html は ビルド後（gatsby build）に public/index.html にコピーされるだけで、開発サーバーでは無視されます。そのため、gatsby develop で http://localhost:8000/index.html にアクセスしても、Gatsbyはそのルートを認識せず、404ページを表示します


| 方法	              | 開発サーバーで動作 | 本番ビルドで動作   | Gatsby推奨  |
|:--------------------|:-----------------|:------------------|:-----------|
| src/pages/index.js  | ✅	           | ✅	             | ✅         |
| static/index.html   | ❌              | ⭕（ただし限定的） | ❌         |


代替プラグイン
静的コンテンツを扱いたい場合、以下のプラグインの方が一般的です
* gatsby-plugin-static-site
* gatsby-source-filesystem: ローカルファイルを読み込む
* gatsby-transformer-remark: MarkdownをHTMLに変換
* gatsby-plugin-mdx: MDXファイルをReactとして扱う


### gh-pages
gh-pagesを使う場合

初回のみ
```
$ npm install gh-pages --save-dev
```

GitHub Pageにpublicディレクトリの内容をデプロイ
```
$ gh-pages -d public
```

### GitHub Pages で Jekyll による自動変換を無効化する (.nojekyll)
リポジトリのルート（GitHub Pages のソースディレクトリ）に .nojekyll ファイルを置く

.nojekyllという名前の空ファイルを作る
```
$ touch .nojekyll
```
