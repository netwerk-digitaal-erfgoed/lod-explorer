import mongoose from "mongoose";
import { IIRIs } from "../dto/lod.dto";

const IRISchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "urls",
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    iriType: {
      type: String,
      enum: ["class", "object", "data", "none"],
      default: "none",
    },
    description: {
      type: String,
      require: true,
    },
    hasData: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const IRIs = mongoose.model<IIRIs>("iris", IRISchema);

export default IRIs;
