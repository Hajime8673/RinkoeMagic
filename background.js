// fallback to chrome
if (typeof browser === "undefined") {
  var browser = chrome;
}

browser.runtime.onInstalled.addListener(function () {
  // Create context menu items for links, images, and the page
  browser.contextMenus.create({
      id: "addLinkContextMenu",
      title: "Add Link",
      contexts: ["link"]
  });

  browser.contextMenus.create({
      id: "addImageContextMenu",
      title: "Add Image Link",
      contexts: ["image"]
  });

  browser.contextMenus.create({
      id: "addPageContextMenu",
      title: "Add This Page",
      contexts: ["page"]
  });
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
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
  browser.windows.create({
      url: `https://rinkoe.com/ext/additem?url=${url}`,
      type: "popup",
      width: 500,
      height: 700
  }).then(window => {
      console.log('Popup window created successfully:', window);
  }).catch(error => {
      console.error('Error creating popup window:', error);
  });
}
