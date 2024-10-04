import { NewIRI, NewURL } from "../../../dto/lod.dto";
import Model from "../../../models";

const SeedGeo = async () => {
  try {
    
    const urlData: NewURL = {
      prefixName: "geo",
      prefixURL: "http://www.opengis.net/ont/geosparql#",
      description: "The preferred prefix for this ontology is geo.",
    };

    const urlModel = Model.URLs;
    let getSaveData;
    let isSeeded = false;

    const urlExist = await urlModel.exists({ prefixURL: urlData.prefixURL });
    if (urlExist) {
      getSaveData = await urlModel.findOne({ prefixURL: urlData.prefixURL });
    } else {
      getSaveData = await urlModel.create({ ...urlData });
    }

    const iriData: NewIRI[] = [
      {
        urlId: getSaveData?._id.toString() as string,
        name: "hasGeometry",
        iriType: "data",
        description:
          "hasGeometry data is the Geometry identifier for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "asWKT",
        iriType: "data",
        description: "asWKT data is the Geometry shape for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
    ];

    for (const item of iriData) {
      const iriModel = Model.IRIs;
      const iriExist = await iriModel.findOne({ name: item.name });
      const iriExistId = iriExist?.urlId.toString() as string;
      if (!iriExist || iriExistId !== item.urlId) {
        await iriModel.create({ ...item });
        isSeeded = true;
      }
    }

    if (isSeeded) {
      return "geo URL and IRI Seed data created successfully"
    }
  } catch (error) {
    return `Error seeding data: ${error}`
  }
};

export default SeedGeo;
