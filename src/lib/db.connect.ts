import mongoose from "mongoose"


const mongourl=process.env.MONGO_URL  


if(!mongourl) //check that URL is taken or not
{    
    throw Error("mongobd Url not found")
}
let cashed=global.mongoose  //get mongoose object from global that we define 

if(!cashed)  //if by chanced there is no mongoose in global (that we define) than make it
{
 cashed=global.mongoose={conn:null,promise:null}  
}

const connectdb=async ()=>{
    if(cashed.conn)  //if connection exsist then continue with that 
    {
        return cashed.conn
    }
    if(!cashed.promise) //if there is no promise that mean no connect than make a new connection
    {
        cashed.promise=mongoose.connect(mongourl).then((c)=>c.connection)  //c is the object of mongodb and we return its connection as a promise and stoe it in cashed.promise for further hot reloads
    }
    try{  //check if connection is pending than make it ans save it in  cashed.conn
        cashed.conn=await cashed.promise
    }catch(error){
        console.log("failed to get make a connection to database Error: ",error)
        throw error
    }
    return cashed.conn

}

export default connectdb