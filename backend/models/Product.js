import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
const Schema = mongoose.Schema;

// Creating our Product Schema with it's elements
const ProductSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    numberInStock: { type: Number, required: true },
    picturePath: { type: String, required: true, default: "" },
    creationDate: { type: Date, default: Date.now },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

// will use mongoose-paginate plugin to retrieve data when make pagination
ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
