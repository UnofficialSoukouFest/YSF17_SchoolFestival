/**
 * Copyright 2022 Google LLC
 * Copyright 2025 Coelacanthiformes Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { authenticate } from "@google-cloud/local-auth";
import { defineCommand, runMain } from "citty";
import { google } from "googleapis";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import PouchDB from "pouchdb";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const POUCHDB_DBNAME = "latimeriadb";
const DEFAULT_SYNC_FILE_REGEXP = /^\.*?/;

/**
 * 実行されているディレクトリから絶対パスを取得
 * @param {string} absolve_path
 * @return {string}
 */
function resolve_path_from_cwd(absolve_path) {
  return path.join(process.cwd(), absolve_path);
}

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<import("google-auth-library").OAuth2Client | null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, { encoding: "utf8" });
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {import("google-auth-library").OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH, { encoding: "utf8" });
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 * @return {Promise<import("google-auth-library").OAuth2Client>}
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * @typedef SyncFileSchema データベースに保存するデータの形式
 * @property {*} _rev
 * @property {string} _id ファイル名
 * @property {string} hash sha256
 * @property {string} date `Date.toISOString()`したやつ
 *
 */

/**
 * @typedef SyncAgentOptions 同期するファイルの設定
 * @property {string} folderID 同期するフォルダの`fileID`
 * @property {string | RegExp} matchRule 正規表現で一致するファイルを同期のみ同期の対象とします。
 * デフォルトは`/^\.*?/`です(`.`から始まるファイル以外同期)
 * @property {boolean} force 有効にした場合、強制的にファイルをダウンロード、及び上書きします。
 * デフォルトでは、ハッシュが一致するものはダウンロードしません
 * @property {string} realSyncPath ファイルをダウンロードするディレクトリ
 */

/** @class */
class SyncAgent {
  /**
   *
   * @param {SyncAgentOptions} options
   */
  constructor(options) {
    this.options = options;
    this.db = new PouchDB(POUCHDB_DBNAME);
  }

  async setup() {
    const fileList = await fs.readdir(this.options.realSyncPath, {
      withFileTypes: true,
    });
    /** @type {string[]} */
    let filteredFileList = [];
    for await (const dirent of fileList) {
      if (!dirent.isFile()) {
        continue;
      }
      if (this.options.matchRule.test(dirent.name)) {
        filteredFileList.push(dirent.name);
      }
    }
    for (const filePath of filteredFileList) {
      const content = await fs.readFile(
        path.join(this.options.realSyncPath, filePath),
      );
      const hash = crypto.hash("sha256", content, "hex");

      try {
        /** @type SyncFileSchema */
        const localFileInfo = await this.db.get(filePath);
        /** @type SyncFileSchema */
        const doc = {
          _id: filePath,
          hash: hash,
          date: new Date().toISOString(),
          _rev: localFileInfo._rev,
        };
        await this.db.put(doc);
      } catch {
        /** @type SyncFileSchema */
        const doc = {
          _id: filePath,
          hash: hash,
          date: new Date().toISOString(),
        };
        await this.db.put(doc);
      }
    }
  }

  /**
   *
   * @param {import("googleapis").drive_v3.Drive} drive
   * @returns {Promise<void>}
   */
  async sync(drive) {
    const files = await drive.files.list({
      q: `'${this.options.folderID}' in parents`,
      fields: "files(id, name, sha256Checksum)",
    });
    if (!files.data.files) {
      return;
    }
    for (const file of files.data.files) {
      try {
        /** @type SyncFileSchema */
        const localFileInfo = await this.db.get(file.name);
        if (localFileInfo.hash === file.sha256Checksum) {
          return;
        } else {
          const GFileData = await drive.files.get({
            fileId: file.id,
            supportsAllDrives: true,
            alt: "media",
          });
          /** @type {Blob} */
          const buf = GFileData.data;
          const buffer = new Uint8Array(await buf.arrayBuffer());
          await fs.writeFile(
            path.join(this.options.realSyncPath, file.name),
            buffer,
          );
        }
      } catch {
        const GFileData = await drive.files.get({
          fileId: file.id,
          supportsAllDrives: true,
          alt: "media",
        });
        /** @type {Blob} */
        const buf = GFileData.data;
        const buffer = new Uint8Array(await buf.arrayBuffer());
        await fs.writeFile(
          path.join(this.options.realSyncPath, file.name),
          buffer,
        );
      }
    }
  }
}

/**
 * The handler
 * @param {import("google-auth-library").OAuth2Client} authClient An authorized OAuth2 client.
 * @param {string} syncDir
 * @param {string} driveId
 * @param {boolean} force
 */
async function driveHandler(authClient, syncDir, driveId, force) {
  const drive = google.drive({ version: "v3", auth: authClient });
  const agent = new SyncAgent({
    folderID: driveId,
    force: force,
    matchRule: DEFAULT_SYNC_FILE_REGEXP,
    realSyncPath: resolve_path_from_cwd(syncDir),
  });
  await agent.setup();
  await agent.sync(drive);
}

// App
const app = defineCommand({
  meta: {
    name: "getGDriveFiles",
  },
  args: {
    driveId: {
      type: "string",
      default: "1ubSpJEvVoAgLNaM3FL_sdrtP3BB5lRMz",
    },
    syncDir: {
      type: "string",
    },
    force: {
      type: "boolean",
      default: false,
    },
  },
  run({ args }) {
    authorize()
      .then((v) => driveHandler(v, args.syncDir, args.driveId, args.force))
      .catch(console.error);
  },
});

await runMain(app);
