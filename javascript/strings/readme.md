# STRINGS
 ### string is a data type in javascript we can define  single quotes and double quotes and templateliteras
 
 ```
 let hello = 'srinadh';
 let hello = "srinadh";
 let hello = `srinadh`;
 ```
## Create String or convert string from diffterent datatypes


## String(), toString(), new String()

```
 new String : it will return construction String , value can be accessedby string.valueOf();
 
 String     : it will converting any value to the string even null and undefined.
 let a =[1,2,4,null]
    for(let a1 of a) {
        console.log(String(a1))
    }
    
 toString   : it will converting value except null and undefined properties.
```
```
string.formcharcode(): it will return the string
String.formcharcode(49): 1

```
```
charcode(): it will return the unique code when trigger the keypress of event.

```

```
test(): The test() method returns true if it finds a match, otherwise false.


```

## Concating a string
### join two variable into single variable


```
using +, contact , and string literals

let a = 'test1';
let b = 'test2';
let c = a+b;
let d = a.contact(b);
let e = `${a} ${b}`;

```
## Reverse of string

### it will return the reverse string in any value

```
    let myname='sivasrinadh'
       let n =1337
       let arry = [1,2,3]
       let arry1= String(arry)     
       console.log(typeof m)
       console.log(myname.split('').reverse().join(''));
       console.log([...String(n)].reverse().join('')); 
       console.log(arry1.split('').reverse().join('')) 

```
## Comparing Strings
### It compare strings alphabetically,it will return negative postive and zero values. if returns negative value the compare string in not alphabetically and it return postive value the compate string in alphabetically and it return zero value the reference string is same

```
    // Comparing Strings
       let fn = 'bdf';
       let sn = 'adf';
       console.log(fn==sn)  return false
       console.log(fn.localeCompare(sn))   return 1
    
    // Comparing Strings


```
## character
### It will return the character at specified index of the string
```
 let sname ="srinadh";
    console.log(sname.charAt(4)) // a

```
## trim
### It remove the white space form the both edges of a string
```
    let newname= "  srinadh    "      
    console.log(newname.trim())

```
##trimStart()
### It remove the white space at the starting of a string
```
    let newname= "  srinadh    "      
    console.log(newname.trimStart())

```
##trimEnd()
### It remove the white space at the Ending of a string
```
    let newname= "  srinadh    "      
    console.log(newname.trimEnd())

```
##slice
### It will return the extracted part of new string and it has starting position and ending postion if give starting position from the string without ending position it will return complete extract string.if give starting position and ending position it will return the starting position to ending postion before element.it will accept negative values also if give negative value the starting index position from right to left.
```
 let sname ="srinadh";
  console.log(sname.slice(2)) //  inadh
  console.log(sname.slice(2,3)) // i
   console.log(sname.slice(2,5)) // ina  
    console.log(sname.slice(-5,-1)) // inad
```
##substring

### It similar to the slice and it not accept negative values
```
     console.log(sname.substring(3,5)) // na
```
##indexof
### It will return the postion of the string and it return negative value if text is not found
```
  let format = "sivasrinadh"       
   console.log(format.indexOf('a'))    // 3

```
##lastindexof
### It will return the last postion of the string and it return negative value if text is not found
```
  let format = "sivasrinadh"       
   console.log(format.lastIndexOf('a'))    // 8

```
```
 console.log(format.lastIndexOf('.')) // it will return poistion
     console.log(format.slice(format.lastIndexOf('.'))) // it will the string
     console.log(format.replace(format.slice(format.lastIndexOf('.')),'.png')) // it will replace the string
```
##lower case
### It will return the lowercase string
```
 let low = 'SRINADH';
       console.log(low)     
       console.log(low.toLowerCase()) // srinadh
```

###upper case
### It will return the uppercase string

```
let upp ="srinadh";
    console.log(upp.toUpperCase()) //   SRINADH
```
## repeat 
### It will return repeat string number of time at particular count

