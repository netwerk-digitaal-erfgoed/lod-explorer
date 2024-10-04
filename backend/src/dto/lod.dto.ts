import mongoose from "mongoose";

export interface NewIRI {
  urlId: string;
  name: string;
  iriType: string;
  description: string;
  hasData: boolean;
}

export interface UpdateIRI {
  id: string;
  urlId: string;
  name: string;
  iriType: string;
  description: string;
  hasData: boolean;
}

export interface NewURL {
  prefixName: string;
  prefixURL: string;
  description: string;
}

export interface UpdateURL {
  id: string;
  prefixName: string;
  prefixURL: string;
  description: string;
}

export interface NewClassToDomain {
  classId: string;
  domainId: string;
  hasData: boolean;
}

export interface IURLs extends mongoose.Document {
  prefixName: string;
  prefixURL: string;
  description: string;
}

export interface IIRIs extends mongoose.Document {
  urlId: mongoose.Types.ObjectId;
  name: string;
  iriType: string;
  description: string;
  hasData: string;
}

export interface QueryParams {
  classId: string;
  domainName: string[];
}

export interface QuerySingleParams {
  name: string;
  classId: string;
  domainName: string[];
}
