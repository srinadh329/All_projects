// Reverse a String Using for Loop
var name="srinadh";

function reverse(a){

    let newname="";
    for (let  i=a.length-1; i>=0; i--){
        newname+=a[i];
    }
console.log(newname);
}
reverse(name);

// Reverse a String Using for Loop

// JavaScript Program to Swap Two Variables
var a=3, b=4;

function swap(a,b){
let temp;
temp = a;
a = b;
b= temp;
console.log(a,b);
}
swap(a,b);

// .JavaScript Program to Swap Two Variables

// Generate a Random Number
function random(){
let a = Math.random();
console.log(a);
}
random();

// Generate a Random Number

// Get a Random Number between 1 and 100

function random(){ 
    const a = Math.random() * (100-1) + 1;
    console.log(a);
    
    }
    random() 
// Get a Random Number between 1 and 100

// Javascript Program to Check if a Number is Odd or Even

function check(i){
    if(i%2==0){
        console.log("even number");
    }
    else{
        console.log("odd number");
    }

}
check(2)

// Javascript Program to Check if a Number is Odd or Even

// JavaScript Program to Find the Largest Among Three Numbers

function large(n1,n2,n3){
if(n1 >= n2 && n1 >= n3){
    console.log(n1);
}
else if (n2 >=n1 && n2 >= n3){
    console.log(n2);
}
else if(n3 >= n1 && n3 >= n2){
    console.log(n3);
}
}
large(5,10,7)

// JavaScript Program to Find the Largest Among Three Numbers

var name="siva";
var name2="srinadh"

console.log(name.concat(name2));
console.log(...name,...name2);


function addition(a,b){

    return c = a*b;

}addition(2,3)
console.log(c);

var subtraction = function (c,d){
 return e = c-d;
}
subtraction(10,5)
console.log(e);

var data = () =>{

}

var a=10;

if(true){
    var a=5;
}
console.log(a)

// let example

let ab=10;
//  ab=5;
if(true){
   let ab=15;
}
console.log(ab);
// let example


// for(let i=0; i<3; i++){
// setTimeout(()=>{
//     console.log(i);
// },1000);
// }

let y = 1;
  if (function f(f){}){
    y += typeof f;
  }
  
  console.log(y);

  var k = 1;
  if (1) {
    function foo(){};
    k += typeof foo;
  }
  console.log(k);

  var output = (function(x){
    delete x;
    return x;
  })(0);
  
  console.log(output);


console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);

// for (var i = 0; i < 5; i++) {
   
// 	setTimeout(function() { console.log(i); },  1000 );
// }
// for (let i = 0; i < 5; i++) {
// 	setTimeout(function() { console.log(i); },  1000 );
// }
console.log(typeof typeof 1);

var a= [1,2,3,];
a[10] = 99;
console.log(a[6]);

var myArray = ['a','b','c','d'];
myArray.push("end");
myArray.unshift("start");
console.log(myArray);

console.log(1<2<3);
console.log(1>2>3);

var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();

var person = {
    "name":"srinadh",
    "age":"25",
    "gender":"male"
}
console.log(person);

var x = 21;
 function girl () {
    console.log(x);
    var x = 20;
}
girl ();
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);

var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);

console.log(false == '0')
console.log(false === '0')

function sum(x){
    return function sum(y){
        return x+y;
    }
}
// console.log(sum(2,3));  
console.log(sum(2)(3)); 

// (function() {
//     console.log(1); 
//     setTimeout(function(){console.log(2)}, 1000); 
//     setTimeout(function(){console.log(3)}, 0); 
//     console.log(4);
// })();
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);

// function foo1()
// {
//   return {
//       bar: "hello"
//   };
// }
function foo2()
{
  return
  {
     data:"java"
  };
}
console.log("foo1 returns:");
// console.log(foo1());
console.log("foo2 returns:");
console.log(foo2());

var n="";
console.log(n);



function fibonacci(n)
{
var x=0, y=1;
for  (var i=0;  i < n;  i++);
{
var   temp = x+y;
x  = y;
y  = temp;
}
return  x;
}console.log(x);
fibonacci(5);

