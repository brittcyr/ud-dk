
try {
chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
    });
});

} catch (err) {
    console.log(err);
}