chrome.contextMenus.onClicked.addListener(function(info, tab) {
  chrome.tabs.create({windowId: +info.menuItemId, url: info.linkUrl});
  console.log(info);
});

var freshWindowList = function(f) {
  chrome.windows.getAll({populate: true, windowTypes: ['normal']},
      function(windows) {
        chrome.contextMenus.removeAll();
        windows.forEach(function(win, idx) {
          var nTabs = win.tabs.length;
          var firstTabTitle = win.tabs[0].title;
          f(win.id, nTabs, firstTabTitle);
        });
      });
};


var onLink = function(winId, nTabs, firstTabTitle) {
  chrome.contextMenus.create({
    id: ""+winId,
    title: "(" + nTabs + ") " + firstTabTitle ,
    contexts: ['link']
  });
};


freshWindowList(onLink);
chrome.windows.onCreated.addListener(freshWindowList(onLink));
chrome.windows.onRemoved.addListener(freshWindowList(onLink));


