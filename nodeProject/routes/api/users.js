const express=require("express");
const User=require('../../models/User');
const bcrypt=require("bcrypt");
const router=express.Router();



//路由測試
router.get("/test",(req,res)=>{
    res.json({msg:"login works"});
})

//登路路由
router.post('/register',((req,res)=>{
    console.log(req.body);
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json({email:"已經有人註冊過!"})
            }else{
                const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                })
                bcrypt.genSalt(10,function(err,salt){ 
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{ 
                            if(err) throw err;

                            newUser.password=hash;

                            newUser.save()
                                   .then(user=>res.json(user))
                                   .catch(err=>console.log(err));
                    }) ; 
                });

            }
        })
}))
module.exports= router;