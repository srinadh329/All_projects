(()=>{

//1. Equal 
let a = 10;
let b='10';
console.log(a==b)
console.log(a===b)
console.log(typeof a,typeof b)
let c =20
// &&  must pass that two or more
if(a>=10 && c>19){
    console.log('pass')
}
// || atleast one case must pass

if(a>=20 || c>19){
    console.log('secong pass')
}
console.log(Number.isNaN(1*'1hfhfh'),'is Number',1*'hdh1', typeof (1*'1hfhfh'))
console.log(Number.isInteger('d'),'is Num1')
var x = "5" - 7; 
console.log(x)
let arr =[1,2,3,4];
console.log(Array.isArray(arr),arr.length);
if(arr.length >2){
    console.log('Empty')
}
let z= 20;
let y =10;

if(z != y){
    console.log('fghdhf')
}
let zz = false
console.log(!zz,'zzzzzzz')

let kk = 1
let zzz = '1'
console.log(kk !== zzz,'hhhhh')
})()