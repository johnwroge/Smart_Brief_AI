/* Event Listener that selects highlighted text and sends to Background.js*/

document.addEventListener('mouseup', function(event) {
  var selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {

    chrome.runtime.sendMessage({ message: 'getSelectedText', selectedText: selectedText }, function(response) {
      if (chrome.runtime.lastError) {
        console.error('Error in sendMessage:', chrome.runtime.lastError);
      } else {
        console.log('Response from background script:', response);
      }
    });
  }
});





