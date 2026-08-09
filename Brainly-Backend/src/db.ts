import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import "dotenv/config";
import mongoose, {model, Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI as string)

const UserSchema = new Schema({
    username: {type : String, unique : true},
    password: String
})

export const UserModel =  model("Users",UserSchema);

const ContentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String },
  type: { type: String, required: true }, 
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true }
});

export const ContentModel = model("content",ContentSchema);

const LinkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref:"Users", required:true , unique:true}}
)

export const LinkModel = model("Links", LinkSchema);