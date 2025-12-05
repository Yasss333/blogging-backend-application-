const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  blogID: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  createdBY: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment=mongoose.model("comment",CommentSchema);

module.exports=Comment;