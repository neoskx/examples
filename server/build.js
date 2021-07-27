const { exec, execSync } = require("child_process");
const path = require("path");
const express = require('express');

function build(app) {
    console.log('build apps');
    if (!process.env.DONT_BUILD_WHEN_START) {
        const ROOT_DIR = path.join(__dirname, '..');
        console.log("Need to build apps, path: ", ROOT_DIR);
        console.log(execSync(`node -v && npm -v`).toString());
        // execSync(`cd ${ROOT_DIR} && ls -l && npm run build-apps`).toString();
        // exec(`cd ${ROOT_DIR} && ls -l && npm run build-apps`, (error, stdout, stderr) => {
        //     if (error) {
        //         // console.log(`error: ${error.message}`);
        //         return;
        //     }
        //     if (stderr) {
        //         console.log(`stderr: ${stderr}`);
        //         app.use(express.static(path.join(__dirname, '../apps-dist')));
        //         return;
        //     }
        //     // console.log(`stdout: ${stdout}`);
        // });
    }
}

module.exports = build;
