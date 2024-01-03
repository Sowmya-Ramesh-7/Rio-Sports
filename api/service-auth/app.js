if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}


const express=require("express");
const cors = require('cors');
const app=express();

app.use(cors());

const wrapAsync=require('./utils/wrapAsync.js')
const ExpressError=require('./utils/ExpressError.js')

const dbUrl= "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1"
const mongoose=require("mongoose");
const path=require("path");


const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy=require('passport-local');
const User=require("./models/user.js");



app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbUrl);
}
//sessions, session store
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
    console.log("Error on Mongo Session Store",err);
})

const sessionOptions={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*1000*60*60*24,
        httpOnly:true
    }
}


app.use(session(sessionOptions));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



const saveRedirectUrl = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectTo = req.originalUrl || '/';
    }
    next();
  };

  
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };

app.post("/api/signup",wrapAsync(async (req,res)=>{
    try{
        let {fullname,username,email,password}=req.body;
        console.log(req.body)
        const newUser=new User({fullname,email,username});
        const registeredUser=await User.register(newUser,password);
        //automatic login after signup
        req.login(registeredUser,(err)=>{
            console.log(err)
            // return res.status(400).json({"message":"Unable to Login"});
        })
        console.log(`Welcome to Rio Fashion, ${fullname}`);
        return res.status(200).json({"message":`Welcome to Rio Fashion, ${fullname}`,"user":req.user})
    }catch(e){
        console.log("error",e.message);
        return res.status(400).json({"message":`${e.message}`})
    }
}));



app.post("/api/login",
    saveRedirectUrl,
    passport.authenticate("local",{session:false}),
    wrapAsync(async (req,res)=>{
        try{
            const redirectUrl = req.session.redirectTo || '/home';
            delete req.session.redirectTo; // Clear the saved redirect URL
            return res.status(200).json({"message":`Welcome back, ${req.user.fullname}`,"user":req.user,"redirectUrl":redirectUrl})
        }catch(e){
            return res.status(400).json({"message":"Invalid Credentials"})
        }
    }
    ));

app.get("/api/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        return res.status(200).json({"message":"Logout Successful !!!"})
    })
});




//error handling middleware

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    console.log(err)
    res.status(statusCode).json(err);
});

//throwing new express error

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});


app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});