import mongoose from "mongoose";
import { NewURL, UpdateURL } from "../dto/lod.dto";
import Model from "../models";

async function createURL(newURL: NewURL) {
    try {
        const urlModel = Model.URLs;

        const urlExist = await urlModel.exists({prefixURL: newURL.prefixURL});
        if (urlExist){
            throw new Error('URL exist please try another');
        }

        const saveURL = await urlModel.create({...newURL});
        return saveURL;
    } catch (error) {
        return error as Error;
    }
}

async function getURLById(id: string) {
    try {
        const urlModel = Model.URLs;
        const isId = mongoose.Types.ObjectId.isValid(id);

        if (!isId) {
            throw new Error('Invalid url id');
        }
        const url = await urlModel.findById(id);

        if (!url) {
            throw new Error('No url was found');
        }

        return url;
    } catch (error) {
        return error as Error;
    }
}

async function getURLByURL(urlData: string) {
    try {
        const urlModel = Model.URLs;
        const url = await urlModel.findOne({prefixURL: urlData});

        if (!url) {
            throw new Error('No url was found');
        }

        return url;
    } catch (error) {
        return error as Error;
    }
}

async function getAllURLs() {
    try {
        const urlModel = Model.URLs;
    
        const urls = await urlModel.find()

        return urls
    } catch (error) {
        return error as Error;
    }
}

async function updateURLById(updateURL: UpdateURL) {
    try {
        const isId = mongoose.Types.ObjectId.isValid(updateURL.id);
        if (!isId) {
            throw new Error('Invalid url id');
        }

        const urlModel = Model.URLs;

        const update = {
            prefixName: updateURL.prefixName,
            prefixURL: updateURL.prefixURL,
            description: updateURL.description
        }

        const urlUpdate = await urlModel.findOneAndUpdate(
            { _id: updateURL.id },
            update,
            { new: true }
        )

        if (!urlUpdate) {
            throw new Error("Something went wrong");
        }

        return urlUpdate
    } catch (error) {
        return error as Error;
    }
}

async function deleteURL(id: string) {
    try {
        const urlModel = Model.URLs;
        const isId = mongoose.Types.ObjectId.isValid(id);
        if (!isId) {
            throw new Error('Invalid url id');
        }

        const urlDeleted = await urlModel.findByIdAndRemove(id)

        if (!urlDeleted) {
            throw new Error("URL does not exist")
        }

        return urlDeleted;
    } catch (error) {
        return error as Error;
    }
}

const URLService = {
    createURL,
    getAllURLs,
    updateURLById,
    getURLById,
    getURLByURL,
    deleteURL
}

export default URLService;