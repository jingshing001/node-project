const express=require("express");
const Profile=require('../../models/Profile');
const passport=require("passport");
const router=express.Router();

router.get('/test',(req,res)=>{
    res.json({msg:'profile works'})
})


//註冊路由

//新增數據
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;

    new Profile(profileFields).save().then((profile)=>{
        res.json(profile)
    })
})

//獲取所有數據
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.find()
    .then((profile)=>{
        if(!profile){
            return res.status(404).json("沒有任何內容");
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));            
})

//獲取特定數據
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
    .then((profile)=>{
        if(!profile){
            return res.status(404).json("沒有任何內容");
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));            
})

//編輯數據
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;

    Profile.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile=> res.json(profile));
}
)

//刪除數據
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndRemove({ _id:req.params.id})
        .then(profile=>{
          res.json(profile)
        })
        .catch(err=>res.status(404).json('刪除失敗!'))
})

module.exports= router;