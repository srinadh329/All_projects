let arr = [{name:'test1'},{name:'test2'},{name:'test3'},{name:'test4'},{name:'test6'}]
console.log(arr[0]);
console.log(arr.length);
console.log(arr[arr.length-1])
console.log(arr[Math.round((arr.length-1)/2)])
console.log(arr[(arr.length-1)/2])

// ----------------------------------------------------------------------------------------

let contac1 =[1,2], contac2=[4,5] // wrong

console.log([...contac1,...contac2])
console.log(contac1.concat(contac2))

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

let arr1 =[1,3], arr2=[4,5], ar=23  
let arr3=[...arr1,...arr2]
arr3.push(ar)
console.log(arr3)

console.log(arr1.concat(arr2,ar))

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

let  mul=[2,4,6,8,54,34]
let mul_result = mul.filter(x=>{
    return (x%2==0 && x%4==0)
})
console.log(mul_result)
// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

let arr_name=[{name:'srinadh',phone:'1234560'},{name:'venkatesh',phone:'2334444'},{name:'srinadh',phone:'3333'}];
let arr_name_result = arr_name.filter(x=>{
    return (x.name=="srinadh")
})
console.log(arr_name_result)

// ----------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------

let a = [{a:'name1',b:1,c:2},{a:'name2',b:3,c:42},{a:'name3',b:14,c:2},{a:'name5',b:1,c:2}]
let d_result = a.map(x=>{
    x.d = x.b + x.c;
    return(x)
})
console.log(d_result)

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

let phone = [{a:'name1',phone:''},{a:'name2',phone:'988766dd'},{a:'name3',phone:''},{a:'name3',phone:'123'},{a:'name3',phone:''},{a:'name3',phone:'456'}]
let phone_result = phone.every(x=>{
    return (x.phone)
})
console.log(phone_result)

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

let age = [{a:'name1',age:10},{a:'name2',age:2},{a:'name3',age:3},{a:'name3',age:30},{a:'name3',age:4},{a:'name3',age:50}]
let age_result = age.some(x=>{
    return (x.age > 18)
})
console.log(age_result)

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

let age20 = [{a:'name1',age:20},{a:'name2',age:2},{a:'name3',age:3},{a:'name4',age:25},{a:'name5',age:20}]

let age20_result = age20.find(x=>{
    return (x.age == 20)
})
console.log(age20_result)

// ----------------------------------------------------------------------------------------

let del = [{a:'name1',age:0},{a:'name2',age:20},{a:'name3',age:3}];
let index = del.findIndex(x=>x.age==20);
if(index !=-1){
    del.splice(index,1)
}
console.log(del)

// ----------------------------------------------------------------------------------------

let arr_method =[2]
arr_method.push(23)
console.log(arr_method)
arr_method.shift()
console.log(arr_method)

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------
let ins=[]

ins.push({name:"l1"},{name:"l2"})

console.log(ins)

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

let rev= [{a:'name1',age:20},{a:'name2',age:2},{a:'name3',age:3}]
rev.reverse()
console.log(rev)

// ----------------------------------------------------------------------------------------

// let dec=[2,4,6]
let [b,c,d]=[2,4,6]

console.log(b,c,d)

let aaa = [{a:'name1',age:20},{a:'name2',age:2},{a:'name3',age:3}]
let bbb = [{a:'name1',age:20},{a:'name2',age:2},{a:'name3',age:3}]

console.log(JSON.stringify(aaa)=== JSON.stringify(bbb))


let birth = [{name:'venkatesh',age:25},{name:'srinadh',age:35}]

let birth_result = birth.find(x=>{
    return x.age == 25;
    
})
console.log(birth_result.name)

let all_user = [{name:'venkatesh',age:25},{name:'srinu',age:10},{name:'srinadh',age:35}]

let all_user_result = all_user.every(x=>{
    return x.age >= 18  
})

console.log(all_user_result)

let one_user = [{name:'venkatesh',age:25,staus:'fail'},{name:'srinu',age:10,staus:'pass'},
{name:'srinadh',age:35,staus:'pass'},]

let one_user_result = one_user.find(x=>{
    return (x.staus == 'pass' && x.age >=18 ) 
})
console.log(one_user_result)

let index_pos=[{name:'venkatesh',age:25,status:'fail'},{name:'srinu',age:10,status:'pass'},{name:'srinadh',age:35,status:"pass"}]

let index_result=index_pos.findIndex(x=>{
    return x.name == 'srinadh'
})
console.log(index_result)



