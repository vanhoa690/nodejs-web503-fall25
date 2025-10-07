import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
  },
  { timestamps: true, versionKey: false }
);

authorSchema.plugin(mongoosePaginate);

const Author = mongoose.model("Author", authorSchema);

export default Author;
