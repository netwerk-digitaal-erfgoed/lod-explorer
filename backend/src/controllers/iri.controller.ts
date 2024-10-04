import { Request, Response } from "express";
import Services from "../services";
import { NewIRI } from "../dto/lod.dto";

async function createIRI(req: Request, res: Response) {
  try {
    let iriData: NewIRI = req.body;

    const iri = await Services.IRIService.createIRI(iriData);
    if (iri instanceof Error) {
      return res.status(400).json({ message: iri.message });
    }

    return res.status(201).json({ data: iri });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

async function getIRIById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json("Invalid id");
    }

    const getIRI = await Services.IRIService.getIRIById(id);
    if (getIRI instanceof Error) {
      return res.status(400).json({ error: getIRI.message });
    }

    return res.status(200).json({ data: getIRI });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

async function getIRIByType(req: Request, res: Response) {
  try {
    const type = req.params.type;
    if (!type || type === "") {
      return res.status(400).json("Invalid type");
    }

    const getIRIs = await Services.IRIService.getIRIByType(type);
    if (getIRIs instanceof Error) {
      return res.status(400).json({ error: getIRIs.message });
    }

    return res.status(200).json({ data: getIRIs });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

async function getAllURLs(req: Request, res: Response) {
    try {
        const getIRIs = await Services.IRIService.getAllIRIs();
        if (getIRIs instanceof Error) {
            return res.status(400).json({ error: getIRIs.message });
        }

        return res.status(200).json({ data: getIRIs });
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

const IRIController = {
  createIRI,
  getIRIById,
  getIRIByType,
  getAllURLs,
};

export default IRIController;
