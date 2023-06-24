import { createRequire } from "module";
const require = createRequire(import.meta.url);
let ObjectId = require("mongodb").ObjectId;
import Comment from "../models/Comment.js";
import Product from "../models/Product.js";

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
export const createComment = async (req, res) => {
  /*
    the main user's id is acquired from the auth
    the product id is passed on from the front edn in the params
    and the rest is passed on in the body of the request
  */
  try {
    const user_id = req.user.id;
    const { body, name, picturePath } = req.body;
    const { productId } = req.params;

    const newComment = new Comment({
      user: user_id,
      name: name,
      picturePath: picturePath,
      body: body,
    });
    await newComment.save();

    /*
      after the comment is created we find the product
      and add the new comment in the product's comments array
    */

    Product.findOneAndUpdate(
      /*  
      note: usually if i search for a document by _id
      i need to use ObjectId cause it shouldn't work with a string
      but below it works's for some reason and i am not touching it if it's not broken :)
    */
      { _id: productId },
      { $push: { comments: newComment } },
      { upsert: true }
    ).exec();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export const deleteComment = async (req, res) => {
  try {
    /*
      the comment id and the product id is passed on in the req params
      the user id is form the auth
    */
    const { id, productId } = req.params;

    const user_id = req.user.id;

    const comment = await Comment.findById(id);

    /*
      once the comment is found i check if the comment creator is the same as the main user
      if true i delete the comment 
      and find the product and pull the comment out of the comments array in the product
    */
    if (comment) {
      if (comment.user === user_id) {
        const deleted = await Comment.findByIdAndDelete(id);

        await Product.updateOne(
          { _id: productId },
          { $pull: { comments: { _id: ObjectId(id) } } }
        );

        res.status(201).json({ deleted });
      } else {
        res.status(201).json({ message: "Not your comment" });
      }
    } else {
      res.status(407).json({ message: "no such comment" });
    }
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};
