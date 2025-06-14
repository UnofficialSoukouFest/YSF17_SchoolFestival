#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import { authorize, authorizeAuto, driveHandler } from "../index.js";

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
        noOAuth: {
            type: "boolean",
            default: false,
        },
    },
    run({ args }) {
        if (!args.noOAuth) {
            authorize()
                .then((v) => driveHandler(v, args.syncDir, args.driveId, args.force))
                .catch(console.error);
        } else {
            authorizeAuto()
                .then((v) => {
                    driveHandler(v, args.syncDir, args.driveId, args.force);
                })
                .catch(console.error);
        }
    },
});

await runMain(app);
