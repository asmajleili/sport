// importer mongoose module
const mongoose=require("mongoose");
// create match schema
const playerSchema=mongoose.Schema({
    age:Number,
    nbr:Number,
    name:String,
    position:String,

});
// create match model
const player=mongoose.model("Player",playerSchema);

// make match exportable
module.exports=player;