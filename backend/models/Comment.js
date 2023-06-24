import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comments", CommentSchema);

export default Comment;
