/* Function to receive and handle messages from the background script */


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'displaySummary') {
      const summary = message.data.summary.text;
      document.getElementById('summary').textContent = summary;
    }
  });


  