import Model from "../models";
import { IIRIs } from "../dto/lod.dto";

async function findClassId(classId: string) {
  try {
    const classToDomainModel = Model.ClassToDomain;

    const classExist = await classToDomainModel
      .find({ classId })
      .populate<{ classId: IIRIs }>({
        path: "classId",
        model: "iris",
        populate: {
          path: "urlId",
          model: "urls",
        },
      })
      .populate<{ domainId: IIRIs }>({
        path: "domainId",
        model: "iris",
        populate: {
          path: "urlId",
          model: "urls",
        },
      })
      .exec();

    if (classExist.length === 0) {
      throw new Error("No such Class exist in the database.");
    }

    return classExist;
  } catch (error) {
    return error as Error;
  }
}

const findClass = {
  findClassId
};

export default findClass;
