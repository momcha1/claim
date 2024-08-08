export const saveWalletToLocalStorage = (account: string) => {
  try {
    localStorage.setItem("connectedWallet", JSON.stringify(account));
  } catch (error) {
    console.error("Failed to save wallet to localStorage:", error);
  }
};

export const saveTableToLocalStorage = (newItems: any[]) => {
  // Retrieve the existing array from local storage
  const existingItemsJson = localStorage.getItem("Leaderboard");
  let existingItems: any[] = [];

  if (existingItemsJson) {
    existingItems = JSON.parse(existingItemsJson);
  } else {
    existingItems = [];
  }

  // Append the new items to the existing array
  existingItems = [...existingItems, ...newItems];
  localStorage.setItem("Table", JSON.stringify(existingItems));
};

export const getTableFromLocalStorage = (localOffset: number) => {
  const items = localStorage.getItem("Leaderboard");
  items?.slice(localOffset, 20);
  console.log(items, "items from local storage");
  return items;
};

export const saveResultToLocalStorage = (data: any) => {
  try {
    localStorage.setItem("PayloadResult", JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to local storage");
  }
};
