
/* Contains API logic. Summarizes content and sends to popup.js */

// Enter Your Open AI API Key Here: 
const API_KEY = ''; 


// function geets selected text and invokes the summarize text function 
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



// asyncronous function that interacts with Open AI API to get summary
async function summarizeText(highlightedText) {
  const prompt = `Please summarize the following text: "${highlightedText}"`;

  try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
              prompt,
              max_tokens: 100,
              temperature: 0.5
          })
      });

      const data = await response.json();
      return data.choices[0];
  } catch (err) {
      console.error('Error in async summarizeText function: ', err);
      return null;
  }
}

