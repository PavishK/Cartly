import mongoose from "mongoose";

const cartModel = new mongoose.Schema({
    item:{
        type:String,
        required:false,
        default:"",
    },
    checked:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }
},
{
    timestamps:true,
});

export default mongoose.model("cart",cartModel);