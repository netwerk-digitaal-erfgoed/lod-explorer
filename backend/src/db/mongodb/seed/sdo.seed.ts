import { NewIRI, NewURL } from "../../../dto/lod.dto";
import Model from "../../../models";

const SeedSdo = async () => {
  try {
    
    const urlData: NewURL = {
      prefixName: "sdo",
      prefixURL: "https://schema.org/",
      description: "The preferred prefix for this ontology is sdo.",
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
        name: "name",
        iriType: "data",
        description:
          "name data is the name for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "startDate",
        iriType: "data",
        description: "startDate data is the start date for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "endDate",
        iriType: "data",
        description: "endDate data is the end date for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "description",
        iriType: "data",
        description: "description data is the description for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "alternateName",
        iriType: "data",
        description: "alternateName data is the alternate Name for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "mentions",
        iriType: "data",
        description: "mentions data is the mentions for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "temporalCoverage",
        iriType: "data",
        description: "temporalCoverage data is the temporal Coverage for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "hasOccupation",
        iriType: "data",
        description: "hasOccupation data is the has Occupation for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "disambiguatingDescription",
        iriType: "data",
        description: "disambiguatingDescription data is the disambiguating Description for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "yearBuilt",
        iriType: "data",
        description: "yearBuilt data is the yearBuilt for class data that is attached to or present on Gouda Time Machine",
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
      return "sdo URL and IRI Seed data created successfully"
    }
  } catch (error) {
    return `Error seeding data: ${error}`
  }
};

export default SeedSdo;
