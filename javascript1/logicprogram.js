

// input ="aahhdbbbadfxx"
// outpiut="3a2h2d3b1f2xx"

// var input ="aahhdbbbadfxx";
// let counter=0;
// let divinput=input.split('').sort();
// console.log(divinput);
// for(let i=0; i<divinput.length; i++){
//     if(divinput[i]==divinput[i+1]){
//        console.log(true)
//     }
   
// }

// trim used
var name= '   srinadh   ';
console.log(name.trim());

// trim used

// isArray method
var cars = ["Saab", "Volvo", "BMW"];
console.log(cars);
console.log(Array.isArray(cars));

// isArray method

let data = {
    company:'saab',price:'20lks',color:'red'
}
console.log(data.company);


// with calling function
var obj = {
  name:"srinadh",
  role:"522"
}

function hello(){
  console.log(this.name);
  console.log(this.role);
}
// hello.call(obj);
hello.apply(obj);
// with calling function

// general function
function add(a,b){
  return c=a+b;
}
add(2,3);
console.log(c);
// general function

// anynoms function
var addition = function (a,b){
  return c = a+b;
}
addition(5,5);
console.log(c);
// anynoms function

// arrow function
var subtraction = (a,b) =>{
  return c = a-b;
}
subtraction(15,5);
console.log(c);

// arrow function

// callback function
function fun1(cbf){
  console.log('function1');
  cbf();
}
function fun2(){
  console.log('function2');
}
fun1(fun2);

var arrowfun1 = (callfun2) => {
  console.log('arrow function1');
  callfun2();
}
var arrowfun2 = () =>{
  console.log('arrow function2');
}
arrowfun1(arrowfun2);
// callback function

// closures function
var a=10;
function first(){
  var b=20;
  function second(){
    var c=30;
    console.log(a+b+c);

  }
  second();
}
first();

// closures function


// Promiese function
var p= new Promise((reslove,reject)=>{
      var reslove=false;
      if(reslove){
        console.log("promise success");
      }
      else{
        console.log("promise reject");
      }
});
// console.log(p);
p.then((value)=>{console.log(value)})
 .catch((value)=>{console.log(value)})


// Promiese function
function multiply(n){
return function (m){
  console.log(n*m);
}

}
multiply(5)(4);

let arr = [10,9,8,7,6,5,4,3,2,1];

function swap(a) {
  for(let i = 0;i<a.length;i++) {
    for(let j=0;j<a.length;j++) {
      if(a[j] > a[j+1]) {
        let swap = a[j];
        a[j] = a[j+1];
        a[j+1] = swap; 
      }
    }
  }
  console.log(arr);
}

swap(arr);

let numberswap =[1,2,3,4,5,6,7,8,9,10];

function swapnumber(a){
  for(let i=0; i<a.length;i++){
    if(i%2==0){
      let number = a[i];
      a[i] = a[i+1];
      a[i+1] = number;
    }
  }
  console.log(numberswap);

}

swapnumber(numberswap);
// indexof
var str = "Please locate where 'locate' occurs!";
var pos = str.indexOf("locate");
console.log(pos);
// indexof

// lastindexof
var str = "Please locate where 'locate' occurs!";
var pos = str.lastIndexOf("locate");
console.log(pos);
// lastindexof

var str = "HELLO WORLD";
console.log(str.charAt(0));
// console.log(str);



(function() {
  var a = b = 5;
  })();
  
  console.log(b);

  