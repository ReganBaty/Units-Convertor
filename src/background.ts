var isOn = "ON";

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({});
  // Next state will always be the opposite
  const nextState = prevState === "ON" ? "OFF" : "ON";

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    text: nextState,
  });

  isOn = nextState;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.onStatus != undefined) sendResponse({ status: isOn });
});
