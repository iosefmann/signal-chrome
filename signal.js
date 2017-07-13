$(function(){
          $.get('trust.txt', function trustArray(data){
              var trust = data.split('\n');
          });
      });

$(function(){
          $.get('satire.txt', function satireArray(data){
              var satire = data.split('\n');
          });
      });

      $(function(){
          $.get('salt.txt', function saltArray(data){
              var salt = data.split('\n');
          });
      });

$(function(){
          $.get('false.txt', function falseArray(data){
              var fake = data.split('\n');
          });
      });



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var currentTab = tabs[0].url
    });
}); 