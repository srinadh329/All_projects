let ob1 = {a:1,b:1} , ob2 = {c:1,d:2}
console.log({...ob1,...ob2})
console.log(Object.assign(ob1,ob2))

let obj = {name:'venkatesh', age:20, role:'se'}
delete obj.role
console.log(obj)

let objs = {name:'venkatesh', age:20, role:'se'}
console.log(Object.keys(objs))
console.log(Object.values(objs))

let user={
    id:20,
    name:'srinadh',
    age:28
};

let {id,name,age=20} = user;
console.log(id,'id')
console.log(name,'name')
console.log(age,'age')