import GmtSeed from './gtm.seed';
import SdoSeed from './sdo.seed';
import GeoSeed from './geo.seed';
import CeoSeed from './ceo.seed';
import HgSeed from './hg.seed';
import OSeed from './o.seed';

import JoinClassToDomainSeed from './joinClassToDomain.seed';

const SeedData = async () => {
  try {
    const gmtSeed = await GmtSeed();
    const sdoSeed = await SdoSeed();
    const geoSeed = await GeoSeed();
    const ceoSeed = await CeoSeed();
    const hgSeed = await HgSeed();
    const oSeed = await OSeed();

    const joinClassToDomainSeed = await JoinClassToDomainSeed();

    if (gmtSeed) {
      console.log(`${gmtSeed} \n`);
    }

    if (sdoSeed) {
      console.log(`${sdoSeed} \n`);
    }

    if (geoSeed) {
      console.log(`${geoSeed} \n`);
    }

    if (ceoSeed) {
      console.log(`${ceoSeed} \n`);
    }

    if (hgSeed) {
      console.log(`${hgSeed} \n`);
    }

    if (oSeed) {
      console.log(`${oSeed} \n`);
    }

    if (joinClassToDomainSeed) {
      console.log(`${joinClassToDomainSeed} \n`);
    }
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};

export default SeedData;
