document.getElementById("addThisPage").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = encodeURIComponent(tabs[0].url);
      chrome.windows.create({
        url: `https://rinkoe.com/ext/additem?url=${url}`,
        type: "popup",
        width: 500,
        height: 700
      });
    });
  });
  
  document.getElementById("addCustomItem").addEventListener("click", function () {
    const customLinkInput = document.getElementById("customLink");
    const customLink = encodeURIComponent(customLinkInput.value);
  
    // Check if the link input is not empty
    if (customLink !== "" && (customLink.startsWith("http://") || customLink.startsWith("https://"))) {
      chrome.windows.create({
        url: `https://rinkoe.com/ext/additem?url=${customLink}`,
        type: "popup",
        width: 500,
        height: 700
      });
    } else {
      // Change the border color to red if the link is empty
      customLinkInput.style.borderColor = "red";
  
      // You can also display an error message or take additional actions
      console.log("Link input is empty. Please enter a link.");
    }
  });
  
  // Reset the border color when the user starts typing
  document.getElementById("customLink").addEventListener("input", function () {
    this.style.borderColor = "";
  });
  