const express=require("express");
const User=require('../../models/User');
const bcrypt=require("bcrypt");
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken');
const keys=require("../../config/keys")
const passport=require("passport");
const router=express.Router();



//註冊路由
router.post('/register',((req,res)=>{
    console.log(req.body);
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json("電子信箱已經有人註冊過!")
            }else{
                const avatar=gravatar.url(req.body.email,{ s : '200' ,  r : 'pg' ,  d : 'mm' }); 
                const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password,
                    identity:req.body.identity
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

//登入路由
router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    //查詢數據庫
    User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.status(404).json('用戶不存在!')
            }

            //密碼配對
            bcrypt.compare(password,user.password)
                  .then(isMatch=>{
                      if(isMatch){
                        const rule={
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        }
                        jwt.sign(rule,keys.secretOrkey,{expiresIn:3600},(err,token)=>{
                            if(err)throw err;
                            res.json({
                                success:true,
                                token:"Bearer "+token
                            })
                        })
                        // res.json({msg:"success"});
                      }else{
                            return res.status(400).json({password:"密碼錯誤"});
                      }
                  }) 
        })
})


//使用者請求個人資料
router.get('/current',passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})

module.exports= router;