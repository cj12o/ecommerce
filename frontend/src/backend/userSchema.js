// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const blogSchema = new Schema({
//   title: String, // String is shorthand for {type: String}
//   author: String,
//   body: String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs: Number
//   }
// });
import mongoose, { Schema }  from "mongoose";

const userSchema=new Schema({
  userid:String,
  name:String,
  password:String
})

export default userSchema