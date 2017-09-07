/* Signal - a simple fake news checker
    © 2017 - present Joey Mann
    See license.md for more information */

var Signal = {
    trust: null,
    satire: null,
    salt: null,
    fake: null,
    currentTab: null
};

var AltCommands = {
    currentTabSans: null
}

$(function(){
          $.get('trust.txt', function trustArray(data){
              Signal.trust = data.split('\n');
              // console.log("Signal: " + Signal.trust.length + " trusted sites loaded");
          });
      });

$(function(){
          $.get('satire.txt', function satireArray(data){
              Signal.satire = data.split('\n');
              // console.log("Signal: " + Signal.satire.length + " satirical sites loaded");
          });
      });

      $(function(){
          $.get('salt.txt', function saltArray(data){
            Signal.salt = data.split('\n');
            // console.log("Signal: " + Signal.salt.length + " salty sites loaded");
          });
      });

$(function(){
          $.get('false.txt', function falseArray(data){
              Signal.fake = data.split('\n');
              // console.log("Signal: " + Signal.fake.length + " false sites loaded");
          });
      });

function runSignalTest() {
    // console.log("Signal - current working URL: " + Signal.currentTab);
    if(Signal.trust.indexOf(Signal.currentTab) !== -1) {
        chrome.browserAction.setIcon({path:"images/trust128.png"});
    } else if(Signal.satire.indexOf(Signal.currentTab) !== -1) {
        chrome.browserAction.setIcon({path:"images/satire128.png"});
    } else if(Signal.salt.indexOf(Signal.currentTab) !== -1) {
        chrome.browserAction.setIcon({path:"images/salt128.png"});
    } else if(Signal.fake.indexOf(Signal.currentTab) !== -1) {
        chrome.browserAction.setIcon({path:"images/false128.png"});
    } else {
        chrome.browserAction.setIcon({path:"images/idle128.png"});
    }
};

function runSignalTestWWW(){
    // console.log("Signal - current working URL: " + AltCommands.currentTabSans + " (www detected)");
    if(Signal.trust.indexOf(AltCommands.currentTabSans) !== -1) {
        chrome.browserAction.setIcon({path:"images/trust128.png"});
    } else if(Signal.satire.indexOf(AltCommands.currentTabSans) !== -1) {
        chrome.browserAction.setIcon({path:"images/satire128.png"});
    } else if(Signal.salt.indexOf(AltCommands.currentTabSans) !== -1) {
        chrome.browserAction.setIcon({path:"images/salt128.png"});
    } else if(Signal.fake.indexOf(AltCommands.currentTabSans) !== -1) {
        chrome.browserAction.setIcon({path:"images/false128.png"});
    } else {
        chrome.browserAction.setIcon({path:"images/idle128.png"});
    }
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    Signal.currentTab = tabs[0].url.split("/")[2];
    AltCommands.currentTabSans = Signal.currentTab.slice(4, Signal.currentTab.length);
    if(Signal.currentTab.indexOf("www.") !== -1){
        runSignalTestWWW();
    } else {
        runSignalTest();
    }
    // console.log("Signal: " + Signal.currentTab);
    });
}); 

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    Signal.currentTab = tabs[0].url.split("/")[2];
    AltCommands.currentTabSans = Signal.currentTab.slice(4, Signal.currentTab.length);
    // console.log("Signal: " + Signal.currentTab);
    if(Signal.currentTab.indexOf("www.") !== -1){
        runSignalTestWWW();
    } else {
        runSignalTest();
    }
    });
});