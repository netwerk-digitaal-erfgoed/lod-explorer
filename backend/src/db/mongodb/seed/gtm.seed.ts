import { NewIRI, NewURL } from "../../../dto/lod.dto";
import Model from "../../../models";

const SeedGtm = async () => {
  try {
    const urlData: NewURL = {
      prefixName: "gtm",
      prefixURL: "https://www.goudatijdmachine.nl/def#",
      description: "The preferred prefix for this ontology is gtm.",
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
        name: "Buurt",
        iriType: "class",
        description:
          "Buurt is the Neighbourhood information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Gebouw",
        iriType: "class",
        description: "Gebouw is the Building information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Hofje",
        iriType: "class",
        description: "Hofje is the Courtyard information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Kunstwerk",
        iriType: "class",
        description:
          "Kunstwerk is the Artwork information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Kwartier",
        iriType: "class",
        description:
          "Kwartier is the Quarter information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Natuur",
        iriType: "class",
        description: "Natuur is the Nature information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Perceel",
        iriType: "class",
        description: "Perceel is the Plot information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "PlaatselijkeAanduiding",
        iriType: "class",
        description:
          "PlaatselijkeAanduiding is the Local Indication information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Sectie",
        iriType: "class",
        description: "Sectie is the Section information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Straat",
        iriType: "class",
        description: "Straat is the Street information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "StraatNummerAanduiding",
        iriType: "class",
        description:
          "StraatNummerAanduiding is the Street Number Designation information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Wijk",
        iriType: "class",
        description:
          "Wijk is the Neighbourhood information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "ligging",
        iriType: "data",
        description:
          "ligging is the location information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Structuur",
        iriType: "class",
        description:
          "Structuur is the Structure information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Gevelsteen",
        iriType: "class",
        description:
          "Gevelsteen is the Facade stone information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "OorspronkelijkeAanwijzendeTafelPagina",
        iriType: "class",
        description:
          "OorspronkelijkeAanwijzendeTafelPagina is the OriginalPointingTablePage information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Hofstedegeld",
        iriType: "class",
        description:
          "Hofstedegeld is the Hofstedegeld information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Adressering",
        iriType: "class",
        description:
          "Adressering is the Addressing information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "OorspronkelijkeAanwijzendeTafelRegel",
        iriType: "class",
        description:
          "OorspronkelijkeAanwijzendeTafelRegel is the OriginalIndicatingTableRule information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Verponding",
        iriType: "class",
        description:
          "Verponding is the Shipping information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Constructie",
        iriType: "class",
        description:
          "Constructie is the Construction information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Index",
        iriType: "class",
        description:
          "Index is the Index information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "Pand",
        iriType: "class",
        description:
          "Pand is the Pledge information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "HistorischNaambord",
        iriType: "class",
        description:
          "HistorischNaambord is the Historical nameplate information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "genoemdNaar",
        iriType: "data",
        description:
          "genoemdNaar is the named after information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "breedte",
        iriType: "data",
        description:
          "breedte is the width information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "gewelfvorm",
        iriType: "data",
        description:
          "gewelfvorm is the vault shape information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "historischeWaarde",
        iriType: "data",
        description:
          "historischeWaarde is the historical Value information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "hoofdvorm",
        iriType: "data",
        description:
          "hoofdvorm is the main shape information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "hoogte",
        iriType: "data",
        description:
          "hoogte is the height information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "lengte",
        iriType: "data",
        description:
          "lengte is the length information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "datumBesluit",
        iriType: "data",
        description:
          "datumBesluit is the dateDecision information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "datumInwerkingtreding",
        iriType: "data",
        description:
          "datumInwerkingtreding is the dateEntry into force information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "status",
        iriType: "data",
        description:
          "status is the status information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "afgebrokenJaar",
        iriType: "data",
        description:
          "afgebrokenJaar is the abortedYear information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "wijk",
        iriType: "data",
        description:
          "wijk is the neighbourhood information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "huisNummer",
        iriType: "data",
        description:
          "huisNummer is the House number information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "cbsWijkcode",
        iriType: "data",
        description:
          "cbsWijkcode is the CBSDistrict code information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "sectie",
        iriType: "data",
        description:
          "sectie is the section information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "adres",
        iriType: "data",
        description:
          "adres is the address information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "blad",
        iriType: "data",
        description:
          "blad is the sheet information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "huisNummerToevoeging",
        iriType: "data",
        description:
          "huisNummerToevoeging is the houseNumberAddition information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "kadastraleAanduiding",
        iriType: "data",
        description:
          "kadastraleAanduiding is the cadastral designation information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "oppervlakte",
        iriType: "data",
        description:
          "oppervlakte is the surface information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "artikelLegger",
        iriType: "data",
        description:
          "artikelLegger is the articleLegger information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "oatInkomenGebouwd",
        iriType: "data",
        description:
          "oatInkomenGebouwd is the oatIncomeBuilt information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "oatInkomenOngebouwd",
        iriType: "data",
        description:
          "oatInkomenOngebouwd is the oatIncomeUnbuilt information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "perceelSoort",
        iriType: "data",
        description:
          "perceelSoort is the parcelType information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "kadastraalPerceel",
        iriType: "data",
        description:
          "kadastraalPerceel is the cadastral plot information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "verpondingsNummer",
        iriType: "data",
        description:
          "verpondingsNummer is the registration number information on Gouda Time Machine",
        hasData: true,
      },
      {
        urlId: getSaveData?._id.toString() as string,
        name: "folio",
        iriType: "data",
        description:
          "folio is the folio information on Gouda Time Machine",
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
      return "gtm URL and IRI Seed data created successfully"
    }
  } catch (error) {
    return `Error seeding data: ${error}`
  }
};

export default SeedGtm;
