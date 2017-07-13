$(function(){
          $.get('trust.txt', function(data){
              var trust = data.split('\n');
              console.log(trust);
          });
      });

$(function(){
          $.get('satire.txt', function(data){
              var satire = data.split('\n');
              console.log(satire);
          });
      });

      $(function(){
          $.get('salt.txt', function(data){
              var salt = data.split('\n');
              console.log(salt);
          });
      });

$(function(){
          $.get('false.txt', function(data){
              var fake = data.split('\n');
              console.log(fake);
          });
      });