import express from "express";
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
app.use(express.json());
import { JWT_password } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors";
app.use(cors());
app.post("/api/v1/signup",async (req,res) =>{

    const username =req.body.username;
    const password = req.body.password;
    try{
    await UserModel.create({
        username:username,
        password:password
    })

    res.json({
        msg:"user has been created"
    })}
    catch(e){
        res.status(401).json({
            msg:"user already exists"
        })
    }
})

app.post("/api/v1/signin", async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,password
    })
    if(existingUser){
             const token = jwt.sign({
                id: existingUser._id
             },JWT_password)
             res.json({
        token
    })
    }else{
        res.status(401).json({msg:"invalid creds"})
    }

    
})
app.post("/api/v1/content",userMiddleware,async (req,res) =>{
    
  const title = req.body.title;
  const type = req.body.type;
  const link = req.body.link;
await ContentModel.create({
    title,
    type,
    link,
    
    userId: req.userId,
    tags: []
  });

  res.json({
    msg:"content created"
  })
    
})

app.get("/api/v1/content", userMiddleware, async (req,res) =>{
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username")
    res.json({ content })
})

app.delete("/api/v1/delete", userMiddleware, async (req,res) =>{
  
    const contentId = req.body.contentId;
    const userId = req.userId;
    await ContentModel.deleteOne({
       _id: contentId,
        
        userId:userId
    })
    res.json({
        msg:"Content deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware,async (req,res)=>{
const share = req.body.share;
const hash = random(10);

if (share){
    const existingLink = await LinkModel.findOne({
        userId:req.userId
    });
    if(existingLink){
    res.json({  hash:existingLink.hash})
    return;   
}
   await LinkModel.create({
         userId: req.userId,
        hash:hash
    })
    res.json({
        msg:"/share/" +hash
    })
    return;
}else {
   await LinkModel.deleteOne({
        userId: req.userId
    });
res.json({
msg:"remove share linkn"
})
}


}
)

app.get("/api/v1/brain/:shareLink", async (req,res)=>{
const hash = req.params.shareLink;
const link = await LinkModel.findOne({
    hash
});
if (!link){
    res.status(411).json({
        msg:"Sorry incorrect"
    })
    return
} 
    const content = await ContentModel.find({
        userId:link.userId
    })

    const user = await UserModel.findOne({
        _id:link.userId
    })


//userId

res.json({
    username: user?.username,
    content:content
})



})

app.listen(process.env.PORT || 3000);