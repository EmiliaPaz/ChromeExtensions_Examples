## Scripting API Sample Extension
Explores the different ways to insert a content script using the scripting API
in MV3.

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
2. At runtime with `scripting.executeScript()`
    * Injects a script at `document_idle`. Script can be from a file or a
    JavaScript function.
3. At runtime with `scripting.registerContentScripts()`
    * Registers a script at the runtime specified. Script is a file.

#### Call order
The order depends of the call and the time it is executed. Let's go through this
example:

##### A. Scripts that run statically are the first ones to run. 
1. `scripting.registerContentScripts()` at `document_end` from background.js
(purple)
2. content script from manfiest.json (yellow)
3. `scripting.registerContentScripts()` at `document_idle` from background.js
(orange)

The website will have orange background because it was the last script to run.

##### B. Scripts that run programatically by the extension
4. `scripting.executeScript()` 
    * from file from popup.js (green)
    * from js function from popup.js (red)

Each script will run whenever it's called. The website will have the color of
the last call. 

Say we click the button in the popup that registers a content script to run at
idle. Since the content script is been registered after the document finished,
it will not load. However, if we reload the website the script will be
registered.
##### C. Scripts that were registered to run after the document loaded
6. 1 repeated
7. 2 repeated
8. 3 repeated
9. `scripting.registerContentScripts()` at `document_idle` from background.js
(blue). 

The website will have blue background because it was the last script to run. If
we navigate to another website, the background will be blue because the script
was already registered.

Note that this is the case because the "blue" script is set to run at idle.
Order would change if it was set to run at document end (purpler -> blue -> 
yellow -> orange). Run at document start cannot be selected because we need the
DOM loaded to be able to change its background.