import express from 'express';
import lodRoute from './lod.route';
import urlRoute from './url.route';
import iriRoute from './iri.route';

const routers = express.Router();

routers.use('/lod', lodRoute);

routers.use('/url', urlRoute);

routers.use('/iri', iriRoute);

export default routers;