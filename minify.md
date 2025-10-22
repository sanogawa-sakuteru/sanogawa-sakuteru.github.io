minify
====

* Node.jsのnpmモジュールを使ってHTML, CSS, JavaScriptを軽量化・難読化する手順
    - https://qiita.com/Wakii/items/70d563fe8c0647762609


* [html-minifier](https://www.npmjs.com/package/html-minifier) → HTMLファイルの軽量化モジュール
* [clean-css-cli](https://www.npmjs.com/package/clean-css-cli) → CSSファイルの軽量化モジュール
* [uglify-es](https://www.npmjs.com/package/uglify-es) → JavaScriptファイルの難読化モジュール

インストール
```
$ npm install -g html-minifier
$ npm install -g clean-css-cli
$ npm install -g terser
```

圧縮と難解化
```
$ cleancss -o css/style.min.css css/style.css
$ uglifyjs js/main.js -c --compress --mangle --output js/main.min.js
$ terser js/main.js -c -m -o js/main.min.js

$ html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype index.html -o index.min.html
```

uglify-esは、ES2019（ES10）以前の構文までしかサポートしていません。
Babel を使って ES5 に変換してから UglifyJS にかける
```
$ npm install -g uglify-es

$ npx babel js/main.js --out-file js/main.es5.js
$ uglifyjs js/main.es5.js -c -m -o js/main.min.js
```
