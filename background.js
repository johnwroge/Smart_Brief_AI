

const BACKEND_URL = 'http://127.0.0.1:8000/summarize';

async function summarizeText(highlightedText) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: highlightedText }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.summary;
  } catch (err) {
    console.error('Error in async summarizeText function:', err);
    return 'Error summarizing text';
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'getSelectedText') {
    const highlightedText = request.selectedText;

    summarizeText(highlightedText)
      .then(summary => {
        chrome.runtime.sendMessage({
          action: 'displaySummary',
          data: { summary }
        });
        sendResponse({ success: true });
      })
      .catch(err => {
        console.error('Error in background.js:', err);
        sendResponse({ success: false, error: err.message });
      });
    return true;
  }
});
