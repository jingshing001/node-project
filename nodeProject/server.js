const express=require('express');
const mongoose = require('mongoose');
const passport=require('passport');
const app=express();
const port=process.env.PORT || 3000;
//引入users.js
const users=require('./routes/api/users');
//引入profile.js
const profiles=require('./routes/api/profiles');
//引入資料庫地址
const db=require('./config/keys').mongoURI;

//連結資料庫
mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(()=>{
        console.log("MONGODB CONNECTED");
  }).catch(err=>console.log(err));


//使用body-parser中間件
app.use(express.urlencoded({extended:false}));

app.use(express.json());

//passport初始化
app.use(passport.initialize())

require("./config/passport")(passport);


//使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);


//監聽伺服器
app.listen(port,()=>{
    console.log(`server run port:${port}`);
});


