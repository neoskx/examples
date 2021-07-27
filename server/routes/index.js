const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const router = express.Router();
const TEMPLATE_FOLDER_NAME = "template";

function readMetadataJSON() {
    const appsDistPath = path.join(__dirname, "../../appsdist");
    const appsPath = path.join(__dirname, "../../apps");
    console.log(`appsDistPath: ${appsDistPath}`);
    console.log(`appsPath: ${appsPath}`);
    let metadata = [];
    if (fs.existsSync(appsDistPath)) {
        const apps = fs.readdirSync(appsDistPath);
        for (let i = 0; i < apps.length; i++) {
            if (apps[i] !== TEMPLATE_FOLDER_NAME) {
                let packageJSONPath = path.join(appsPath, apps[i], "package.json");
                console.log(`App packageJSONPath: ${packageJSONPath}, apps[i]: ${apps[i]}`);
                if (fs.existsSync(packageJSONPath)) {
                    let packageJSON = fs.readJSONSync(packageJSONPath);
                    let url = "";
                    if (fs.existsSync(path.join(appsDistPath, apps[i], "index.html"))) {
                        url = `/${apps[i]}`;
                    }
                    metadata.push({
                        name: packageJSON.displayName || packageJSON.name,
                        description: packageJSON.description,
                        keywords: packageJSON.keywords,
                        url,
                    });
                }
            }
        }
    }

    return metadata;
}

/* GET home page. */
router.get("/", function (req, res, next) {
    const packageJSONPath = path.join(__dirname, "../../package.json");
    const packageJSON = fs.readJSONSync(packageJSONPath);
    console.log(`packageJSONPath: ${packageJSONPath}`);
    res.render("index", {
        title: packageJSON.displayName || packageJSON.name || "Examples",
        description: packageJSON.description,
        homepage: packageJSON.homepage,
        keywords: packageJSON.keywords,
        appsMetadata: readMetadataJSON(),
    });
});

module.exports = router;