let list=[{id:1,name:'venkatesh',age:25,status:'fail'},
{id:2,name:'srinu',age:10,status:'pass'},
{id:3,name:'srinadh',age:35,status:"pass"}];

//delete user whose id is 2

let list_result = list.findIndex(x=> x.id == 2)
console.log(list_result)

if(list_result !=-1){
    list.splice(list_result,1);
    console.log(list)
}

let aa=[{name:'venkatesh',age:25},{name:'venkat',age:10},{name:'srinadh',age:35}]
// search name contain ven
aa.indexOf('ven');
console.log(aa)
let result = aa.filter(x=>x.name.includes('ven'));
console.log(result)




// 12-01-2022 work

let array1 = [1,2,3,45,34,433,4]; // sort that given arrow in  both asec and desc order

console.log(array1.sort((a,b)=>a-b));
console.log(array1.sort((a,b)=>b-a))

let array2 = ['a','d','c','z','w','e','y'] // sort that given array in Alphabhatical order

console.log(array2.sort((a,b)=>a.localeCompare(b)))
// console.log(array2.sort((a,b)=>a-b))

let array3 =['1','s','r','a','3','d','3','d','c','w','s','23']; // sort that given array in Alphabhatical order
console.log(array3.sort((a,b)=>a.localeCompare(b)))

let array4=[{name:'venkatesh',age:27},{name:'srinadh',age:30},{name:'apple',age:2},{name:'test2',age:23}];

// sort the given array with respect to age in both asec and desc
// sort the given array names in Alphabhatical order

console.log(array4.sort((a,b)=>a.age - b.age))
console.log(array4.sort((a,b)=>b.age - a.age))
console.log(array4.sort((a,b)=>a.name.localeCompare(b.name)))

let array5 =[{name:'shirt-sm',price:1000},
              {name:'shirt-xl',price:10},
              {name:'shirt-md',price:100},
              {name:'shirt-lg',price:500}]
 // sort the  given array price high to low and low to high
 console.log(array5.sort((a,b)=>b.price - a.price))
 console.log(array5.sort((a,b)=>a.price - b.price))

 let array6 = [{product_name:'Onion',price:20},{product_name:'cake',price:200},{product_name:'rice',price:900}]
 // calculate total price of given array
 let price_result = array6.map(x=>x.price)
 console.log(price_result)
 price_reduce_result = price_result.reduce((a,b)=>a+b)
 console.log(price_reduce_result)
 

 let array7 = [{product_name:'Onion',price:20},{product_name:'cake',price:200},{product_name:'rice',price:900}];
 // calculate min and max price using reducer
 console.log( array7.reduce((a,b)=>a>b ? a:b))
 console.log( array7.reduce((a,b)=>a>b ? b:a))

 let array8 = [{product_name:'Onion',price:20},{product_name:'cake',price:200},{product_name:'rice',price:900}];

 // get min and max price of that given array only using map,Math.max(),Math.min()
let array8_result = array8.map(x=>x.price)
// Math.max(...array8.map(x=>x.price))
console.log(array8_result)
console.log(Math.max(...array8_result))
console.log(Math.min(...array8_result))


 let array9 = [{id:2,name:'venkatesh'},{id:1,name:'srinadh'},{id:5,name:'srinu'},
 {id:4,name:'test2'},{id:3,name:'test1'},{id:6,name:'test3'}];

 // need to get only array of objects with id from  1 to 4 using slice() method

console.log(array9.sort((a,b)=>a.id-b.id).slice(0,4)) 

let array10 = [2,3,4,52,344,45];
// get min and max values for the given array

console.log(Math.max(...array10))
console.log(Math.min(...array10))
console.log(array10.reduce((a,b)=>a>b?a:b))
console.log(array10.reduce((a,b)=>b>a?a:b))

let obj = {name:'vanketesh',agee:30};
// destruct the name and age from obj;

let {name, agee=200} = obj;
console.log(agee, 'agee')

let lineItems = [
    { description: 'Eggs (Dozen)', quantity: 1, price: 3, total: 3 },
    { description: 'Cheese', quantity: 0.5, price: 5, total: 2.5 },
    { description: 'Butter', quantity: 2, price: 6, total: 12 }
  ];
  // get total amount using reducer

  console.log(lineItems.map(x=>x.price).reduce((a,b)=>a+b))

  let animals = [
    'cat', 'dog', 'alephant', 'bee', 'ant'
];
// sort the array of string based on character length 

console.log(animals.sort((a,b)=>a.length - b.length))

// 12-01-2022 work