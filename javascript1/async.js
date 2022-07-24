
 function test1(){
    const k=0


var ismatch = false;
for(let i =0; i<=100000;i++){
    if(i==100000){
        ismatch=true
        console.log('shhs')
    }
}
if(ismatch) return ismatch
}

function test2(){
    const k=2
   
    return  k
}

async function test3(){
    console.log(await test1())
    console.log('dggs')

}
// test3()

function venki(){
 var test = new Promise((resolve,reject)=>{
     reject('error')
 })
 console.log(test)
 test.then(data=>{
     console.log(data,'suc')
},err=>{
    console.log(err,'fail')
})

}

venki()