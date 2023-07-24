import mongoose from "mongoose";


export const EmailsSchema = new mongoose.Schema(
{ 
    sentTo:{
        type: String
    },
    sentBy:{
        type: String
    },
    subject:{
        type: String
    },
    text:{
        type:String 
    },
    attachments:{
        type:String
    },
    generatedAt:{
        type: Date
    },
    messageId:{
        type: String
    }
}
)