```
console.log("siva".repeat(4)) // sivasivasivasiva

```
# STRINGS END



# ARRAY START
### Array is a collection of elements that can stored in contiguous memory location.

```
let arr = [2,5,9,1,8];

console.log(arr) // It will return  the  total array of elements
console.log(arr[3]) // It will return the element of the index of position // 1
console.log(arr.lenght) // It will return the lenght of the arrya // 5
console.log(arr.[arr.lenght-1]) // It will return the array of last element // 8
console.log(arr[(arr.length-1)/2]); // It will return the middle of array of element
````
### contact Array

```
let c= ['venki','srinadh'];
let d = ['javascript','angular'];

let z = c+d
console.log(z) // It will return array but not contact array of element
console.log(Array.isArray(z)) // false

```

```
let ee = ['siva', 'srinadh',]   
let dd = ['kavya', 'priya'] 
let zz = ee.concat(dd)
console.log(zz) // It will return the array  
console.log(Array.isArray(zz)) // true

```

```
let cc = [...ee , ...dd]
console.log(cc) // It will return the array
console.log(Array.isArray(cc)) // true

```

##Filters
### Based on condition it will return the new array elements and it will not change the orginal array
```
let ele =[34,5,53,55,453,54,4];

let element = ele.filter(x=>{
    return x%2 == 1;
})
console.log(element) //  5, 53, 55, 453

let list=[{name:'venki',pas:''},{name:"srinadh",pas:'123'},{name:"srinadh",pas:'123ss'}];
let name = list.filter(x=>{
    return x.name == "venki"
})
console.log(name) // { name: 'venki', pas: '' } 

```

##Map
### Based on condition it will return the new array elements and it will change the orginal array
```
let arrmap = list.map(x=>{
    x.phone='123';
    return x;
})
console.log(arrmap) // { name: 'venki', pas: '', phone: '123' },{ name: 'srinadh', pas: '123', phone: '123' },{ name: 'srinadh', pas: '123ss', phone: '123' }
console.log(list) // { name: 'venki', pas: '', phone: '123' },{ name: 'srinadh', pas: '123', phone: '123' },{ name: 'srinadh', pas: '123ss', phone: '123' }

```

### find
###   It will  returns the first occurrence of an element in the array that satisfies the given condiction and will not check entier array

var obj = [

    { name: 'Max', age: 23 },
    { name: 'John', age: 20 },
    { name: 'Caley', age: 18 }
];
 
var found = obj.find(x=>{
 return (x.name == 'John')
});
console.log(found); //   { name: 'John', age: 20 },

### findIndex
### It will returns the index of the position of array

var result = obj.findIndex(x=>{
 return (x.age == 20)
});
console.log(result); // 1


###Every
### It will return the boolean value.when codiction is statify each very element it will return true otherwise false
```
let eveA =[2,4,8,10];
let e = eveA.every(x=>{
    return x%2 ==0
});
console.log(e)

```

###some
### It will return the boolean value. when condiction is statify at least one element in the array it will return true otherwise false
```
let elesome = [1,3,5,7,9];

let s = elesome.some(x=>{
    return x%2==0
});
console.log(s)


```

```
let [ds,g,ss] =[1,5,'ff'];
console.log(ds,g,ss); // 1,5,ff

```
```
let n =[1,2]
let nn = [3,3]
console.log(JSON.stringify(n) == JSON.stringify(nn)) // false
console.log(JSON.stringify(n)) // [1,2]
```

###reverse

### It will return reverse of array elements

```
let arry = [1,2,3]
let rev= arry.reverse();
console.log(rev) // [3,2,1]


```
###push method
### It added to array from left to right
```
let dymicArr=[];
console.log(dymicArr); // []

 dymicArr.push(2);
 console.log(dymicArr) // [2]
 dymicArr.push(3);
 console.log(dymicArr) // [2,3]  

```
###pop method
### It remove to array element from left to right

```
dymicArr.pop()
console.log(dymicArr) // [2]

