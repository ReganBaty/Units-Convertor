var isOn: "ON" | "OFF" = "ON";
const iconPath = "../images/";

chrome.action.onClicked.addListener(async (tab) => {
  if (isOn === "ON") {
    chrome.action.setIcon({
      path: {
        "16": iconPath + "icon-1.png",
        "32": iconPath + "icon-1.png",
      },
    });
    isOn = "OFF";
  } else {
    chrome.action.setIcon({
      path: {
        "16": iconPath + "icon-16.png",
        "32": iconPath + "icon-32.png",
      },
    });
    isOn = "ON";
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.onStatus != undefined) sendResponse({ status: isOn });
});
