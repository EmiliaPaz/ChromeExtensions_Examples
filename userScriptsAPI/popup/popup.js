function createDiv(content) {
  let div = document.createElement("div");
  div.textContent = content;
  document.body.appendChild(div);
}

// Popup can receive messages from the user script.
chrome.runtime.onUserScriptMessage.addListener((message, sender, sendResponse) => {
  createDiv(message.text);

  sendResponse("Response from popup");
});

// Popup can send messages to the user script.
document.querySelector('#btn').addEventListener("click", async () => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true});
  let response = await chrome.tabs.sendMessage(tab[0]?.id, { text: "Hello from popup"});
  createDiv(response);
});
