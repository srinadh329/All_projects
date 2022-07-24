(() => {
    let test1 = 'test';
    let test2 = "test";
    let test3 = `test`;
    let k2 = 'gdgdg';
    let k3 = 8
   console.log(String(1)==='1')
    console.log(test1, test2, test3)
    let a =[1,2,4,null]
    for(let a1 of a) {
        console.log(String(a1))
    }
    let k = new String(1);
    let j = String(k2)
    let g = a.toString();
    console.log(k.valueOf())
    let fname ='Srinadh';
    let lname = 'Kaile' ;
    let k22 ='k'
    let full = fname+' '+lname;
    console.log(fname.concat(' ',lname,' ',k22))
    console.log(k2+k3)
    let f = 'Srinadh';
    let kk = 'Kaile' + f
    console.log(kk)
    let h = `Kaile  ${f}, ${fname}`
    console.log(h);
    let rev = 'kaile';
    console.log(rev.split('').reverse().join(''));
    let s =''
    //  for(let  i= rev.length-1;i>=0;i--){
    //      s = s+rev[i]
    //  console.log(s)
    //  }
     console.log(s,'sssss')
     let c1 = 'bello';
     let c2 = 'aelloh';
     console.log(c1==c2)
     console.log(c1.localeCompare(c2));

     let srr = 'Venkatesh';
     let jjjj = 'Venki \'dhdhhdh"""""'
     console.log(jjjj)
     console.log(srr.charAt(2));
    
     let name ="    srinadh    ";
     let n = 55;
     console.log(name.trim().length);
     console.log(name.trimEnd().length);
     console.log(k instanceof String);
     console.log(srr.substring(6,7));
     console.log(srr.slice(0,4));

     let kf = 'Venkateshchavvakula';.
     console.log(kf.lastIndexOf('v'));

     let filename = "Srinadhfghhgh.png";
     let filename2 = "srinadhfghhgh.png";
     console.log(filename.lastIndexOf('.'))
     console.log(filename.slice(filename.lastIndexOf('.')));
     console.log(filename.includes('t'))
     console.log(filename.replace(filename.slice(filename.lastIndexOf('.')),'.pdf'))
     console.log(filename.toLowerCase())
     console.log(filename.toUpperCase())
     console.log(filename==filename2)
     console.log(filename.toLowerCase()==filename2.toLowerCase())
     console.log('hello'.repeat(3))
     let d= new Date();
     console.log(d.getMilliseconds())

})()
