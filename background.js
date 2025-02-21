// let storedValue = null;

// // Listen for messages from content scripts
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "SET_VARIABLE") {
//     storedValue = message.value;
//     console.log("Stored Value in Background:", storedValue);
//     sendResponse({ status: "Variable stored successfully!" });
//   }
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (
//     changeInfo.status === "complete" &&
//     tab.url &&
//     tab.url.includes("linkedin.com/in/")
//   ) {
//     console.log("Original LinkedIn URL:", tab.url);

//     try {
//       let url = new URL(tab.url);

//       // Check if URL already contains required parameters
//       if (
//         url.searchParams.has("industry") &&
//         url.searchParams.has("location") &&
//         url.searchParams.has("employeeSize")
//       ) {
//         console.log("URL already updated, skipping...");
//         return; // Prevent infinite loop
//       }

//       let pathname = url.pathname; // Example: /in/amajit-gupta-854900/

//       console.log("Stored Value:", storedValue);

//       // Construct the updated URL dynamically
//       let updatedUrl = `https://www.linkedin.com${pathname}?industry=${encodeURIComponent(storedValue)}`;
      
//       console.log("Updating URL to:", updatedUrl);

//       // Update tab URL only once
//       chrome.tabs.update(tabId, { url: updatedUrl });
//     } catch (error) {
//       console.error("Error updating URL:", error);
//     }
//   }
// });


let storedValue = null;
let updatedTabs = new Set(); // Store updated tab IDs to prevent multiple updates

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SET_VARIABLE") {
    storedValue = message.value;
    console.log("Stored Value in Background:", storedValue);
    sendResponse({ status: "Variable stored successfully!" });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("linkedin.com/in/")
  ) {
    console.log("Original LinkedIn URL:", tab.url);

    try {
      let url = new URL(tab.url);

      // Check if URL already contains required parameters
      if (
        url.searchParams.has("industry") &&
        url.searchParams.has("location") &&
        url.searchParams.has("employeeSize")
      ) {
        console.log("URL already updated, skipping...");
        return;
      }

      if (updatedTabs.has(tabId)) {
        console.log("Tab already updated, skipping...");
        return;
      }

      let pathname = url.pathname; // Example: /in/amajit-gupta-854900/
      console.log("Stored Value:", storedValue);

      // Construct the updated URL dynamically
      let updatedUrl = `https://www.linkedin.com${pathname}?industry=${encodeURIComponent(storedValue)}`;
      
      console.log("Updating URL to:", updatedUrl);

      // Mark this tab as updated to prevent further updates
      updatedTabs.add(tabId);

      // Update tab URL
      chrome.tabs.update(tabId, { url: updatedUrl });
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  }
});
