const express = require("express");
const app = require("liquid-express-views")(express());
const port = 3000;
const Budget = require("./models/budget.js")

app.use((req, res, next) => {
    console.log('run routes');
    next();
});

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'

// index
app.get('/budgets',(req, res)=>{
    res.render("index",{budgtr: Budget})
})
// new
app.get('/budgets/new',(req, res)=>{
    res.render("new")
})
// show
app.get('/budgets/:index',(req, res)=>{
    res.render("show",{budgtr:Budget[req.params.index]})
})
// post
app.post('/budgets',(req, res)=>{
    Budget.push(req.body);
    res.redirect("/budgets")
})

// create

app.listen(port,()=>{
    console.log("listening to port 3000")
})