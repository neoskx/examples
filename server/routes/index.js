const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const router = express.Router();
const packageJSON = require("../../package.json");
const TEMPLATE_FOLDER_NAME = "template";

function readMetadataJSON() {
    const appsDistPath = path.join(__dirname, "../../apps-dist");
    const appsPath = path.join(__dirname, "../../apps");
    let metadata = [];
    if (fs.existsSync(appsDistPath)) {
        const apps = fs.readdirSync(appsDistPath);
        for (let i = 0; i < apps.length; i++) {
            if (apps[i] !== TEMPLATE_FOLDER_NAME && apps[i] !== ".DS_Store") {
                let packageJSONPath = path.join(appsPath, apps[i], "package.json");
                let packageJSON = require(packageJSONPath);
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

    return metadata;
}

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: packageJSON.displayName || packageJSON.name || "Examples",
        description: packageJSON.description,
        homepage: packageJSON.homepage,
        keywords: packageJSON.keywords,
        appsMetadata: readMetadataJSON(),
    });
});

module.exports = router;
