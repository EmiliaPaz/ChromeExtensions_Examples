function createDiv(content) {
  let div = document.createElement("div");
  div.textContent = content;
  document.body.appendChild(div);
}

// User script can receive messages when 'messaging' is enabled.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  createDiv(message.text);
  sendResponse("response from user script");
})

// User script can send messages when 'messaging' is enabled.
async function sendMessage() {
  // Create button
  let button = document.createElement("button");
  button.id = "btn-us"
  button.textContent = "send message";
  document.body.appendChild(button);

  // Send message
  document.querySelector("#btn-us").addEventListener("click", async () => {
    let response = await chrome.runtime.sendMessage({text: "Hello from user script"});
    createDiv(response);
  })
}
sendMessage();
