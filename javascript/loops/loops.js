// traditional for loop;
let array =[1,2,3,4];
for(let i=0;i<array.length;i++){
    console.log(array[i],'tfor');
    // break;
}

for(let i=array.length-1;i>=0;i--){
    console.log(array[i],'tforev')
}

// while
let k=5;
while(k>0){
    console.log(k,'while');
    k--;
}

// do while;
let jj = 0;
do{
console.log(jj,'do-while')
jj--
} while(jj>0)



// es6
// forEach
array.forEach((ele,index,arr)=>{
    console.log(ele,index,arr);
})

// for-of

for(let a of array){
    console.log(a);
}


// for -in // iterate objects

let onj={name:'venki',age:20};
for(let a in onj){
    console.log(a,'ffff')
}


// nested loops;
for(let i=0;i<array.length;i++){
    for(let j=0;j<2;j++){
        console.log(i,j,'jgj')
    }
}

let array2 = [1,2,3,4,6]
for (let i=0;i<array2.length;i++){
    if(array2[i]==2){
      continue;
    }
    console.log(array2[i],'conti')
}


outerloop:
for (var i = 0;i<3;i++){
 innerloop:
 for (var j = 0;j <3; j++){
 console.log(i);
 console.log(j);
 if (j == 1){
 break outerloop; 
 }
 }
}
