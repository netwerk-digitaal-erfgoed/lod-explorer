import { Request, Response } from "express";
import Services from "../services";
import { NewURL } from "../dto/lod.dto";

async function createURL(req: Request, res: Response) {
  try {
    let urlData: NewURL = req.body;

    const url = await Services.URLService.createURL(urlData);
    if (url instanceof Error) {
      return res.status(400).json({ message: url.message });
    }

    return res.status(201).json({ data: url });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function getURLById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json("Invalid id");
    }

    const getURL = await Services.URLService.getURLById(id);
    if (getURL instanceof Error) {
      return res.status(400).json({ error: getURL.message });
    }

    return res.status(200).json({ data: getURL });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

async function getAllURLs(req: Request, res: Response) {
  try {
    const getURLs = await Services.URLService.getAllURLs();
    if (getURLs instanceof Error) {
      return res.status(400).json({ error: getURLs.message });
    }

    return res.status(200).json({ data: getURLs });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

async function updateURL(req: Request, res: Response) {}

async function deleteURL(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json("Invalid id");
    }

    const urlDeleted = await Services.URLService.deleteURL(id);
    if (urlDeleted instanceof Error) {
      return res.status(400).json({ error: urlDeleted.message });
    }

    return res
      .status(200)
      .json({ data: { message: "URL has been deleted successfully" } });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

const URLController = {
  createURL,
  getURLById,
  getAllURLs,
  updateURL,
  deleteURL,
};

export default URLController;
