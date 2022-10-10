import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

console.log("background loaded");

// chrome.runtime.onMessage.addListener((msg, sender) => {
//     // First, validate the message's structure.
//     if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
//         // Enable the page-action for the requesting tab.
//         // console.log(chrome.pageAction);
//         console.log({ sender });
//         chrome.pageAction.show(sender.tab.id);
//         console.log('chrome.runtime.onMessage.addListener');

//     }
// });

// // chrome.tabs.onUpdated.addListener((tabId, tab) => {
// //     const queryParameters = tab.url.split("?")[1];
// //     const urlParameters = new URLSearchParams(queryParameters);

// //     console.log({ tabId, tab });

// //     chrome.tabs.sendMessage(tabId, {
// //         type: "NEW",
// //         videoId: urlParameters.get("v"),
// //     });
// // });