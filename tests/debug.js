(function(window){
  //console.time implementation for IE
  if(window.console && typeof(window.console.time) == "undefined") {
      console.time = function(name, reset){
          if(!name) { return; }
          var time = new Date().getTime();
          if(!console.timeCounters) { console.timeCounters = {} };
          var key = "KEY" + name.toString();
          if(!reset && console.timeCounters[key]) { return; }
              console.timeCounters[key] = time;
          };

      console.timeEnd = function(name){
          var time = new Date().getTime();
          if(!console.timeCounters) { return; }
          var key = "KEY" + name.toString();
          var timeCounter = console.timeCounters[key];
          if(timeCounter) {
              var diff = time - timeCounter;
              var label = name + ": " + diff + "ms";
              console.info(label);
              delete console.timeCounters[key];
          }
          return diff;
      };
  }

  var assert = function (title, expect, actual) {
    if(expect == actual)
      console.log(title + ': true');
    else
      console.log(title + ': false', 'Except:' + expect, 'Actual: ' + actual);
  };
  window.assert = assert;
})(window);
