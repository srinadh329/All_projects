let arr = [2,5,9,1,8];
// total array
    console.log(arr)
// total array
// position of arry
    console.log(arr[3])
// position of arry
// totay arry lenght
    console.log(arr.length)
// totay arry lenght
// last element of arry
    console.log(arr[arr.length-1]);
// last element of arry
// middle element of arry
    console.log(arr[(arr.length-1)/2]);
// middle element of arry

// contact of arry
let c= ['venki','srinadh'];
let d = ['javascript','angular'];

let z = c+d
console.log(z)
console.log(Array.isArray(z))
let ee = ['siva', 'srinadh',]   
let dd = ['kavya', 'priya'] 
let zz = ee.concat(dd)
console.log(zz)
console.log(Array.isArray(zz))
let cc = [...ee , ...dd]
console.log(cc)
console.log(Array.isArray(cc))
// contact of arry

// filters
let ele =[34,5,53,55,453,54,4];

let element = ele.filter(x=>{
    return x%2 == 1;
})
console.log(element)

let list=[{name:'venki',pas:''},{name:"srinadh",pas:'123'},{name:"srinadh",pas:'123ss'}];
let name = list.filter(x=>{
    return x.name == "venki"
})
console.log(name)
let arrmap = list.map(x=>{
    x.phone='123';
    return x;
})
console.log(arrmap)
console.log(list)
// filters

let eveA =[2,4,8,10];
let e = eveA.every(x=>{
    return x%2 ==0
});
console.log(e)

let elesome = [1,3,5,7,9];

let s = elesome.some(x=>{
    return x%2==0
});
console.log(s)

let [ds,g,ss] =[1,5,'ff'];
console.log(ds,g,ss);
let n =[1,2]
let nn = [3,3]
console.log(JSON.stringify(n) == JSON.stringify(nn))
console.log(JSON.stringify(n))

let arry = [1,2,3]
let rev= arry.reverse();
console.log(rev)
    let list1 =[{name:'kavya',study:'10th',status:'married'},{study:'10th'},{status:'married'}]
let data = list.find(x=>x.name == "venki");
console.log(data)
let fill = list1.filter(x=>x.name=='kavya')
console.log(fill)

let dymicArr=[];
console.log(dymicArr);
// push method
 dymicArr.push(2);
 console.log(dymicArr)
 dymicArr.push(3);
 console.log(dymicArr)
// push method
// Pop Method
dymicArr.pop()
console.log(dymicArr)
// Pop Method
dymicArr.unshift(34,33)
console.log(dymicArr)
dymicArr.shift()
console.log(dymicArr)


