//Express server routing to check whether no. is prime or not 

const express = require('express');
const path = require('path');

const app = express();

app.get('/' , (req,res) => {
    res.sendFile((path.join(__dirname , 'public' , 'index.html')));
 });



var num;
var checker = '';
var factorchecker = [];

app.get('/number' , (req,res) => {
    
    res.send(`<h1>Go to /number/:num to check if :num is prime or composite</h1>`)
});
app.get('/number/:num', (req, res) => {
  
    num =req.params.num; //getting number value and storing into variable

    checker='prime';
    if (num<0) {
        checker='negative';
    } else if (num > 1) {
        for (var i = 2; i < num; i++) {
          if (num % i === 0) {
            checker='not_prime';
            factorchecker.push(i);
          }
        }
    } else {
        checker='neither';
    }
    
    

    if (checker==="negative"){
        res.send(`<h1>the number is negative</h1>`);
    }
    if (checker==='not_prime'){
        res.send(`<h1>the number ${num} is composite</h1>` + "factors are: 1," + factorchecker +`,${num}` );
        checker = 'prime';
        factorchecker = [];
    }
    
    if (checker==='prime'){
        res.send(`<h1>the number ${num} is prime</h1>` + `factors are: 1,${num}`);
        checker='prime';
        
    }
    if(checker==='neither') {
         res.send(`<h1>the number ${num} is neither prime nor composite</h1>`);
     } 
    
    
   });
   
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

