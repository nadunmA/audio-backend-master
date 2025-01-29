import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

  email : {
    type : String,
    required : true,
    unique : true
  },

  name : {
    type : String,
    required : true,
    
  },

  rating : {
    type : Number,
    required : true,
  },

  comment : {
    type : String,
    required : true,
  },

  date : {
    type : Date,
    default : Date.now()
  },

  profilePic : {
    type : String,
    required : true,
    default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },

  approved : {
    type : Boolean,
    required : true,
    default : false
  }


})

const Rewview = mongoose.model("Rewview",reviewSchema);

export default Rewview;