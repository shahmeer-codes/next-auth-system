import mongoose, {  models, model } from "mongoose";


interface user_type{
    _id?:mongoose.Types.ObjectId;
    name:string;
    image:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}

const user_schema=new mongoose.Schema<user_type>({
     name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, 
{ timestamps: true });

const user = models.user || model("user", user_schema);
export default user