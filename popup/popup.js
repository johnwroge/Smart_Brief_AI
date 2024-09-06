
document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'displaySummary') {
      displaySummary(request.data.summary);
    } else if (request.action === 'displayError') {
      displayError(request.data.error);
    }
  });
});

function displaySummary(summary) {
  const summaryElement = document.getElementById('summary');
  summaryElement.textContent = summary;
  summaryElement.style.display = 'block';
  
  const errorElement = document.getElementById('error');
  errorElement.style.display = 'none';
}

function displayError(error) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = `Error: ${error}`;
  errorElement.style.display = 'block';
  
  const summaryElement = document.getElementById('summary');
  summaryElement.style.display = 'none';
}
  