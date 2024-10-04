import { Request, Response } from "express";
import { NewClassToDomain, QueryParams, QuerySingleParams } from "../dto/lod.dto";
import LodService from "../services/lod.service";

async function createClassToDomain(req: Request, res: Response) {
  try {
    let classToDomainData: NewClassToDomain = req.body;

    const classToDomainResult = await LodService.joinClassToDomain(
      classToDomainData
    );
    if (classToDomainResult instanceof Error) {
      return res.status(400).json({ message: classToDomainResult.message });
    }

    return res.status(201).json({ data: classToDomainResult });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function getDynamicData(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json("Invalid id");
    }

    const getResult = await LodService.querySparqlByClass(id);
    if (getResult instanceof Error) {
      return res.status(400).json({ error: getResult.message });
    }

    return res.status(200).json({ data: getResult });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function getDomainNames(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json("Invalid id");
    }

    const getNames = await LodService.getDomainName(id);
    if (getNames instanceof Error) {
      return res.status(400).json({ error: getNames.message });
    }

    return res.status(200).json({ data: getNames });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function getDynamicDataByName(req: Request, res: Response) {
  try {
    const dataQuery: QueryParams = req.body;

    if (!dataQuery.classId || dataQuery.classId === "") {
      return res.status(400).json("Invalid id");
    }

    const getResult = await LodService.querySparqlByClassAndName(
      dataQuery
    );
    if (getResult instanceof Error) {

      console.log("error querySparqlByClassAndName:", getResult);

      return res.status(400).json({ error: getResult.message });
    };

    return res.status(200).json({ data: getResult });
  } catch (error) {

    console.log("general error getResult1");

    res.status(400).json({ error: error });
  }
}

async function getSingleDynamicDataByName(req: Request, res: Response) {
  try {
    const dataQuery: QuerySingleParams = req.body;

    if (!dataQuery.classId || dataQuery.classId === "") {
      return res.status(400).json("Invalid id");
    }


    console.log(dataQuery);

    const getResult = await LodService.querySingleSparqlByClassAndName(
      dataQuery
    );
    if (getResult instanceof Error) {
      return res.status(400).json({ error: getResult.message });
    };

    return res.status(200).json({ data: getResult });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

const LodController = {
  createClassToDomain,
  getDynamicData,
  getDomainNames,
  getDynamicDataByName,
  getSingleDynamicDataByName,
};

export default LodController;
