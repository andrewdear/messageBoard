import mongoose, { Schema, Document } from "mongoose";
import {ObjectID} from "mongodb";

export interface IMessage extends Document {
    screenName: String;
    message: String;
    _id: ObjectID
}

const UserSchema: Schema = new Schema({
    screenName: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})

export default mongoose.model <IMessage>("Message", UserSchema);