import mongoose from "mongoose";

const ClassToDomainSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "iris",
      required: true,
    },
    domainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "iris",
      required: true,
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

const ClassToDomain = mongoose.model("class_to_domain", ClassToDomainSchema);

export default ClassToDomain;
