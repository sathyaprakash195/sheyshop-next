import mongoose from "mongoose";
import Category from "./CategoryModel";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category.modelName,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// check if user model is already created
if (mongoose.models.products) {
  const productModel = mongoose.model("products");
  mongoose.deleteModel(productModel.modelName);
}

const Product = mongoose.model("products", productSchema);

export default Product;
