import { NewIRI, NewURL } from "../../../dto/lod.dto";
import Model from "../../../models";

const SeedCeo = async () => {
  try {
    
    const urlData: NewURL = {
      prefixName: "ceo",
      prefixURL: "https://linkeddata.cultureelerfgoed.nl/def/ceo#",
      description: "The preferred prefix for this ontology is ceo.",
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
        name: "buurtOfWijkCode",
        iriType: "data",
        description:
          "buurtOfWijkCode data is the neighborhoodOrWijkCode for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "buurtOfWijkNaam",
        iriType: "data",
        description:
          "buurtOfWijkNaam data is the neighborhoodOrDistrictName for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "heeftFunctie",
        iriType: "data",
        description:
          "heeftFunctie data is the has function for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "omschrijving",
        iriType: "data",
        description:
          "omschrijving data is the Description for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "registratiedatum",
        iriType: "data",
        description:
          "registratiedatum data is the registration date for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "rijksmonumentnummer",
        iriType: "data",
        description:
          "rijksmonumentnummer data is the national monument number for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "huisnummer",
        iriType: "data",
        description:
          "huisnummer data is the House number for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "postcode",
        iriType: "data",
        description:
          "postcode data is the postcode for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "kadastraleGemeentecode",
        iriType: "data",
        description:
          "kadastraleGemeentecode data is the cadastral municipal code for class data that is attached to or present on Gouda Time Machine",
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
      return "ceo URL and IRI Seed data created successfully"
    }
  } catch (error) {
    return `Error seeding data: ${error}`
  }
};

export default SeedCeo;