```
###unshift method
### It added to array from right to left
```
dymicArr.unshift(34,33)
console.log(dymicArr) // [34,33,2]

```
###shift method
### It remove to array from right to left
```
dymicArr.shift()
console.log(dymicArr) // [33,2]

```
## sort 

### Asc order: It will return lower value to higher value
let unsortedAry = [2,3,5,1,4]; 

console.log(unsortedAry.sort((a,b)=>a-b)); // [ 1, 2, 3, 4, 5 ]

### Asc order: It will return higher value to lower value
console.log(unsortedAry.sort((a,b)=>b-a)); // [ 5, 4, 3, 2, 1 ]


### array of obj 

let unsortedAryOBj= [{id:3,name:'venki'},{id:1,name:'srinadh'},{id:2,name:'siva'}];
let unsortedAryOBj_result = unsortedAryOBj.sort((a,b)=>{
    return  a.id - b.id
})
console.log(unsortedAryOBj_result) // [{ id: 1, name: 'srinadh' },{ id: 2, name: 'siva' },{ id: 3, name: 'venki' }]

### Both string and number sort : It will return the sort form number to string

let dsd = ['s', 't', 'a', 'c', 'K', 'o', 'v', 'E', 'r', 'f', 'l', 'W', '2', '1']
console.log(dsd.sort((a,b)=>a.localeCompare(b))) // ['1', '2', 'a', 'c','E', 'f', 'K', 'l','o', 'r', 's', 't','v', 'W']

## Date Sort : It will return the low value to higher value

var dates = [
    new Date(2007, 11, 10),
    new Date(2014, 2, 21),
    new Date(2009, 6, 11),
    new Date(2016, 7, 23)
    ];

console.log(dates.sort((a,b)=>{
 if(a>b){return -1}
 if(a<b){return 1}
 return 0
}))

[
  2007-12-09T18:30:00.000Z,
  2009-07-10T18:30:00.000Z,
  2014-03-20T18:30:00.000Z,
  2016-08-22T18:30:00.000Z
]

## reduce : It will return each array element count

 let newA = [0,1,2,3,4,5];
    let newA_total = newA.reduce((a,b)=>{
        console.log(a,b)
        return a+b;
    }) // 0 1
1 2
3 3
6 4
10 5

## Max and Min

## Max: It will return the maximum value

let max = [3,4,65,34,23];
console.log(Math.max(...max)) // 65
console.log(Math.min(...max)) // 3



# ARRAY END

# OBJECT START
###OBJECT: It is a collection of properties each properties has key and value

let obj = {
 name:'srinadh',
 age: 25,
 test: function (a){
  return a
  }
}
console.log(obj.name) // srinadh
console.log(obj.test(11)) // 11

## Add key to object

obj['status'] = 'married';

console.log(obj) // { name: 'venkatesh', age: 20, test: [Function: test], status: 'marrried' }


## Merge Objects

let ob1={a:1,b:3},ob2={c:4,d:5};

console.log({...ob1,...ob2}) // { a: 1, b: 3, c: 4, d: 5 }
console.log(Object.assign(ob1,ob2,{f:6})) // { a: 1, b: 3, c: 4, d: 5, f: 6 }

## Delete Object propertie

 delete obj.status
 console.log(obj) // { name: 'venkatesh', age: 20, test: [Function: test]}
 
## Get object keys

console.log(Object.keys(obj)) // [ 'name', 'age', 'test', 'number' ]

## Get object values

console.log(Object.vales(obj)) // [ 'venkatesh', 20, [Function: test], 22 ]

## object entries

## It will return the array of array

let objs = { name: 'venkatesh', age: 20, role: 'se' }

console.log(Object.entries(obj)) // [ [ 'name', 'venkatesh' ], [ 'age', 20 ] ]

## Destructing the object

let user={
    id:20,
    name:'srinadh',
    age:28
};

let {id,name,age=200} = user;
console.log(id,'id') // 20
console.log(name,'name') // srinadh
console.log(age,'age') // 200

# OBJECT END


