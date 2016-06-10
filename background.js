chrome.contextMenus.onClicked.addListener(function(info, tab) {
  chrome.tabs.create({windowId: +info.menuItemId, url: info.linkUrl});
  console.log(info);
});

var freshWindowList = function(currentWinId) {
  chrome.windows.getAll({populate: true, windowTypes: ['normal']},
      function(windows) {
        chrome.contextMenus.removeAll();
        windows.filter(function(win){
          return win.id !== currentWinId;
        }).forEach(function(win, idx) {
          var nTabs = win.tabs.length;
          var firstTabTitle = win.tabs[0].title;
          chrome.contextMenus.create({
            id: "" + win.id,
            title: "[" + nTabs + "] " + firstTabTitle + " (" + win.width + "x" + win.height + ")" ,
            contexts: ['link']
          });
        });
      });
};



chrome.windows.onFocusChanged.addListener(freshWindowList);


