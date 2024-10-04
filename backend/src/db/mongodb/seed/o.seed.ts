import { NewIRI, NewURL } from "../../../dto/lod.dto";
import Model from "../../../models";

const SeedO = async () => {
  try {
    
    const urlData: NewURL = {
      prefixName: "omeka",
      prefixURL: "http://omeka.org/s/vocabs/o#",
      description: "The preferred prefix for this ontology is o.",
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
        name: "item_set",
        iriType: "data",
        description:
          "item_set data is the item set for class data that is attached to or present on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "media",
        iriType: "data",
        description:
          "primary_media data is the primary media for class data that is attached to or present on Gouda Time Machine",
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
      return "omeka URL and IRI Seed data created successfully"
    }
  } catch (error) {
    return `Error seeding data: ${error}`
  }
};

export default SeedO;
