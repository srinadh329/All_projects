(()=>{

    // strin decelaration: 3types of decelaration single quotes, double quotes, template literates
        let fname='siva'
        let mname= "srinadh"
        let lname= `kaile`
        console.log(fname,mname,lname);
    // strin decelaration

    // string convert 
        // string method: it will converting any value to the string even null and undefind
            let a =[1,2,3,null];
            for(let a1 of a){
                console.log(String(a1))
                
            }
            console.log(String(a))
            console.log(typeof a)
        // string method
        // new string method: it will return construct string value can be accessed to string.valueof()
            let name = new String('siva srinadh')
            console.log(name.valueOf())
        // new string method
        // tostring method: it will converting any valu to the string except null and undefind
            let b=[4,5,6,7]
            // let b=[4,5,6,7,null,undefined]
            for(let b2 of b){
                console.log(b2.toString())
            }

        // tostring method
    // string convert
    
    // string Concatenating

    let fname1='siva'
    let mname1= "srinadh"
    let lname1= `kaile`
    console.log(fname1 +' '+ mname1)
    console.log(`${fname1} ${mname1} ${lname1}`)
    
    // string Concatenating

    // reverse string method:it will return the reverse string in any value 
       let myname='sivasrinadh'
       let n =1337
       let m = String(n)
       let arry = [1,2,3]
       let arry1= String(arry)     
       console.log(typeof m)
       console.log(myname.split('').reverse().join(''));
       console.log(m.split('').reverse().join('')); 
       console.log(arry1.split('').reverse().join(''))  
    // reverse string method        
    
    // Comparing Strings
       let fn = 'bdf';
       let sn = 'adf';
       console.log(fn==sn)  
       console.log(fn.localeCompare(sn))   
    
    // Comparing Strings

    // character string
    let sname ="siva srinadh";
    console.log(sname.charAt(9))

    // character string

    // trim
      let newname= "  srinadh    "  
      console.log(newname.length)    
    console.log(newname.trim().length)
    console.log(newname.trimStart().length)
    console.log(newname.trimEnd())
    // trim
    // slice
      console.log(sname.slice(2))
      console.log(sname.slice(2,3))
      console.log(sname.slice(2,5))    
      console.log(sname.slice(-5,-1))  
    
    // slice        
    //substring
    console.log(sname.substring(3,5))
    
    //substring        
    //index of
     let format = "sivasrinadh.pdf"       
     console.log(format.indexOf('a'))
    //index of  
     //lastindex of     
     console.log(format.lastIndexOf('a'))
     console.log(format.lastIndexOf('.'))
     console.log(format.slice(format.lastIndexOf('.')))
     console.log(format.replace(format.slice(format.lastIndexOf('.')),'.png'))
    //lastindex of        

    // lowercase
       let low = 'SRINADH';
       console.log(low)     
       console.log(low.toLowerCase())
    // lowercase        
    // upper case
    let upp ="srinadh";
    console.log(upp.toUpperCase())

    // upper case
    console.log(low.toLowerCase() == upp.toLowerCase())        
    console.log("siva".repeat(4))
    //date
    let d= new Date();
     console.log(d)

    //date
      // includes

      

})();
