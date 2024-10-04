# lod-explorer

start the project:
Run `docker-compose up -d` to start a mongo server in docker.

copy `.env.example` to `.env` and change accordingly.

`cd backend && npm install`   
`cd frontend && npm install`   

`npm run start`   

The seeds are holding data from several ontologies:   

| Seed | Ontology                                        |
|------|-------------------------------------------------|
| ceo  | https://linkeddata.cultureelerfgoed.nl/def/ceo# |
| geo  | http://www.opengis.net/ont/geosparql#           |
| gtm  | https://www.goudatijdmachine.nl/def#            |
| hg   | http://rdf.histograph.io/                       |
| o    | http://omeka.org/s/vocabs/o#                    |
| sdo  | https://schema.org/                             |

