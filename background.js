const BACKEND_URL = 'http://127.0.0.1:8000/summarize';

async function summarizeText(highlightedText) {

  console.log('Received text:', highlightedText);
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: highlightedText }),
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Server error (500): The server encountered an unexpected condition');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.summary;
  } catch (err) {
    console.error('Error in summarizeText:', err);
    throw err; 
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getSelectedText') {
    summarizeText(request.selectedText)
      .then(summary => {
        chrome.runtime.sendMessage({
          action: 'displaySummary',
          data: { summary }
        });
        sendResponse({ success: true });
      })
      .catch(err => {
        console.error('Error in background.js:', err);
        chrome.runtime.sendMessage({
          action: 'displayError',
          data: { error: err.message }
        });
        sendResponse({ success: false, error: err.message });
      });
    return true; 
  }
});