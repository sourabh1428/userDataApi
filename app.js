const express=require('express')
const cors = require('cors');
const app=express();
const users =require('./MOCK_DATA (1).json')
const fs=require('fs')
const mongoose=require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3002;








mongoose.connect("mongodb+srv://sppathak1428:Pb7b59CVnTmlWYXW@cluster0.xx2o6vt.mongodb.net/")
.then(()=>console.log("mongo db is connected 😄"))
.catch(err=>console.log("err"))



///     SCHEMA



const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  jobTitle:{
    type:String,
  },
  gender:{
    type:String,

  },
  timestamp:{

  }
})


//model

const User=mongoose.model("user",userSchema);






// Use CORS middleware
app.use(cors());


app.use(express.urlencoded({extended:false}))


app.use((req,res,next)=>{
  console.log("hello i am middleware 1");

    next();

  // return res.json("the end from m-1");
});

app.use((req,res,next)=>{
  console.log("hello i am middleware 2");
  fs.appendFile("logs.txt",`\n ${Date.now()} ${req.path} `,(error, data)=>{
    if(error)console.log(error);
  })
  next();
});

app.get('/',(req,res)=>{
  return res.json({mssg:"hello "});
})





app.get('/api/users', async (req,res)=>{
  
  const allDbUsers=await User.find({});

  
  
   return res.json(allDbUsers);
});


app.route('/api/users/:id')
.get(async (req,res)=>{

  const user=await User.findById(req.params.id);
  if(!user){
   return res.status(404).json({msg:"failed"});
  }
  return res.json(user);
})
.patch(async (req,res)=>{
  await User.findByIdAndUpdate(req.params.id,{firstName:"hueheue"});

  return res.json({status:'success',user:"done"});
})
.delete(async(req,res)=>{
 
  await User.findByIdAndDelete(req.params.id);
  return res.json({mssg:"deleted"});

})





app.post('/api/users',async (req,res)=>{
  // res.setHeader('myName',"Sourabh");
  const body=req.body;
   
  const result=await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    jobTitle:body.job,
    gender:body.gender,
    
  })
  console.log("result :✅",result);
  
  return res.status(201).json({msg:"success"})

  })





app.listen(PORT,(req,res)=>{
  console.log(`server listening on ${port}`);
})