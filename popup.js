//fallback to chrome
if (typeof browser === "undefined") {
  var browser = chrome;
}

document.getElementById("addThisPage").addEventListener("click", function () {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const url = encodeURIComponent(tabs[0].url);
      browser.windows.create({
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
  if (customLink !== "" && (customLinkInput.value.startsWith("http://") || customLinkInput.value.startsWith("https://"))) {
      browser.windows.create({
          url: `https://rinkoe.com/ext/additem?url=${customLink}`,
          type: "popup",
          width: 500,
          height: 700
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
