// Option 3.a: register script from file. The script will be executed as
// specified by `runAt`.
chrome.scripting.registerContentScripts(
  [{
    id: 'inject-script-purple',
    js: ['content_script_purple.js'],
    matches: ['<all_urls>'],
    runAt: 'document_end',
    world: 'MAIN'
  }]);

chrome.scripting.registerContentScripts(
  [{
    id: 'inject-script-orange',
    js: ['content_script_orange.js'],
    matches: ['<all_urls>'],
    runAt: 'document_idle',
    world: 'MAIN'
  }]);