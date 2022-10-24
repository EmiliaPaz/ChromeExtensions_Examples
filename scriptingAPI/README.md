## Scripting API Sample Extension
Explores the different ways to insert a content script using the scripting API

### Usage
1. Clone repo
2. Go to chrome://extension and upload "scriptingAPI" folder
3. The extension has different ways to insert a content script. Open the
popup and play with the different options.

### Explanation
In Manifest V3 there are multiple ways to insert scripts:
1. At install time with the manifest
    * Automatically run at install time into pages that match the given URL
    patterns.
    * Ex: website background color is yellow after installing the extension
2. At runtime with `scripting.executeScript()`
    * Injects a script at `document_idle`. Script can be from a file or a
    JavaScript function.
    * Ex: website background color changes to green or red after clicking
    the respective buttons.
3. At runtime with `scripting.registerContentScripts()`
    * Ex: website background color changes to blue after clicking the respective
    button AND reloading the page so the content script can be registered.