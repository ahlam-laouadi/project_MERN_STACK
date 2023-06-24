import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema for Users
const MessageSchema = new Schema({
  toId: {
    type: String,
    required: true,
  },
  toName: {
    type: String,
    required: true,
  },
  toPicturePath: {
    type: String,
    required: true,
  },
  fromId: {
    type: String,
    required: true,
  },
  fromName: {
    type: String,
    required: true,
  },
  fromPicturePath: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Number,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
