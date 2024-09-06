const BACKEND_URL = 'http://127.0.0.1:8000/summarize';
const FETCH_TIMEOUT = 10000; 

async function summarizeText(highlightedText) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: highlightedText }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.summary;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Request timed out');
      return 'Error: Request timed out';
    }
    console.error('Error in summarizeText:', err);
    return `Error summarizing text: ${err.message}`;
  } finally {
    clearTimeout(timeoutId);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getSelectedText') {
    (async () => {
      try {
        const summary = await summarizeText(request.selectedText);
        await chrome.runtime.sendMessage({
          action: 'displaySummary',
          data: { summary }
        });
        sendResponse({ success: true });
      } catch (err) {
        console.error('Error in background.js:', err);
        sendResponse({ success: false, error: err.message });
      }
    })();
    return true; 
  }
});