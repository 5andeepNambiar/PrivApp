chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.cmd === 'checkPassword') {
    chrome.storage.local.get('password', function(data) {
      const storedPassword = data.password;
      const passwordExists = !!storedPassword;
      sendResponse({ passwordExists });
    });
  } else if (request.cmd === 'storePassword') {
    chrome.storage.local.set({ password: request.password }, function() {
      console.log('Password saved:', request.password);
      sendResponse({ success: true });
    });
  } else if (request.cmd === 'openOverlay') {
    chrome.tabs.sendMessage(sender.tab.id, { cmd: 'openOverlay' }, function(response) {
      sendResponse({ result: 'success' });
    });
  } else if (request.cmd === 'unlock') {
    chrome.tabs.sendMessage(sender.tab.id, { cmd: 'closeOverlay' });
    sendResponse({ result: 'Overlay closed' });
  }

  return true; 
});

