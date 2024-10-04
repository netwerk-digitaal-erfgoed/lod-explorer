import mongoose from "mongoose";
import { NewIRI, UpdateIRI } from "../dto/lod.dto";
import Model from "../models";

async function createIRI(newIRI: NewIRI) {
  try {
    const isId = mongoose.Types.ObjectId.isValid(newIRI.urlId);
    if (!isId) throw new Error("Invalid URL ID");

    const iriModel = Model.IRIs;

    const iriExist = await iriModel.findOne({ name: newIRI.name });

    if (
      iriExist &&
      iriExist.urlId ===
        mongoose.Types.ObjectId.createFromHexString(newIRI.urlId)
    ) {
      throw new Error(`IRI with the name ${newIRI.name} already exist`);
    }

    const saveIRI = await iriModel.create({ ...newIRI });

    return saveIRI;
  } catch (error) {
    return error as Error;
  }
}

async function getIRIById(id: string) {
  try {
    const isId = mongoose.Types.ObjectId.isValid(id);
    if (!isId) throw new Error("Invalid URL ID");

    const iriModel = Model.IRIs;

    const iri = await iriModel.findById(id);

    if (!iri) {
      throw new Error("No iri was found");
    }

    return iri;
  } catch (error) {
    return error as Error;
  }
}

async function getIRIByType(iriType: string) {
  try {
    const iriModel = Model.IRIs;
    const hasData = true;

    const iris = await iriModel.find({ iriType, hasData }, '_id name iriType description urlId');

    return iris;
  } catch (error) {
    return error as Error;
  }
}

async function getAllIRIs() {
  try {
    const iriModel = Model.IRIs;

    const iris = await iriModel.find();

    return iris;
  } catch (error) {
    return error as Error;
  }
}

async function updateIRIById(updateIRI: UpdateIRI) {
  try {
    const isId = mongoose.Types.ObjectId.isValid(updateIRI.id);
    if (!isId) throw new Error("Invalid URL ID");

    const iriModel = Model.IRIs;

    const update = {
      name: updateIRI.name,
      description: updateIRI.description,
      iriType: updateIRI.iriType,
      urlId: updateIRI.urlId,
      hasData: updateIRI.hasData,
    };

    const iriUpdate = await iriModel.findOneAndUpdate(
      { _id: updateIRI.id },
      update,
      { new: true }
    );

    if (!iriUpdate) {
      throw new Error("Something went wrong");
    }
    return iriUpdate;
  } catch (error) {
    return error as Error;
  }
}

const IRIService = {
  createIRI,
  getAllIRIs,
  getIRIByType,
  updateIRIById,
  getIRIById,
};

export default IRIService;
