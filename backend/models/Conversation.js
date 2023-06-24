import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema for Users
const ConversationSchema = new Schema({
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
  messages: {
    type: Array,
    default: [],
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const Conversation = mongoose.model("conversations", ConversationSchema);

export default Conversation;
