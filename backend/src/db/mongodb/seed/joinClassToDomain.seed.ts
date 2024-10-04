import { NewClassToDomain } from "../../../dto/lod.dto";
import Model from "../../../models";

const SeedJoinClassToDomain = async () => {
  try {
    const joinData = [
      {
        className: "Buurt",
        domainNames: [
          "name",
          "hasGeometry",
          "liesIn",
          "buurtOfWijkCode",
          "buurtOfWijkNaam",
          "item_set",
        ],
      },
      {
        className: "Gebouw",
        domainNames: [
          "name",
          "hasGeometry",
          "startDate",
          "endDate",
          "ligging",
          "breedte",
          "gewelfvorm",
          "historischeWaarde",
          "hoofdvorm",
          "hoogte",
          "lengte",
          "description",
          "datumBesluit",
          "datumInwerkingtreding",
          "item_set",
          "heeftFunctie",
          "omschrijving",
          "registratiedatum",
          "rijksmonumentnummer",
          "media"
        ],
      },
      {
        className: "Hofje",
        domainNames: [
          "name",
          "hasGeometry",
          "startDate",
          "endDate",
          "alternateName",
          "item_set",
        ],
      },
      {
        className: "Kunstwerk",
        domainNames: [
          "name",
          "hasGeometry",
          "status",
          "description",
          "alternateName",
          "startDate",
          "endDate",
          "item_set",
        ],
      },
      {
        className: "Kwartier",
        domainNames: [
          "name",
          "hasGeometry",
          "startDate",
          "endDate",
          "item_set",
          "liesIn",
        ],
      },
      {
        className: "Natuur",
        domainNames: [
          "name",
          "hasGeometry",
          "endDate",
          "startDate",
          "alternateName",
          "status",
        ],
      },
      {
        className: "PlaatselijkeAanduiding",
        domainNames: ["name", "hasGeometry", "item_set", "wijk", "huisnummer"],
      },
      {
        className: "Straat",
        domainNames: [
          "name",
          "hasGeometry",
          "ligging",
          "liesIn",
          "mentions",
          "genoemdNaar",
          "alternateName",
          "startDate",
          "endDate",
          "item_set",
        ],
      },
      {
        className: "StraatNummerAanduiding",
        domainNames: [
          "name",
          "hasGeometry",
          "startDate",
          "item_set",
          "huisNummer",
          "liesIn",
          "postcode",
        ],
      },
      {
        className: "Wijk",
        domainNames: [
          "name",
          "hasGeometry",
          "startDate",
          "endDate",
          "buurtOfWijkCode",
          "buurtOfWijkNaam",
          "liesIn",
          "cbsWijkcode",
          "item_set",
        ],
      },
      {
        className: "Sectie",
        domainNames: [
          "name",
          "hasGeometry",
          "item_set",
          "sectie",
          "kadastraleGemeentecode",
        ],
      },
      {
        className: "hasGeometry",
        domainNames: ["asWKT"],
      },
      {
        className: "Gevelsteen",
        domainNames: [
          "name",
          "hasGeometry",
          "adres",
          "item_set",
          "media",
          "description",
          "temporalCoverage",
        ],
      },
      {
        className: "OorspronkelijkeAanwijzendeTafelPagina",
        domainNames: [
          "name",
          "description",
          "item_set",
          "media",
          "blad",
          "sectie",
        ],
      },
      {
        className: "Hofstedegeld",
        domainNames: ["name", "item_set"],
      },
      {
        className: "Adressering",
        domainNames: [
          "hasGeometry",
          "name",
          "item_set",
          "startDate",
          "wijk",
          "huisnummer",
          "huisNummerToevoeging",
          "liesIn",
          "postcode",
        ],
      },
      {
        className: "OorspronkelijkeAanwijzendeTafelRegel",
        domainNames: [
          "name",
          "wijk",
          "kadastraleAanduiding",
          "oppervlakte",
          "artikelLegger",
          "oatInkomenGebouwd",
          "oatInkomenOngebouwd",
          "perceelSoort",
          "item_set",
          "hasOccupation",
          "disambiguatingDescription",
          "description",
        ],
      },
      {
        className: "Verponding",
        domainNames: [
          "name",
          "item_set",
          "hasGeometry",
          "kadastraalPerceel",
          "verpondingsNummer",
        ],
      },
      {
        className: "Constructie",
        domainNames: [
          "name",
          "mentions",
          "hasGeometry",
          "startDate",
          "description",
          "alternateName",
          "ligging",
          "item_set",
          "plaatselijkeAanduiding",
          "kadastraalPerceel",
          "breedte",
          "gewelfvorm",
          "historischeWaarde",
          "hoofdvorm",
          "hoogte",
          "lengte",
          "datumBesluit",
          "datumInwerkingtreding",
          "heeftFunctie",
          "omschrijving",
          "registratiedatum",
          "rijksmonumentnummer",
          "hasGeometry",
        ],
      },
      {
        className: "Index",
        domainNames: [
          "name",
          "item_set",
          "breedte",
          "historischeWaarde",
          "folio",
        ],
      },
      {
        className: "Pand",
        domainNames: [
          "yearBuilt",
          "name",
          "item_set",
          "verpondingsNummer",
          "liesIn",
          "hasGeometry",
        ],
      },
      {
        className: "HistorischNaambord",
        domainNames: [
          "hasGeometry",
          "name",
          "item_set",
          "adres",
          "media",
          "description",
          "startDate",
        ],
      },
    ];
    const iriModel = Model.IRIs;
    let isSeeded = false;

    for (const classItem of joinData) {
      const iriClassExist = await iriModel.findOne({
        name: classItem.className,
      });
      if (iriClassExist) {
        for (const domainItem of classItem.domainNames) {
          let iriDomainNameExist = await iriModel.findOne({ name: domainItem });
          if (iriDomainNameExist) {
            const newClassToDomain: NewClassToDomain = {
              classId: iriClassExist._id,
              domainId: iriDomainNameExist._id,
              hasData: true,
            };

            const joinedData = await joinClassToDomain(newClassToDomain);
            if (joinedData) {
              isSeeded = true;
            }
          }
        }
      }
    }

    if (isSeeded) {
      return "Joined Data Seed created successfully";
    }
  } catch (error) {
    return `Error seeding data: ${error}`;
  }
};

const joinClassToDomain = async (newClassToDomain: NewClassToDomain) => {
  try {
    const classToDomain = Model.ClassToDomain;
    const classExist = await classToDomain.findOne({
      classId: newClassToDomain.classId,
      domainId: newClassToDomain.domainId,
    });

    const classId = classExist?.classId.toString() as string;
    const domainId = classExist?.domainId.toString() as string;

    if (
      classId !== newClassToDomain.classId.toString() &&
      domainId !== newClassToDomain.domainId.toString()
    ) {
      const saveJoin = await classToDomain.create({ ...newClassToDomain });
      return saveJoin;
    }
  } catch (error) {
    return error;
  }
};

export default SeedJoinClassToDomain;
