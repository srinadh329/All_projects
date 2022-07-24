// function is block of code executed when its called, resuable the same functional accross the application
// declation function keyword and function name , areguments and retrun 

// types of fucntions 4
// function with no argumenst and no return type
// fucntion with argumenst and not return type
// function with no argumenst and return type
// function with arguments and return type
let test;
function fun1(){
 test = 1
}

let test2;
function fun2(test){
    test2 = test
}
// let k = fun2(5)
// console.log(k)
// console.log(test2)

let test3;
function fun3(){
    test3=7;
    return test3;
}
// let res = fun3();
// console.log(res)

function addition(a,b){
    return a+b
}
// let res = addition(2,5);
// console.log(res)

// default values  as arguemnts
function  fun4(a=2,b){
    console.log(a,b)
    return a+b
}
// let res = fun4(undefined,3)
// console.log(res)


// unknown arguments length
function add(...arguments){
    console.log(arguments.reduce((a,b)=>a+b))
    
}
// console.log(add(2,3,4,5,6,7))

// currying technique
function fun5(a =3){
    return function(b) {
        return a+b
    }
}
// console.log(fun5()(3))

function name(l,b,h) {
    
}

function prism(l) {
    return function(w) {
    return function(h) {
    return l * w * h;
    }
    }
   }
//    let k = prism(2)
//    let j = k(3)
//    let res = j(3)
// console.log(res)

//IIFE
(function (params) {
    console.log(params)
})(2)
    


// recursive
let i=0
function printNum() {
    console.log(i+1)
    i= i+1;
    if(i<10) printNum()
}
// console.log(printNum())

// anonmus functions

let anyFunc = function (a,b) {
    return a+b
}

console.log(anyFunc(4,5))


