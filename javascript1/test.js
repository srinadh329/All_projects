let a=0
function test(){
   let  a=1
console.log('hh',a)
}
setTimeout(() => {
console.log('hh',a)
    
}, 1000);


test()

var string ="srinadh";
var reverse = reverseBySeparator(string, '');
var reverseword = reverseBySeparator(reverse,'')
function reverseBySeparator(string){
return string.split().reverse().join();
}
var data=['srinadh', 'siva','sivasrinadh','age']
function list(data){
   if(Array.isArray(data)){
      console.log('Array');
   }
   else{
      console.log('Not an Array')
   }
}
list(data);

for (let i = 1; i <= 100; i++) {
   let f = i % 3 == 0,
     b = i % 5 == 0;
   console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
 }

 var firstWord = "Mary";
var secondWord = "12345";



function isAnagram(first, second) {
  var a = first.toLowerCase();
  var b = second.toLowerCase();
  a = a.split("").sort().join("");
  b = b.split("").sort().join("");

  
  console.log(a === b);
}
isAnagram(firstWord, secondWord); 

var foo = 'bar';
console.log(foo);
var greet ="hello", who="world";
// console.log("%s, %s!", greet, who);
console.log(`${who},${greet}` );


var number1=5;
number1=3;
console.log(number1);
var elms = ('*');
console.time('Loop time');
for (var i = 0; i < 5000; i++) {
 for (var j = 0, length = elms.length; j < length; j++) {
 // nothing to do ...
 }
}
console.timeEnd('Loop time');

console.table(['Hello', 'world']);
function reverseString(str) {
   return [...String(str)].reverse().join('');
  }
  console.log(reverseString('stackoverflow')); // "wolfrevokcats"
  console.log(reverseString(1337)); // "7331"
  console.log(reverseString([1, 2, 3])); 

  var y = 1;
  if (function f() {}) {
    y += typeof f;
  }
  console.log(y);  

  var drc=['1','2','3','5'];
var t=drc.splice(1,1)
console.log(t)