
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const sendSelectedText = debounce((selectedText) => {
  console.log('Sending message:', selectedText); 
  if (chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ message: 'getSelectedText', selectedText }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error in sendMessage:', chrome.runtime.lastError);
      } else {
        console.log('Response received:', response); 
      }
    });
  } else {
    console.error('Chrome runtime not available');
  }
}, 300);

document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    sendSelectedText(selectedText);
  }
});




