import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        uniqe : true
    },

    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : "uncategorized"
    },

    dimensions : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    avability : {
        type : Boolean,
        required : true,
        default : true
    },

    image:{
        type : [String],
        required : true,
        default : ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fuser-login-authenticate-icon-vector-personal-478466416&psig=AOvVaw3b2LqXpumskp7Dv7wa8CoB&ust=1736873490682000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiTnI-U84oDFQAAAAAdAAAAABAE"]
    }
})

const Product = mongoose.model("Product",productSchema);

export default Product;