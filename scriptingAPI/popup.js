function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

async function runScripts() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  let greenButton = document.getElementById('green-button');
  let redButton = document.getElementById('red-button');
  let blueButton = document.getElementById('blue-button');

  // Option 1: inject static script specified in manifest at document load.

  // Option 2.a: programatically inject script from file when button is clicked.
  greenButton.addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content_script_green.js']
    });

  });

  // Option 2.b: programatically inject script from js function when button is 
  // clicked.
  redButton.addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  });

  // Option 3: register script from file when button is clicked. The script will
  // be executed next time the document loads.
  blueButton.addEventListener('click', () => {
    chrome.scripting.registerContentScripts(
      [{
        id: 'inject-script',
        js: ['content_script_blue.js'],
        matches: ['<all_urls>'],
        runAt: 'document_idle',
        world: 'MAIN'
      }]);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  runScripts();
});