// lenght of the string with array methods
const a = [10,20,30];
const b = [
    {
        name:'srinadh',
        age:'29',
        dob:'april'
}]
console.log(a.length);
console.log(b.length);
// lenght of the string with array methods

// lenght of the string without array methods
const arr = [10,20,30];
let count = 0;
// while(arr[count] !== undefined){
//     count++
// }
// console.log(count);

for(let i=0;i<arr.length;i++){
    if(arr[count]!==undefined){
        count++;
    }
}
console.log(count);
// lenght of the string without array methods

// swap two variables
var ab =10, ba =15; 
ab = ba-ab;
ba = ba-ab;
ab = ab+ba;
console.log(ab,ba);
var ab=7, ba=8;
[ab,ba] = [ba, ab];
console.log(ab,ba);
// swap two variables

// fuzz buzz fuzzbuzz program
var fizz = (n) => {
for(var i=1;i<=n; i++){
    if(i%3==0 && i%5==0){
        console.log("fizzBuzz");
    }
    else if(i%3==0){
        console.log("Fizz");
    }
    else if(i%5==0){
        console.log("Buzz");
    }
    else{
        console.log(i);
    }
}

}
fizz(20);


// fuzz buzz fuzzbuzz program

// Fibonacci series in JavaScript
function fibonacci(n){

    var x=0,y=1;
    var temp=0;
    for(let i=0; i<n; i++){
        temp = x+y;
        x=y;
        y=temp;
        console.log(x);
    }
}
fibonacci(5)

// Fibonacci series in JavaScript
 
// reverse number

var name = "srinadh";
function reverse(data){
    var result= "";
    for(let i=data.length-1; i>=0; i--){
     result += data[i];
    }
    console.log(result);
}
reverse(name);

// reverse number

var swaparr = [10,9,8,7,6,5,4,3,2,1];

function swap(res){

    for(let i=0; i<res.length; i++){
        for(let j=0; j< res.length; j++){
            if(res[j] > res[j+1]){
                let number = res[j];
                res[j] = res[j+1];
                res[j+1] = number;
            }
        }
    }
    console.log(swaparr);
}
swap(swaparr);

function swapp(res){
for(let i=0; i<res.length; i++){
    if(i%2==0){
        let value = res [i];
        res [i] = res [i+1];
        res [i+1] = value;
    }
}
console.log(swaparr)
}
swapp(swaparr)

function number(a){
if(a%2==0){
    console.log('even');
}
else{
    console.log('odd');
}
}
number(4);

function large(n1,n2,n3){
    if(n1>=n2 && n1>=n3){
        console.log(n1);
    }
    else if(n2>=n1 && n2>=n3){
        console.log(n2);
    }
    else if(n3>=n1 && n3>=n2){
        console.log(n3);
    }
}
large(15,25,5);


function checkprime(number){
    let isPrime = true;
    if (number === 1) {
    console.log("1 is neither prime nor composite number.");
    } 
    else if (number > 1) {
    for (let i = 2; i < number; i++) {
    if (number % i == 0) {
    isPrime = false;
    break;
    }
    }
    
    if (isPrime) {
    console.log(`${number} is a prime number`);
    } else {
    console.log(`${number} is a not prime number`);
    }
    }
    
    }
    checkprime(2) 

    function factorial(n){
        let number = 1;
        for(let i=1; i<=n; i++){
             number*=i;
        }
        console.log(number);
    }
    factorial(3)


    function armstrong(number){
        let sum = 0;
        let temp = number;
        while (temp > 0) {
        let remainder = temp % 10;
        sum += remainder * remainder * remainder;
        temp = parseInt(temp / 10);
        }
        // check the condition
        if (sum == number) {
        console.log(`${number} is an Armstrong number`);
        }
        else {
        console.log(`${number} is not an Armstrong number.`);
        }
        
        }
        armstrong(153)


        const vowels = ["a", "e", "i", "o", "u"]
function countVowel(str) {
// initialize count
let count = 0;

// loop through string to test if each character is a vowel
for (let letter of str.toLowerCase()) {
if (vowels.includes(letter)) { 
count++;
}
}

// return number of vowels
return count
}

console.log(countVowel('venki')) 