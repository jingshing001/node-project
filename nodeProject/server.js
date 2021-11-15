const express=require('express');
const mongoose = require('mongoose');
//引入users.js
const users=require('./routes/api/users');

//引入資料庫地址
const db=require('./config/keys').mongoURI;
const app=express();
const port=process.env.PORT || 3000;



mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(()=>{
        console.log("MONGODB CONNECTED");
  }).catch(err=>console.log(err));

app.get('/',((req,res)=>{
        res.send('HELLO');
}))

//使用routes
app.use("/api/users",users);



app.listen(port,()=>{
    console.log(`server run port:${port}`);
});