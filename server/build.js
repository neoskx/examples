const { spawn, execSync } = require("child_process");
const path = require("path");
const express = require('express');

function build(app) {
    if (!process.env.DONT_BUILD_WHEN_START) {
        const ROOT_DIR = path.join(__dirname, '..');
        console.log("Need to build apps, path: ", ROOT_DIR);
        console.log(execSync(`node -v && npm -v`).toString());

        let buildApp = spawn('npm', ['run', 'build-apps'], { cwd: ROOT_DIR});

        buildApp.stdout.on('data', function (data) {
            console.log(data.toString());
        });

        buildApp.stderr.on('data', function (data) {
            console.log(data.toString());
        });

        buildApp.on('exit', function (code) {
            if(code.toString()==='0'){
                app.use(express.static(path.join(__dirname, '../appsdist')));
                console.log(`Successfully build all apps`);
                // console.log(execSync(`ls -l`, {cwd: path.join(ROOT_DIR, 'app-dist')}).toString());
            }else{
                console.error(`some error happend. error code: ${code}`);
            }
        });
    }
}

module.exports = build;
