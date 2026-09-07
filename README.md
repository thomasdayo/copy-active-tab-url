# Copy Active Tab URL

現在のタブのURLをツールバーボタンから1クリックでコピーするChrome・Firefox対応のシンプルで軽量なブラウザ拡張機能です。

![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-88%2B-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-115%2B-FF7139?style=flat-square&logo=firefoxbrowser&logoColor=white)
![No Network](https://img.shields.io/badge/network-none-1a7f37?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-0-1a7f37?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
---
## インストール

ストア未公開のため、開発者モードでの読み込みをお願いします。

<details open>
<summary><b>🔵 Chrome / Edge</b></summary>

<br>

1. このリポジトリをダウンロードまたはクローンします
2. アドレスバーに `chrome://extensions` を入力して開きます。
3. 右上の **「デベロッパー モード」** をオンにします。
4. **「パッケージ化されていない拡張機能を読み込む」** をクリックし、`copy-active-tab-url`ディレクトリを選択します。
5. ツールバーのパズルアイコンから、この拡張機能を固定します。

</details>

<details open>
<summary><b>🟠 Firefox</b></summary>

<br>
この拡張機能は、Mozillaによって署名されたxpiとしてGitHub Releasesで配布しています。

1. [最新のリリース](../../releases/latest)を開く
2. Assetsから`copy-active-tab-url-x.x.x.xpi`をダウンロード
3. Firefoxのアドオン管理画面を開く
4. 歯車メニューから「ファイルからアドオンをインストール」を選択
5. ダウンロードしたxpiを指定

署名済みxpiは、Firefoxへインストールできます。
</details>

---

## 使い方

1. コピーしたいページを開く
2. ツールバーのアイコンをクリック
3. バッジに `OK` が出たらコピペできます

| 結果 | バッジ | 意味 |
| :--- | :---: | :--- |
| 成功 | 🟩 `OK` | URLをクリップボードへコピーしました |
| 失敗 | 🟥 `!` | URLを取得できない、またはコピーが許可されないページです |

---
## 制限

うまくいかないときはページ更新したらいけるはず！
ブラウザのセキュリティ制限により、次のようなページではコピーに失敗する場合があります。

- `chrome://`から始まるChrome内部ページ
- `about:`から始まるFirefox内部ページ
- Chromeウェブストア
- Firefoxのアドオン関連ページ
- ブラウザがスクリプト実行を禁止しているページ
- 一部の組み込みPDFビューアーや特殊なページ

コピーに失敗した場合は、ツールバーアイコンに赤色の **!** が表示されます。

---
## FAQ

<details>
<summary><b>ショートカットキーで実行できますか？</b></summary>

<br>

`manifest.json` に `commands` を追加すると割り当てられます（デフォルトでは未設定です）。

    "commands": {
      "_execute_action": {
        "suggested_key": { "default": "Alt+Shift+C" },
        "description": "現在のURLをコピー"
      }
    }

</details>

<details>
<summary><b>ページタイトルもいっしょにコピーしたいです</b></summary>

<br>

`background.js` でクリップボードへ渡している `url` を、`` `${tab.title}\n${url}` `` などに差し替えてください。`tab.title` は `activeTab` の範囲内で取得できるため、追加の権限は不要です。

</details>

<details>
<summary><b>URLからトラッキングパラメータを除去できますか？</b></summary>

<br>

可能ですが、本拡張は「URLをそのままコピーする」ことを設計方針としているため、標準では実装していません。フォークして `URL` オブジェクトで `utm_*` を削る処理を挟むのが簡単です。

</details>

<details>
<summary><b>バッジが出ません</b></summary>

<br>

拡張機能がツールバーに固定されているかご確認ください。パズルアイコン内に格納されている状態では、バッジが見えません。

</details>

---
## ライセンス

[MIT License](LICENSE)
