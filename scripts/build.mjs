#!/usr/bin/env zx

//
const appsMetaData = [];

// Import NodeJS modules
const path = await import("path"); // We can use import,

// template folder name
const TEMPLATE_FOLDER_NAME = "template";
const CURRENT_DIR = await $`pwd`;
const APPS_DIR = path.join(CURRENT_DIR.stdout, "../apps");
const APPS_DIST_DIR = path.join(CURRENT_DIR.stdout, "../apps-dist");

// Get all applications
const apps = await fs.readdirSync(APPS_DIR);
for (let i = 0; i < apps.length; i++) {
    if (apps[i] !== TEMPLATE_FOLDER_NAME&&apps[i]!=='.DS_Store') {
        await $`cd ${APPS_DIR} && cd ${apps[i]} && npm install && npm run build`;
        
        let packageJSONPath = path.join(APPS_DIR, apps[i], "package.json");
        console.log(`packageJSONPath: ${packageJSONPath}`);
        let packageJSON = require(packageJSONPath);
        appsMetaData.push({
            name: packageJSON.displayName || packageJSON.name,
            description: packageJSON.description,
            keywords: packageJSON.keywords,
            url: `/${apps[i]}`
        });

    }
}

fs.writeJSONSync(path.join(APPS_DIST_DIR, "metadata.json"), appsMetaData);
