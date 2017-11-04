/* Signal - a simple fake news checker
    © 2017 - present Joey Mann
    See license.md for more information */

// Declare variables

var Signal = {
    trust: null,
    satire: null,
    salt: null,
    fake: null,
    currentTab: null,
};

var AltCommands = {
    currentTabSans: null,
    completeURL: null
}

var sdReddit = {
    domains: null,
    selected: 0,
    trust: null,
    satire: null,
    salt: null,
    fake: null
};

// Functions to load site lists

// Web database

$(function(){
    $.get('db/web/trust.txt', function trustArray(data){
        Signal.trust = data.split('\n');
        // console.log("Signal: " + Signal.trust.length + " trusted sites loaded");
    });
});

$(function(){
    $.get('db/web/satire.txt', function satireArray(data){
        Signal.satire = data.split('\n');
        // console.log("Signal: " + Signal.satire.length + " satirical sites loaded");
    });
});

$(function(){
    $.get('db/web/salt.txt', function saltArray(data){
        Signal.salt = data.split('\n');
        // console.log("Signal: " + Signal.salt.length + " salty sites loaded");
    });
});

$(function(){
    $.get('db/web/false.txt', function falseArray(data){
        Signal.fake = data.split('\n');
        // console.log("Signal: " + Signal.fake.length + " false sites loaded");
    });
});

// reddit database

// Load list of commonly used reddit domains
$(function(){
    $.get('db/sd/reddit/sdReddit.txt', function trustArray(data){
        sdReddit.domains = data.split('\n');
        // console.log("Signal: " + sd.Reddit.domains + " reddit domains loaded");
    });
});

// Load list of subreddits
$(function(){
    $.get('db/sd/reddit/reTrust.txt', function trustArray(data){
        sdReddit.trust = data.split('\n');
        // console.log("Signal: " + sdReddit.trust.length + " trusted subreddits loaded");
    });
});

$(function(){
    $.get('db/sd/reddit/reSatire.txt', function trustArray(data){
        sdReddit.satire = data.split('\n');
        // console.log("Signal: " + sdReddit.satire.length + " satirical subreddits loaded");
    });
});

$(function(){
    $.get('db/sd/reddit/reSalt.txt', function trustArray(data){
        sdReddit.salt = data.split('\n');
        // console.log("Signal: " + sdReddit.salt.length + " salted subreddits loaded");
    });
});

$(function(){
    $.get('db/sd/reddit/reFalse.txt', function trustArray(data){
        sdReddit.fake = data.split('\n');
        // console.log("Signal: " + sdReddit.fake.length + " false subreddits loaded");
    });
});

// Functions to check current hostnames against lists

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

// Functions to check reddit

function runSignalTestReddit(){
    altGetCompleteURL();
    // console.log("Signal: Reddit detected");

    if(AltCommands.completeURL.search("/r/"+ sdReddit.trust) !== -1){
        chrome.browserAction.setIcon({path:"images/trust128.png"});
       // console.log("Signal: Icon set to 'trust");
    } else if(AltCommands.completeURL.search("/r/"+ sdReddit.satire) !== -1){
        chrome.browserAction.setIcon({path:"images/satire128.png"});
       // console.log("Signal: Icon set to 'satire");
    } else if(AltCommands.completeURL.search("/r/"+ sdReddit.salt) !== -1){
        chrome.browserAction.setIcon({path:"images/salt128.png"});
        // console.log("Signal: Icon set to 'salt");
    } else if(AltCommands.completeURL.search("/r/"+ sdReddit.fake)){
        chrome.browserAction.setIcon({path:"images/false128.png"});
        // console.log("Signal: Icon set to 'false");
    } else {
        chrome.browserAction.setIcon({path:"images/idle128.png"});
    }
}

// Function to set AltCommands

function altGetCompleteURL() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        AltCommands.completeURL = tabs[0].url.split("//")[1];
        console.log("Signal: altGetCompleteURL called; URL = " + AltCommands.completeURL);
    })
}


// Functions that listen to Chrome Tabs API for changes to the current tab, such as loading a new page (onUpdated) or changing tabs (onActivated)

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        Signal.currentTab = tabs[0].url.split("/")[2];
        AltCommands.currentTabSans = Signal.currentTab.slice(4, Signal.currentTab.length);
        if(sdReddit.domains.indexOf(Signal.currentTab) !== -1){
            runSignalTestReddit();
        } else if(Signal.currentTab.indexOf("www.") !== -1){
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
        if(sdReddit.domains.indexOf(Signal.currentTab) !== -1){
            runSignalTestReddit();
        } else if(Signal.currentTab.indexOf("www.") !== -1){
            runSignalTestWWW();
        } else {
            runSignalTest();
        }
        // console.log("Signal: " + Signal.currentTab);
        });
}); 