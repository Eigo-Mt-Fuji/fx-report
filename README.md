# fx-reports

FX取引の月次レポート DIYアプリ 
`じゃりんじゃりん稼ぐぜ` 

## 概要

```mermaid
graph TD
    A[社会人] -->|お金稼ぎたい| B[FXやるしかないじゃん]
    B --> C{どのくらい稼ぐ?}
    C -->|ぼちぼち稼ぐ| D[1ヶ月30万円]
    C -->|がっつり稼ぐ| E[100万円!]
    C -->|億万長者| F[1億円ほしい!]
```

- ~~FX取引の月次レポート。Webエンジニア と 自営業(社会人)の現実課題が合わさったビターな制作物~~ 一種のジョークアプリですm(_ _)m
  - お金という人間らしいテーマで開発 -> 生きてるってすばらしいですね(謎)
  - typescript, reactでアプリ開発(自由に開発)したいという気持ちで作成
  - rechartというライブラリを使って、グラフ表示してます
    - 年間の実績を積み上げ棒グラフで表示したり、週単位(日単位)の実績(金額/pips)をグラフに表示しています
  - テストコードなどはありません。遠いめでご覧ください
- 工夫のポイントは、座標軸や凡例をカスタマイズしているのがポイントです。
  - 例えば、週の実績をグラフに出すとき、実績の金額に応じて、座標軸のメモリが変化するように実装しています
    - 座標軸の金額表記を１０万 -> １００万と指数的に増える
      - 実績金額が増えたとき、慢心せず次の目標を意識して取引を継続できるように(ドM)

- このように月次の取引成績とコメントがグラフで出ます。

![img](./src/images/thumbnail-yearly.png)

![img](./src/images/thumbnail-monthly.png)

![img](./src/images/thumbnail-daily.png)

## システム構成

* ![img](./docs/architecture.png)

* ![img](./docs/program-architecture.png)

## 技術スタック

* Frontend
  * NodeJs>=15
  * [Next.js](https://nextjs.org/), React Bootstrap, Rechart, Mapbox

* Backend
  * Netlify : https://app.netlify.com/sites/goofy-bohr-20d740/overview
  * GraphCMS : https://app.graphcms.com/a83c9f9e7dae4541a8c6e1ac08a9495f/master/settings/project
  * AWS : https://console.aws.amazon.com/route53/v2/hostedzones#ListRecordSets/Z08256261BDETXBUSKFLN
  * Github Workflow(CI) : https://github.com/Eigo-Mt-Fuji/fx-report/tree/master/.github/workflows

* Tool
  * Python
      * [validate-fx-buysell-order](./scripts/validate-fx-buysell-order.py)
        * push時にgithub上で実行・エラーを検知
      * [sbi-csv-police](https://github.com/Eigo-Mt-Fuji/fx-report/blob/master/scripts/transform-sbi-csv.py)
        * SBIのFX取引明細をサイトに反映する作業の自動化
           * https://github.com/Eigo-Mt-Fuji/fx-report/issues/5
            * downloads/sbi/ディレクトリにCSVファイルをpushする
            * github workflow上でCSV変換処理が自動実行される
            * (workflowが正常終了した場合)変換後のCSVファイルを反映するPRが生成される
  * Analytics
     * Gtag https://analytics.google.com/analytics/web/?authuser=0#/a221044200p304415269/admin/streams/table/
     * Optimize Container https://optimize.google.com/optimize/home/#/accounts/4704735488/containers/15058710

## 備考

- [資産形成能力開発の手引き〜そうだ能力を開発しよう〜](https://github.com/Eigo-Mt-Fuji/efg-confidential/issues/20)

- [FX取引ルール〜取引の心得と予算別目標ロット数〜](https://github.com/Eigo-Mt-Fuji/efg-confidential/blob/master/final_income_tax/README-FX-TRADING-RULE.md)

- [2021年1月のFX取引分析](https://github.com/Eigo-Mt-Fuji/portfolio-2021/blob/main/docs/README-%E5%80%8B%E4%BA%BA%E5%AD%A6%E7%BF%92-20210115.md#123-fx%E5%8F%96%E5%BC%95%E5%88%86%E6%9E%90-2021%E5%B9%B41%E6%9C%88)

- [経営202X　年商XX万円／資産**万円の俺を生きる](https://docs.google.com/spreadsheets/d/1_QsP0MwbVFjJtVrVvUR9tcbFUOPZIyfzReX0vniWu6E/edit#gid=84168650)
