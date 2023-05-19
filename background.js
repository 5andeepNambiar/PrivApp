// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message === 'checkPassword') {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, 'getPassword', function(response) {
//         if (chrome.runtime.lastError) {
//           sendResponse('');
//         } else if (response === '') {
//           sendResponse('');
//         } else {
//           sendResponse({ passwordExists });
//         }
//       });
//     });
//     return true;
//   }
// });

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message.cmd === 'checkPassword') {
//     chrome.storage.local.get('password', function(data) {
//       const storedPassword = data.password;
//       const passwordExists = !!storedPassword;
//       sendResponse({ passwordExists });
//     });
//     return true;
//   }
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.type === 'storePassword') {
//     chrome.storage.local.set({ password: request.password }, function() {
//       console.log('Password saved:', request.password);
//       sendResponse({ success: true });
//     });
//     return true;
//   }
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.cmd === 'openOverlay') {
//     chrome.tabs.sendMessage(sender.tab.id, { cmd: 'openOverlay' }, function(response) {
//       sendResponse({ result: 'success' });
//     });
//   } else if (request.cmd === 'unlock') {
//     chrome.tabs.sendMessage(sender.tab.id, { cmd: 'closeOverlay' });
//     sendResponse({ result: 'Overlay closed' });
//   }
//   return true; // Indicates the response will be sent asynchronously
// });


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

  return true; // Indicates the response will be sent asynchronously
});

