import { connection } from "mongoose";

declare global{
    var mongoose:{
        conn:connection | null,
        promise:Promise<connection> | null  //
    }
}

export {} //export as a module