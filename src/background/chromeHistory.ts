let nextEndTimeToUse: number | undefined = 0;
const allItems: Array<chrome.history.HistoryItem> = [];
const itemIdToIndex: { [key: string]: unknown } = {};

function getMoreHistory(callback: Function) {
  const params: chrome.history.HistoryQuery = { text: '', maxResults: 50 };
  params.startTime = 0;
  if (nextEndTimeToUse && nextEndTimeToUse > 0) params.endTime = nextEndTimeToUse;

  chrome.history.search(params, function (items) {
    let fetched = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id in itemIdToIndex) continue;
      fetched += 1;
      allItems.push(item);
      itemIdToIndex[item.id] = allItems.length - 1;
    }
    if (items && items.length > 0) {
      nextEndTimeToUse = items[items.length - 1].lastVisitTime;
    }
    callback(fetched);
  });
  return allItems;
}

export function getAllHistories() {
  return getMoreHistory((cnt: number) => {
    if (cnt > 0) {
      getAllHistories();
    }
  });
}

export async function getHistoriesAsync(maxResults = 2000): Promise<Array<chrome.history.HistoryItem>> {
  // The way to reject safly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, _) => {
    getMoreHistory((cnt: number) => {
      if (allItems.length > maxResults || cnt <= 0) {
        resolve(allItems);
      } else {
        resolve(getHistoriesAsync(maxResults));
      }
    });
  });
}
