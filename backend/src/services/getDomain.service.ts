import findClass from "./findClass.service";

async function getDomainsInDomain(domianMap: Map<string, string>) {
  try {
    const getData = new Map();
    for (const [key, value] of domianMap) {
      try {
        const classExist = await findClass.findClassId(key);
        if (classExist instanceof Error) {
        } else {
          const getLoopData = await loopData(classExist);
          if (getLoopData instanceof Error) {
            console.log(getLoopData);
          } else {
            const name = getLoopData.firstData;
            if (getData.has(name)) {
              const existingValue = getData.get(name);
              existingValue.push(...getLoopData.classInfoArray);
              getData.set(name, existingValue);
            } else {
              getData.set(name, getLoopData.classInfoArray);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (getData.size !== 0) {
      // Convert getData to string
      let resultString = "";
      getData.forEach((val, key) => {
        val.map((item: any) => {
          resultString += `?${key} ${item.prefixName}:${item.domainName} ?${item.domainName}`;
        });
      });

      return resultString;
    }
  } catch (error) {
    return error as Error;
  }
}

async function loopData(arr: any[]) {
  try {
    const classInfoArray: { prefixName: string; domainName: string }[] = [];
    arr.forEach((data) => {
      const prefixName = data.domainId.urlId.prefixName;
      const domainName = data.domainId.name;
      classInfoArray.push({ prefixName, domainName });
    });
    // Get the value from className Map as a string
    const firstData = arr[0].classId.name;

    const result = {
      classInfoArray,
      firstData,
    };
    return result;
  } catch (error) {
    return error as Error;
  }
}

const getDomains = {
  getDomainsInDomain,
};

export default getDomains;
