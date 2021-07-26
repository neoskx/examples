import * as bootstrap from "bootstrap";
import $ from "jquery";
import * as monaco from "monaco-editor";
import compiler from "dustjs-linkedin/lib/compiler";
import dust from "dustjs-linkedin/lib/dust";

$(function () {
    let compileAndUpdateHandler;
    // Setup editor hight;
    const windowHeight = window.innerHeight;
    const playgroundHeight = windowHeight - 400;
    document.querySelector("#dust_editor").style.height = `${playgroundHeight/2}px`;
    document.querySelector("#json_editor").style.height = `${playgroundHeight/2}px`;
    document.querySelector("#output_display").style.height = `${playgroundHeight}px`;
    const dustEditor = monaco.editor.create(document.querySelector("#dust_editor"), {
        value: `
        <input type="checkbox"{?isSelected} selected{/isSelected}>
        {?friends} {friends.length} Friends!{/friends}
        {?enemies} Oh no, enemies!{/enemies}
        `,
        language: "html",
    });

    const JSONEditor = monaco.editor.create(document.querySelector("#json_editor"), {
        value: `
        {
            "isSelected": false,
            "friends": ["Alice", "Bob"],
            "enemies": ["Oscar"]
        }`,
        language: "json",
    });

    const outputDisplay = monaco.editor.create(document.querySelector("#output_display"), {
        readOnly: true,
        language: "html"
    });

    dustEditor.onDidChangeModelContent(function (e) {
        clearTimeout(compileAndUpdateHandler);
        compileAndUpdateHandler = setTimeout(() => {
            compileAndUpdate();
        }, 1000);
    });

    JSONEditor.onDidChangeModelContent(function (e) {
        clearTimeout(compileAndUpdateHandler);
        compileAndUpdateHandler = setTimeout(() => {
            compileAndUpdate();
        }, 1000);
    });

    function compileAndUpdate() {
        let err, jsonData;
        let dustTemplate = dustEditor.getValue();
        try {
            const jsonstr = JSONEditor.getValue();
            jsonData = JSON.parse(JSONEditor.getValue() || "{}");
        } catch (e) {
            err = e;
        }
        if (!err) {
            try {
                // Compile the template under the name 'hello'
                const compiled = dust.compile(dustTemplate, "dustTemplate");
                // Register the template with Dust
                dust.loadSource(compiled);
                dust.render("dustTemplate", jsonData, function (e, out) {
                    err = e;
                    outputDisplay.getModel().setValue(out);
                });
            } catch (e) {
                err = e;
                console.error(err);
            }
        } else {
            console.error(err);
        }
    }

    compileAndUpdate();
});
