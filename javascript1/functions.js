// "use strict";

function addition(a, b, callback) {
    for(let a of [1,2,3,4,5]){
        let result = callback(a, b);
        console.log("The result is: " + result);
    }
   
}
var x=0;
y=1;


console.log(!this)

function callback(a, b) {
    return a + b;
}

// addition(5, 8, callback);

function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }
  
  var test=makeAdder(6)

  console.log(test(5));

  function makeFunc() {
    var name = 'Mozilla';
    console.log('srinadh')
    function displayName() {
        console.log(name)

    }
    return displayName;
  }
  
  var myFunc = makeFunc();
  myFunc();

  var newarray=[1,2,3,4,5]

  var t = newarray.map(x=>
      x=x+1
  );
  console.log(t)
  var nx= newarray.forEach(x=>{

  })
  console.log(nx)