console.log("content loaded");

// chrome.runtime.sendMessage({
//     from: 'content',
//     subject: 'showPageAction',
// });

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        // Collect the necessary data. 
        // (For your specific requirements `document.querySelectorAll(...)`
        //  should be equivalent to jquery's `$(...)`.)

        // Directly respond to the sender (popup), 
        // through the specified callback.

        // response(domInfo);
        response(document.getElementsByTagName("h1")[0].textContent);
    }
});


// chrome.storage.sync.set({
//     title: document.getElementsByTagName("h1")[0].textContent
// });

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import("./components/Demo");
