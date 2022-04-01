## About

- Migration steps `gatsby@4` -> `nextjs@12`

## nextjsのプロジェクト作成

```sh
npx create-next-app@latest --typescript
```

## gatsbyプロジェクトからコピー準備

`そのまま引き継ぐ と 引き継ぎ(一部修正) と いったん破棄 に分ける (そのまま引き継ぐ と 引き継ぎ(一部修正)はコピー)`

- .github/workflows - そのまま引き継ぐ
- docs - そのまま引き継ぐ
- downloads/sbi - そのまま引き継ぐ
- graphcms-fragments - そのまま引き継ぐ
- img - そのまま引き継ぐ
- scripts - そのまま引き継ぐ
- 
- src/data/fx_transactions - そのまま引き継ぐ
- src/hooks/fx-reports - そのまま引き継ぐ
- src/models/fx-reports - そのまま引き継ぐ
- src/images - そのまま引き継ぐ
- src/components/fx-reports - 引き継ぎ(一部修正)
- src/components/layout.tsx - 引き継ぎ(一部修正)
- src/components/header.tsx - 引き継ぎ(一部修正)
- src/components/image.tsx - 引き継ぎ(一部修正)
- src/components/seo.tsx - 引き継ぎ(一部修正)
- src/components/layout.css - そのまま引き継ぐ
- src/components/neumorphism.css - そのまま引き継ぐ
- src/pages/fx-reports/index.mdx - そのまま引き継ぐ
- src/pages/404.tsx - いったん破棄
- src/pages/index.tsx - そのまま引き継ぐ
- package.json - 引き継ぎ(一部修正)
    - name": "fx-report",
    - "description": "A simple web application for graphical reporting your fx trading history.",
    - "version": "0.1.0",
    - "author": "Eigo Fujikawa",
    - dependencies
        - "@fortawesome/fontawesome-free": "^5.15.3",
        - "@mapbox/mapbox-gl-geocoder": "4.7.0",
        - "@mdx-js/mdx": "^1.6.22",
        - "@mdx-js/react": "^1.6.22",
        - "@turf/bbox": "^6.0.1",
        - "@types/react-helmet": "^6.1.0",
        - "@types/recharts": "1.8.9",
        - "bootstrap": "^4.6.0",
        - "electron": "11.2.3",
        - "geojson": "0.5.0",
        - "graphql-request": "3.4.0",
        - "holderjs": "^2.9.9",
        - "lodash": "4.17.20",
        - "mapbox-gl": "1.13.1",
        - "moment": "2.29.1",
        - "prop-types": "^15.7.2",
        - "react": "16.13.1",
        - "react-bootstrap": "^1.4.3",
        - "react-dom": "16.13.0",
        - "react-helmet": "^6.1.0",
        - "react-map-gl": "5.3.8",
        - "react-qr-code": "^1.1.1",
        - "recharts": "^2.0.4",
        - "tsc": "^1.20150623.0",
        - "typescript": "3.7.2",
        - "postcss": "8.4.12"
    - "devDependencies":
        - "@typescript-eslint/eslint-plugin": "^4.19.0",
        - "@typescript-eslint/parser": "^4.19.0",
        - "eslint": "^7.23.0",
        - "eslint-plugin-import": "^2.22.1",
        - "eslint-plugin-jsx-a11y": "^6.4.1",
        - "eslint-plugin-react": "^7.23.1",
        - "eslint-plugin-react-hooks": "^4.2.0",
        - "prettier": "2.2.1"
    - scripts
        - "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
        - "lint": "eslint --quiet --config .eslintrc.js src/",
        - "lint:fix": "eslint --fix --quiet --config .eslintrc.js src/"
    - "repository"
        - "type": "git",
        - "url": "https://github.com/Eigo-Mt-Fuji/fx-report"
    - "bugs":
        - "url": "https://github.com/Eigo-Mt-Fuji/fx-report/issues"
    - "engines":
        - "node": ">=15"
- README.md
    - 基本的にそのまま引き継ぎ

