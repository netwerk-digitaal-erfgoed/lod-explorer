import mongoose from "mongoose";
import { IURLs } from "../dto/lod.dto";

const URLsSchema = new mongoose.Schema({
  prefixName: {
    type: String,
    require: true
  },
  prefixURL: {
    type: String,
    unique: true,
    require: true
  },
  description: {
    type: String,
    default: ""
  },
},
{
    timestamps: true
});

const URLs = mongoose.model<IURLs>("urls", URLsSchema);

export default URLs;
