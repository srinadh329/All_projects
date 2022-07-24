// write a function shoud acept a, b and return the  multiplication of both
function multi(a,b){
    return a*b;
}
console.log(multi(2,3))

let arr =[{name:'venkatesh',sub1:20,sub2:45,sub3:54},
{name:'srinadh',sub1:30,sub2:33,sub3:56},{name:'srinu',sub1:50,sub2:45,sub3:56}]
// write a function to accept the above array and should result the array with add total and pass status

function array(data){
return data.map(x=>{
    x.total = x.sub1+x.sub2+x.sub3;
    x.status = x.sub1 >25 && x.sub2>25 && x.sub2>25 ?   "pass" : "fail";
    return x
})
}
let rest = array(arr)
console.log('erjhhe',rest)
// write a function should accept n number of arguments should return the max value of that arguments

function maxValue(...arguments){
    console.log(Math.max(...arguments))
}
maxValue(2,4,5,23,453,45,45,675,345,3453)

// write a function addition with currying technique

function add(a){
    return function (b){
        return a+b
    }
}
let k = add(2)
let res = k(3)
console.log(res)
