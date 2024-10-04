import { IURLs } from "../dto/lod.dto";
import SPARQL from "../db/sparql";
import getDomains from "./getDomain.service";
import NodeCache from "node-cache";

const cacheTTL = parseInt(process.env.CACHE_TTL) || 86400;

const lodCache = new NodeCache({ stdTTL: cacheTTL });

const omekaURL = process.env.OMEKA_ENDPOINT;

async function getSparqlResult(
  arr: any[],
  domainName: string[],
  name?: string
) {
  try {
    // Create a Map to store the common URLs
    const commonURLsMap = new Map();
    const commonClassIdNamesMap = new Map();
    const commonDomainIdNamesMap = new Map();
    const allDomainIds = new Map();

    // Push "name" into domainName
    domainName.push("name");

    arr.forEach((doc) => {
      if (doc.classId && doc.classId.urlId) {
        const urlId = doc.classId.urlId as IURLs;
        commonURLsMap.set(urlId.prefixURL, {
          prefixName: urlId.prefixName,
          prefixURL: urlId.prefixURL,
        });
        commonClassIdNamesMap.set(doc.classId.name, urlId.prefixName);
      }
      if (doc.domainId && doc.domainId.urlId) {
        const urlId = doc.domainId.urlId as IURLs;
        commonURLsMap.set(urlId.prefixURL, {
          prefixName: urlId.prefixName,
          prefixURL: urlId.prefixURL,
        });
        commonDomainIdNamesMap.set(doc.domainId.name, urlId.prefixName);
        if (domainName.includes(doc.domainId.name)) {
          allDomainIds.set(doc.domainId._id, doc.domainId.name);
        }
      }
    });

    let domainString = "";
    const getData = await getDomains.getDomainsInDomain(allDomainIds);
    if (getData instanceof Error) {
      console.log(getData);
    } else {
      if (typeof getData !== "undefined") {
        domainString = getData;
      }
    }

    // Convert the Map values to an array
    const commonURLsArray = [...commonURLsMap.values()];
    let commonClassIdNames;
    if (commonClassIdNamesMap.size === 1) {
      const [classIdName, prefixName] = commonClassIdNamesMap
        .entries()
        .next().value;
      commonClassIdNames = { classIdName, prefixName };
    } else {
      commonClassIdNames = Array.from(
        commonClassIdNamesMap,
        ([classIdName, prefixName]) => ({
          classIdName,
          prefixName,
        })
      );
    }

    const commonDomainIdNamesArray = Array.from(
      commonDomainIdNamesMap,
      ([domainIdName, prefixName]) => ({ domainIdName, prefixName })
    );

    const filterDomainIdNamesArray = commonDomainIdNamesArray.filter((item) =>
      domainName.includes(item.domainIdName)
    );

    let prefixes = commonURLsArray
      .map((item) => `PREFIX ${item.prefixName}: <${item.prefixURL}>\n`)
      .join(" ");

    if (name && name !== "") {
      const o = "PREFIX o: <http://omeka.org/s/vocabs/o#>";
      if (!prefixes.includes(o)) {
        prefixes = prefixes + " " + o;
      }
    }

    const selectQuery = `
    SELECT * WHERE {
      ?url a ${
        Array.isArray(commonClassIdNames)
            ? commonClassIdNames
                .map(
                    (item) =>
                        `${item.prefixName}:${item.classIdName} ?${item.classIdName}`
                )
                .join(";\n       ")
            : commonClassIdNames.prefixName + ":" + commonClassIdNames.classIdName
    };
   
       
      ${name && name !== "" ? `o:title "${name}";` : ""}
      
     
           ${filterDomainIdNamesArray
        .map(
            (item) => {
              if (item.domainIdName === 'hasGeometry' ) {
                return `OPTIONAL { 
                      ?url ${item.prefixName}:${item.domainIdName} ?${item.domainIdName}. 
                      ${domainString.length > 0 ? domainString + " ." : ""}
                    }`
              } else{
                return `OPTIONAL { ?url ${item.prefixName}:${item.domainIdName} ?${item.domainIdName}. }`
              }

            }
        )
        .join("\n")} .
       
    
        FILTER(CONTAINS(STR(?url),"ark:"))
      
    }
    `;

    console.log(`${prefixes + "\n" + selectQuery}`);

    const result = await SPARQL(`${prefixes + "\n" + selectQuery}`); // `${prefixes}\n${selectQuery}`

    if (name && name !== "") {
      const realResult = await processUrl(result[0]);
      return realResult;
    }

    await processUrl(result);
    return result;
  } catch (error) {
    return error as Error;
  }
}

