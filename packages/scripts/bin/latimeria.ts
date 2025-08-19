#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { authorize, authorizeAuto, driveHandler, assetsProxyHandler } from '../src'

const AssetsProxy = defineCommand({
  meta: {
    name: 'Assets Proxy Syncer',
  },
  args: {},
  run() {
    assetsProxyHandler().catch(console.error)
  },
})

const GDrive = defineCommand({
  meta: {
    name: 'Google Drive Syncer',
  },
  args: {
    driveId: {
      type: 'string',
    },
    syncDir: {
      type: 'string',
    },
    force: {
      type: 'boolean',
      default: false,
    },
    noOAuth: {
      type: 'boolean',
      default: false,
    },
  },
  run({ args }) {
    if (args.noOAuth) {
      authorizeAuto()
        .then(v => driveHandler(v, args.force))
        .catch(console.error)
    }
    else {
      authorize()
        .then(v => driveHandler(v, args.force))
        .catch(console.error)
    }
  },
})

const app = defineCommand({
  meta: {
    name: 'Latimeria Cli Tool',
  },
  subCommands: {
    gdrive: GDrive,
    assets: AssetsProxy,
  },
})

await runMain(app)