- gatsby-pluginの代わりのパッケージを導入
  - gatsby-plugin-mdx - https://nextjs.org/docs/advanced-features/using-mdx#setup-nextmdx-in-nextjs
  - gatsby-plugin-google-tag - https://panda-program.com/posts/nextjs-google-analytics
    - @types/gtag.js

    - pages/_app.js

        import Head from "next/head";
        import React from 'react'

        import { GA_ID, existsGaId } from '../src/lib/gtag'

        const App = ({ Component, pageProps }) => {
            return (
                <>
                <Head>
                    {/* Google Analytics */}
                    {existsGaId && (
                    <>
                        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
                        <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}', {
                                page_path: window.location.pathname,
                            });`,
                        }}
                        />
                    </>
                    )}
                </Head>

                <Component {...pageProps} />
                </>
            )
        }

        export default App

    - src/lib/gtag.js
        export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

        // IDが取得できない場合を想定する
        export const existsGaId = GA_ID !== ''

        // PVを測定する
        export const pageview = (path) => {
        window.gtag('config', GA_ID, {
            page_path: path,
        })
        }

        // GAイベントを発火させる
        export const event = ({action, category, label, value = ''}) => {
        if (!existsGaId) {
            return
        }

        window.gtag('event', action, {
            event_category: category,
            event_label: JSON.stringify(label),
            value,
        })
        }

  - gatsby-plugin-react-helmet
    - https://nextjs.org/docs/migrating/from-gatsby#search-engine-optimization
      - react-helmet
  - gatsby-plugin-netlify
    - https://github.com/netlify-templates/next-netlify-starter/blob/main/package.json#L16
      -     "@netlify/plugin-nextjs": "^4.2.5"

- 取引実績CSVをstaticPropsに変換する処理を実装する(gatsby-transformer-csvの代わりをつくる)
  - pageに、getStaticProps関数を実装
  - transformCsv関数(model)を実装
    - getStaticProps関数で取得したCSVファイルのデータを各componentに橋渡しする

- gatsby依存箇所の置換
  - 特にImageコンポーネントやgatsby-transformer-csv前提のgraphqlタグ使用箇所

- eslint設定
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "overrides": [
        {
        "files": ["*.ts", "*.tsx"],
        "rules": {
            "quotes": ["error", "single"]
        }
        }
    ],
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 0,
        '@typescript-eslint/no-var-requires': 0
    },
    "settings": {
        "react": {
        "createClass": "createReactClass",
        "pragma": "React",
        "fragment": "Fragment",
        "version": "detect",
        "flowVersion": "0.53"
        }
    }

- gatsby-node.js onCreateWebpackConfigイベント実装をnextjs仕様に置き換える
  - https://github.com/Eigo-Mt-Fuji/fx-report/blob/master/#L38

- netlifyへの適用
  - https://github.com/netlify-templates/next-netlify-starter
  - Build command - yarn build
  - Publish directory - public/

- ボーナス: 良所・雑学を整理する
  - Renovate
    - Get automated Pull Requests to update your dependencies
      - https://github.com/renovatebot/renovate
  - jsconfig.jsonはtsconfig.jsonの子孫
    - https://code.visualstudio.com/docs/languages/jsconfig
        - configuration file for TypeScript: tsconfig.json
        - configuration file for Javascript: jsconfig.json
  - eslint-plugin-react-hooksとは?
    - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
      - react-hooks/exhaustive-deps
        - validate dependencies of custom Hooks with the additionalHooks option
          - カスタムフックの依存関係をバリデーションするオプション
            - use this option very sparingly, if at all
          - そもそもカスタムフックの依存関係ってなに?
            - useEffectや独自に定義したカスタムフックなどReact Hooks APIの第2引数に指定される配列のことをdependencies array(=カスタムフックの依存関係)と呼ぶらしい
              - https://reactjs.org/docs/hooks-faq.html
              - https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect
        - recommend most custom Hooks to not use the dependencies argument
          - instead provide a higher-level API that is more focused around a specific use case
  -  nextjs Scriptコンポーネント
    - https://nextjs.org/docs/basic-features/script
      - 外部の JS を読み込むタイミングを簡単に制御
  - JavaScript Language Features
    - https://nextjs.org/docs/basic-features/supported-browsers-features#javascript-language-features
      - Async/await (ES2017)
      - Object Rest/Spread Properties (ES2018)
      - Dynamic import() (ES2020)
      - Optional Chaining (ES2020)
      - Nullish Coalescing (ES2020)
      - Class Fields and Static Properties (part of stage 3 proposal)
  - Lighthouse によるウェブアプリの監査
    - https://developers.google.com/web/tools/lighthouse
      - Lighthouse に監査したい URL を指定して実行すると、ページに対する集中的なテストを実行してパフォーマンスに関するレポートを生成できます
        - https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk


## 備考

- 後で修正する箇所にいれる定型文
  - <!-- TODO: replace using nextjs component or plain html component -->

- prettier vs linter 
  - https://prettier.io/docs/en/integrating-with-linters.html
    - Prettier for code formatting concerns
    - Linters for code-quality concerns