async function fetchDataAndUpdate(url: string) {
  try {
    const resp = await fetch(url, {
      method: "GET",
    });
    if (resp.ok) {
      const res = await resp.json();
      return res;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function processUrl(result: any) {
  let newData;
  Array.isArray(result)
    ? (newData = await sortMultipleURLs(result, omekaURL))
    : (newData = await sortSingleURL(result, omekaURL));
  return newData;
}

async function sortMultipleURLs(result: any, omekaURL: string) {
  // for (let i = 0; i < result.length; i++) {
  //   const liesInURL = result[i].liesIn.value;
  //   if (liesInURL.includes(omekaURL)) {
  //     const newData = await fetchDataAndUpdate(liesInURL);
  //     if (newData) {
  //       console.log("Array data: ", newData["o:id"]);
  //       // result[i].liesIn.value = newData;
  //     }
  //   }
  // }
  return result;
}

async function sortSingleURL(result: any, omekaURL: string) {
  if (result) {
    if (result.liesIn) {
      const liesInURL = result.liesIn.value;
      const liesInCacheKey = `liesIn_${liesInURL}`;
      if (liesInURL.includes(omekaURL)) {
        const liesInArray: string[] = [];
        const cacheLiesIn = lodCache.get<string[]>(liesInCacheKey);

        if (cacheLiesIn) {
          result.liesIn.value = cacheLiesIn;
        } else {
          const newData = await fetchDataAndUpdate(liesInURL);
          if (newData) {
            if (Array.isArray(newData["@reverse"]["hg:liesIn"])) {
              newData["@reverse"]["hg:liesIn"].forEach((item) => {
                liesInArray.push(item["o:title"]);
              });
              lodCache.set(liesInCacheKey, liesInArray);
              result.liesIn.value = liesInArray;
            }
          }
        }
      }
    }

    if (result.item_set) {
      const itemSetURL = result.item_set.value;
      const itemSetCacheKey = `itemSet_${itemSetURL}`;
      if (itemSetURL.includes(omekaURL)) {
        const cacheItemSet = lodCache.get(itemSetCacheKey);

        if (cacheItemSet) {
          result.item_set.value = cacheItemSet;
        } else {
          const newItemSet = await fetchDataAndUpdate(itemSetURL);
          if (newItemSet) {
            lodCache.set(
              itemSetCacheKey,
              newItemSet["thumbnail_display_urls"]
            );
            result.item_set.value = newItemSet["thumbnail_display_urls"];
          }
        }
      }
    }

    if (result.media) {
      const mediaURL = result.media.value;
      const mediaCacheKey = `itemSet_${mediaURL}`;
      let mediaResult = {
        type: "",
        link: ""
      };
      if (mediaURL.includes(omekaURL)) {
        const cacheItemSet = lodCache.get(mediaCacheKey);

        if (cacheItemSet) {
          result.media.value = cacheItemSet;
        } else {
          const newMedia = await fetchDataAndUpdate(mediaURL);
          if (newMedia) {
            const lowerCaseLink = newMedia["o:original_url"].toLowerCase();
            if (lowerCaseLink.endsWith('.pdf')) {
              mediaResult.type = "file"
            } else {
              mediaResult.type = "image"
            }
            mediaResult.link = newMedia["o:original_url"];
            lodCache.set(
              mediaCacheKey,
              mediaResult
            );
            result.media.value = mediaResult;
          }
        }
      }
    }
  }

  return result;
}

const omekaData = {
  getSparqlResult,
};

export default omekaData;
