

function name (test){
    return etest
}


// var test = test(()=>{

// })


let  a=10
if(true){
    let  a=5 // block scope

}
console.log(a,'gjgj');
   


let points = 50;
var winner = false; // global scope and block scope access
if(points > 40) {
  var winner = true;
}


console.log(winner)
var c=6
var c=1
let  b=10
 b=6
 const d=5
//  d=4
if(true){
    const  b=5
}
console.log(b,'db');

// test()
let  testa='abcd'
// let split =testa.split('')
var j=[]
for (var i=0;i<=testa.length;i++){
  var k = testa.charAt(i);
  console.log(k)
  j.push(k)
}
setTimeout(() => {
console.log(j)
    
}, 1000);

// spread operator
let array1=[1,5,7,9]
let array2=[3,5,5,0]

var array=[...array1,...array2]
console.log(array)

let arr1=[1,3,5];
let arr2=[2,6,7];
console.log(arr1.concat(arr2))

var testdata={
  name:"srinadh",
  age:31
}
var testdata1={
  address:'vijayawada'
}

var finaldata={...testdata,...testdata1}
console.log(finaldata)

var arrrr=[1,2,3,4,5,6,7,8,9,0]
console.log(arrrr.slice(0,6))


var drc=['1','2','3','5'];
var t=drc.splice(1,1)
console.log(t)

for(let i=0;i<=5;i++){
  if(Number(i)==4){
    continue;
    // break;
  }
  console.log(i);

}
drc.forEach((ele,index)=>{ // we cannot break
  console.log(ele,index)
})

for(let val of drc){
  console.log(val)
}

for(let val in drc){
  console.log(val)
}

var  ct={name:'test',age:26}

for(let val in ct){
  console.log(ct[val])
}
var i=0;
while(i<5){
  i++;
console.log(i);
}
var e=0;
do{
console.log(e)
e++
}while(e<=4)

// push, pop

function Person(fname, lname) {
  this.firstName = fname;
  this.lastName = lname;
}

const person = new Person('siva',"srinadh");
const person1 = new Person('ch',"venki");

console.log(person,person1)

