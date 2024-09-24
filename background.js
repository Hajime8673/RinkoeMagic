chrome.runtime.onInstalled.addListener(function () {
    // Create context menu items for links, images, and the page
    chrome.contextMenus.create({
      id: "addLinkContextMenu",
      title: "Add Link",
      contexts: ["link"]
    });
  
    chrome.contextMenus.create({
      id: "addImageContextMenu",
      title: "Add Image Link",
      contexts: ["image"]
    });
  
    chrome.contextMenus.create({
      id: "addPageContextMenu",
      title: "Add This Page",
      contexts: ["page"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "addLinkContextMenu" && info.linkUrl) {
      // Add Link context menu item clicked
      const url = encodeURIComponent(info.linkUrl);
      openPopup(url);
    } else if (info.menuItemId === "addImageContextMenu" && info.srcUrl && (info.srcUrl.startsWith("http://") || info.srcUrl.startsWith("https://"))) {
      // Add Image Link context menu item clicked
      const imageUrl = encodeURIComponent(info.srcUrl);
      openPopup(imageUrl);
    } else if (info.menuItemId === "addPageContextMenu") {
      // Add This Page context menu item clicked for the default context menu
      const pageUrl = encodeURIComponent(tab.url);
      openPopup(pageUrl);
    }
  });
  
  function openPopup(url) {
    chrome.windows.create({
      url: `https://rinkoe.com/ext/additem?url=${url}`,
      type: "popup",
      width: 500,
      height: 700
    });
  }
  

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.url) {
        const url = encodeURIComponent(message.url);
        chrome.windows.create({
            url: `https://rinkoe.com/ext/additem?url=${url}`,
            type: "popup",
            width: 500,
            height: 700
        });
    }
});
