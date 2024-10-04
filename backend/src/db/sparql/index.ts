import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";


// Define the base URI for your data
const sparqlEndpoint = process.env.SPARQL_ENDPOINT;

console.log("sparql endpoint: ",sparqlEndpoint);

async function runQuery(sparqlQuery: string) {
  const sparqlFetcher = new SparqlEndpointFetcher({
    timeout: 6000,
  });

  const bindingsStream = await sparqlFetcher.fetchBindings(sparqlEndpoint, sparqlQuery);

  const results: any[] = [];

  // Listen to the data event to collect results
  bindingsStream.on('data', (data) => {
    results.push(data);
  });

  // Return a promise that resolves when the stream ends
  return new Promise((resolve, reject) => {
    bindingsStream.on('end', () => {
      resolve(results);
    });

    bindingsStream.on('error', (error) => {
      reject(error);
    });
  });
}

export default runQuery;


