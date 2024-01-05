const express = require("express");
const app = express();
const session =require('express-session');

app.set("view engine","ejs");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "my secret",
  })
);

const password ="12345"
const email = "suresh@gmail.com"
let cards=[
  {
    header:"GeeksforGeeks",
    image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
    title:"Angular JS",
    desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
  },
  {
    header:"GeeksforGeeks",
    image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
    title:"Angular JS",
    desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
  },
  {
    header:"GeeksforGeeks",
    image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
    title:"Angular JS",
    desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
  },
  {
    header:"GeeksforGeeks",
    image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
    title:"Angular JS",
    desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
  }
]


let length=cards.length

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/',(req,res)=>{
  // console.log(req.session.isLogin)
  //   console.log(req.url)
    if(req.session.isLogin==true)
     res.render("html",{cards,length});
    else{
      res.render('index');
    }

})

app.post('/html',(req,res)=>{
   
    if(req.body.email == email && req.body.password == password)
    {
      
        req.session.isLogin= true;
        // res.render('html',{cards,length});
        res.redirect("/")

    }
    else{
     
      res.render('index',{
        notvalid:'invalid password',
      });
    }
})
 
app.post('/logout',(req,res)=>{
  req.session.isLogin=false;
  res.redirect("/")
})

app.use('*/',(req,res,next)=>
{
  res.status(404).send("<h1>Page not available<h1>")
})
app.listen(8071,()=>{console.log('server is running in http://localhost:8071')});
