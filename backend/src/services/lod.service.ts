import mongoose from "mongoose";
import {
  IIRIs,
  IURLs,
  NewClassToDomain,
  QueryParams,
  QuerySingleParams,
} from "../dto/lod.dto";
import Model from "../models";
import findClass from "./findClass.service";
import omekaData from "./omekaData.service";

async function joinClassToDomain(newClassToDomain: NewClassToDomain) {
  try {
    const classToDomain = Model.ClassToDomain;
    const isClassIdValid = mongoose.Types.ObjectId.isValid(
      newClassToDomain.classId
    );
    const isDomainIdValid = mongoose.Types.ObjectId.isValid(
      newClassToDomain.domainId
    );

    if (!isClassIdValid || !isDomainIdValid) {
      throw new Error("Please check the id's ");
    }

    const classExist = await classToDomain.findOne({
      classId: newClassToDomain.classId,
      domainId: newClassToDomain.domainId,
    });

    const classId = classExist?.classId.toString() as string;
    const domainId = classExist?.domainId.toString() as string;

    if (
      classId === newClassToDomain.classId &&
      domainId === newClassToDomain.domainId
    ) {
      throw new Error("Data join already exist");
    }

    const saveJoin = await classToDomain.create({ ...newClassToDomain });
    return saveJoin;
  } catch (error) {
    return error as Error;
  }
}

async function querySparqlByClass(classId: string) {
  try {
    const isId = mongoose.Types.ObjectId.isValid(classId);
    if (!isId) {
      throw new Error("Invalid ID");
    }

    const classExist = await findClass.findClassId(classId);
    if (classExist instanceof Error) {
      return classExist;
    }

    const domainName = await getDomainName(classId);
    if (domainName instanceof Error) {
      return domainName;
    }

    const sparqlResult = omekaData.getSparqlResult(classExist, domainName);
    if (sparqlResult instanceof Error) {
      return sparqlResult;
    }

    return sparqlResult;
  } catch (error) {
    return error as Error;
  }
}

async function getDomainName(classId: string) {
  try {
    const classToDomainModel = Model.ClassToDomain;
    const classExist = await classToDomainModel
      .find({ classId })
      .populate<{ domainId: IIRIs }>({
        path: "domainId",
        model: "iris",
        populate: { path: "urlId", model: "urls" },
      })
      .exec();

    // Extract domainId names from the result
    const domainIdNames = classExist.map((doc) => doc.domainId.name);
    const filteredArray = domainIdNames.filter((item) => item !== "name");

    return filteredArray;
  } catch (error) {
    return error as Error;
  }
}

async function querySparqlByClassAndName(queryParams: QueryParams) {

  try {
    const isId = mongoose.Types.ObjectId.isValid(queryParams.classId);
    if (!isId) {
      throw new Error("Invalid ID");
    }

    const classExist = await findClass.findClassId(queryParams.classId);
    if (classExist instanceof Error) {
      return classExist;
    }

    const sparqlResult = omekaData.getSparqlResult(
      classExist,
      queryParams.domainName,
    );
    if (sparqlResult instanceof Error) {
      return sparqlResult;
    }

    return sparqlResult;
  } catch (error) {
    return error as Error;
  }
}

async function querySingleSparqlByClassAndName(queryParams: QuerySingleParams) {
  try {
    const isId = mongoose.Types.ObjectId.isValid(queryParams.classId);
    if (!isId) {
      throw new Error("Invalid ID");
    }

    const classExist = await findClass.findClassId(queryParams.classId);
    if (classExist instanceof Error) {
      return classExist;
    }

    const sparqlResult = omekaData.getSparqlResult(
      classExist,
      queryParams.domainName,
      queryParams.name,
    );
    if (sparqlResult instanceof Error) {
      return sparqlResult;
    }

    return sparqlResult;
  } catch (error) {
    return error as Error;
  }
}

const LodService = {
  joinClassToDomain,
  querySparqlByClass,
  getDomainName,
  querySparqlByClassAndName,
  querySingleSparqlByClassAndName,
};

export default LodService;
