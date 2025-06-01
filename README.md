# 蒼煌祭「非公式」ホームページ

In Progress...

## 開発

### `npm run syncPublic`コマンド

このコマンドはgoogleドライブの蒼煌祭の画像フォルダの中身をダウンロードします。  
ローカルに存在していなかったり、ハッシュが異なるものだけをダウンロードできるようになっています。  
動かすには以下の手順が必要です。

1. Google Cloud コンソールで、Google Drive API を有効化
2. OAuthの有効化
3. [対象](https://console.cloud.google.com/auth/audience)にて、テストユーザーに自分のメアドを追加
4. ホームディレクトリ(このファイルの属する階層)に`credentials.json`を配置
5. コマンドを実行するとOAuthの許可画面が出てくるので許可する

1,2の手順は[これ](https://developers.google.com/workspace/drive/api/quickstart/nodejs?hl=ja)の通りにやるといいです。  
あと、学校アカウントではテストしていないのでご了承下さい。多分動かないです
