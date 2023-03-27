const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

const userSchema=mongoose.Schema({
firstName:String,
email:{type:String,unique:true}, 
lastName:String,
pwd:String,
role:String,
avatar:String,
});

userSchema.plugin(uniqueValidator);
const user=mongoose.model("User",userSchema);

module.exports=user;