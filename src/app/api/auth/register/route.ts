import connectdb from "@/lib/db.connect";
import user from "@/model/user";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const {name,email,password}=await req.json()
        await connectdb()  //call to connect database
        const exist_user=await user.findOne({email})
        if(exist_user)
        {
            return NextResponse.json({msg:"user already exist"},{status:400})
        }
        if(password.length<6)
        {
            return NextResponse.json({msg:"password must be upto 6 characters"},{status:400})
        }
        const salt = await bcrypt.genSalt(10) //whmuch password to be strong
        const hashed_pwd=await bcrypt.hash(password,salt)
        const new_user=await user.create({name,password:hashed_pwd,email})
        
        return NextResponse.json({new_user},{status:201})
        
    }catch(err)
    {
        return NextResponse.json({msg:"Register Error : ",err},{status:500})
    }
}