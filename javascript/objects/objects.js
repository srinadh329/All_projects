let obj = {
    name: 'venkatesh',
    age: 20,
    test: function (a) {
        return a
    }
}
console.log(obj.name)
console.log(obj.test(11))

// add new key to obj
obj['marks'] =20;

console.log(obj) 


// merge two objects

let ob1={a:1,b:3},ob2={c:4,d:5};

console.log({...ob1,...ob2});
console.log(Object.assign(ob1,ob2,{f:2}));

// delete object key
delete obj.marks;
console.log(obj)
// keys of obj
console.log(Object.keys(ob1))
// values of onj
console.log(Object.values(ob1))



// object entries;
console.log(Object.entries(obj))


// destructing the object;
let user={
    id:20,
    name:'srinadh',
    age:28
};

//let id  = user.id
let {id,name,age=200} = user;
console.log(id,'id')
console.log(name,'name')
console.log(age,'age')




