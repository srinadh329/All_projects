// varibale example
var a=5;
if(true){
   var a=10;
}
console.log(a);

// varibale example

// let example

let b=10;
 b=5;
if(true){
   let b=15;
}
console.log(b);
// let example

// constant example
const c=5;
//  c=8;
if(true){
    const c=10;
}
console.log(c);
// constant example

// swap two number values
function swap(a,b){
    [a, b] = [b, a];
    
    console.log(a,b)
    }
    swap(2,3) 
// swap two number values

// reverse string
function reverseString(str) {

    let newString = ""; // empty string
    for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i];
    }
    return newString;
    }
    
    console.log(reverseString("venki")) 

// reverse string

// popup method
var fruits = ["Banana", "Orange", "Apple", "Mango"];

console.log(fruits.pop());
// popup method

// push
var fruits = ["Banana", "Orange", "Apple", "Mango"];

console.log(fruits.push("siva"));
console.log(fruits);
// push

// shift
var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.shift());
console.log(fruits)
// shift

// unshift
var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.unshift('siva'));
console.log(fruits);
// unshift

// slice
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(2,4);
console.log(citrus);
// slice

// splice
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(3,0, "Lemon", "Kiwi");
console.log(fruits);
// splice




function add(m){
    return function(n){
        return function(o){
            console.log(m*n*o)
        }
    }
}
add(2)(4)(5);

