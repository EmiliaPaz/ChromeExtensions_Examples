chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install" || details.reason === "update") {
    console.log("user script registered");
    chrome.userScripts.configureWorld({messaging: true});
    await chrome.userScripts.register([
      // Script removes example.com contents, so we can clearly see divs inserted.
      { id: "code", matches: ["https://example.com/*"], js: [{code: "document.body.innerHTML = \"\"; "}]},
      // Scripts that sends/receives messages to popup and background script.
      { id: "file", matches: ["*://*/*"], js: [{ file: "user_script.js" }] },
    ]);
  }
});

// Background scrip can receive messages from user script and respond them.
chrome.runtime.onUserScriptMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  sendResponse('response from background script');
});
