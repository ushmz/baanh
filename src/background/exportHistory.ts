export const exportHistories = async (histories: Array<chrome.history.HistoryItem>) => {
  const urls = histories.map(history => history.url);
  const bolb = new Blob([ urls.join('\n') ], { type: "text/plain" });
  chrome.downloads.download({
    url: window.URL.createObjectURL(bolb),
    saveAs: true,
    conflictAction: 'prompt'
  });
}
