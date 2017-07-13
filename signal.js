$(function(){
          $.get('trust.txt', function trustArray(data){
              var trust = data.split('\n');
              console.log("Signal: " + trust.length + " trusted sites loaded");
          });
      });

$(function(){
          $.get('satire.txt', function satireArray(data){
              var satire = data.split('\n');
              console.log("Signal: " + satire.length + " satirical sites loaded");
          });
      });

      $(function(){
          $.get('salt.txt', function saltArray(data){
              var salt = data.split('\n');
              console.log("Signal: " + salt.length + " salty sites loaded");
          });
      });

$(function(){
          $.get('false.txt', function falseArray(data){
              var fake = data.split('\n');
              console.log("Signal: " + fake.length + " false sites loaded");
          });
      });



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var currentTab = tabs[0].url
    console.log("Signal: " + currentTab);
    });
}); 

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var currentTab = tabs[0].url
    console.log("Signal: " + currentTab);
    });
}); 