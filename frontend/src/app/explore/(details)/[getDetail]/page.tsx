"use client";

import React, { useEffect, useState } from "react";
import getDomainNames from "@/lib/getDomainNames";
import getSingleDetail from "@/lib/getSingleDetail";
import getClassDetailByObject from "@/lib/getClassDetailsByObject";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const LeafletMapView = dynamic(() => import("@/components/LeafletMapView"), { ssr: false });


import Image from "next/image";
import Loading from "@/app/loading";

interface pageProps {
  params: { getDetail: string };
}

interface dataInfo {
  name: string;
  classId: string;
  domainName: string[];
}

interface classDataInfo {
  classId: string;
  domainName: string[];
}

function ClassDetails({ params }: pageProps) {
  const [data, setData] = useState([]);
  const [nameData, setNameData] = useState([]);
  const [datailName, setDetailName] = useState("");
  const [q, setQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const [formData, setFormData] = useState<dataInfo>({
    name: "",
    classId: params.getDetail,
    domainName: [],
  });
  const [classDetail, setClassDetail] = useState<classDataInfo>({
    classId: params.getDetail,
    domainName: ["name"],
  });
  const router = useRouter();

  const getData = async (id: string) => {
    try {
      // const res = await getClassDetails(id);
      await getClassDetailByObject(classDetail).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  const getNames = async (id: string) => {
    try {
      await getDomainNames(id).then((res) => {
        // console.log("getNames:",res.data);
        setFormData((prevData) => ({
          ...prevData,
          domainName: res.data,
        }));
        setIsLoaded(true);
        setNameData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("Load data and names", params.getDetail);

    if (data && formData.domainName.length > 0) {
      handleSubmit();
    } else {
      getData(params.getDetail);
      getNames(params.getDetail);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classDetail, params.getDetail, router, formData]);

  const handleNameToggle = async (name: string) => {
    const updateDomainName = formData.domainName.includes(name)
      ? formData.domainName.filter((n) => n !== name)
      : [...formData.domainName, name];

    setFormData((prevData) => ({
      ...prevData,
      domainName: updateDomainName,
    }));

    // await handleSubmit(formData);
  };

  const handleSubmit = async () => {
    if (!formData.name) return;
    try {
      setIsLoaded(false);
      // console.log(formData);
      await getSingleDetail(formData).then((res) => {
        setModalData(res.data);
        setIsLoaded(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      name: data.name.value,
      domainName: [],
    }));
    setDetailName(data.name.value);
    setModalData({});
    setIsLoaded(false);
    setShowSettings(false);
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="bg-gray-200 px-5 rounded-full w-full py-4">
        <input
          type="text"
          placeholder="Search"
          value={q}
          className="bg-transparent outline-none w-full"
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {data
          .filter((item: any) => {
            if (!q || q === "") {
              return item;
            } else if (
              item.name.value.toLowerCase().includes(q.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item: any, i: any) => (
            <button
              type="button"
              key={i}
              className="p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-200 hover:text-gray-900"
              onClick={() => handleModal(item)}
            >
              <h5 className="mb-2 text-xl  tracking-tight text-gray-900">
                {item.name.value}
              </h5>
            </button>
          ))}
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full max-w-3xl max-h-full">
              <div className="relative bg-white rounded-lg shadow max-h-full">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  onClick={() => setShowModal(false)}
                >
                  <Image
                    className="w-4 h-4 mr-2"
                    src="/close.svg"
                    alt="Close"
                    width={24}
                    height={24}
                    priority
                  />
                  <span className="sr-only">Close Modal</span>
                </button>

                <div className="px-6 py-4 border-b rounded-t">
                  <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
                    {datailName}
                  </h3>
                </div>
                <div className="absolute px-6 py-4 right-0">
                  <button
                    type="button"
                    className=" text-gray-400 bg-transparent cursor-pointer hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                    onClick={() => {
                      setShowSettings(!showSettings);
                    }}
                  >
                    <Image
                      className="w-6 h-6 mr-2"
                      src="/settings.svg"
                      alt="Settings"
                      width={24}
                      height={24}
                      priority
                    />
                    <span className="sr-only">Option</span>
                  </button>
                </div>
                {showSettings && (
                  <div className="flex bg-gray-200 p-4 space-y-3">
                    <div className=" overflow-x-auto">
                      {nameData.map((item: any, i: any) => (
                        <div key={i}>
                          <label>
                            <input
                              type="checkbox"
                              checked={formData.domainName.includes(item)}
                              onChange={() => handleNameToggle(item)}
                              aria-label={`Toggle ${item}`}
                            />
                            <span className="ms-2 text-sm text-gray-900">
                              {item === "hasGeometry"
                                ? "Map"
                                : item === "item_set"
                                ? "Image"
                                : item}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="hidden text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
                        onClick={() => handleSubmit}
                      >
                        Click to see
                      </button>
                    </div>
                  </div>
                )}

                {!isLoaded && <Loading />}

                {modalData ? (
                  <>
                    <div className="p-6 flex-auto">
                      {modalData && modalData.startDate !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Start Date{": "}
                          <span className="text-sm">
                            {modalData.startDate.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.endDate !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          End Date{": "}
                          <span className="text-sm">
                            {modalData.endDate.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.buurtOfWijkCode !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Buurt Of Wijk Code{": "}
                          <span className="text-sm">
                            {modalData.buurtOfWijkCode.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.buurtOfWijkNaam !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Buurt Of Wijk Naam{": "}
                          <span className="text-sm">
                            {modalData.buurtOfWijkNaam.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.breedte !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Breedte{": "}
                          <span className="text-sm">
                            {modalData.breedte.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.gewelfvorm !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Gewelfvorm{": "}
                          <span className="text-sm">
                            {modalData.gewelfvorm.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.historischeWaarde !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          HistorischeWaarde{": "}
                          <span className="text-sm">
                            {modalData.historischeWaarde.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.hoofdvorm !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Hoofdvorm{": "}
                          <span className="text-sm">
                            {modalData.hoofdvorm.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.hoogte !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Hoogte{": "}
                          <span className="text-sm">
                            {modalData.hoogte.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.lengte !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Lengte{": "}
                          <span className="text-sm">
                            {modalData.lengte.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.ligging !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Ligging{": "}
                          <span className="text-sm">
                            {modalData.ligging.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.description !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Description{": "}
                          <span className="text-sm">
                            {modalData.description.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.datumBesluit !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          DatumBesluit{": "}
                          <span className="text-sm">
                            {modalData.datumBesluit.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.datumInwerkingtreding !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          datumInwerkingtreding{": "}
                          <span className="text-sm">
                            {modalData.datumInwerkingtreding.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.heeftFunctie !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          heeftFunctie{": "}
                          <span className="text-sm">
                            {modalData.heeftFunctie.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.omschrijving !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          omschrijving{": "}
                          <span className="text-sm">
                            {modalData.omschrijving.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.registratiedatum !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          registratiedatum{": "}
                          <span className="text-sm">
                            {modalData.registratiedatum.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.rijksmonumentnummer !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Rijksmonumentnummer{": "}
                          <span className="text-sm">
                            {modalData.rijksmonumentnummer.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.alternateName !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Alternate Name{": "}
                          <span className="text-sm">
                            {modalData.alternateName.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.status !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Status{": "}
                          <span className="text-sm">
                            {modalData.status.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.wijk !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Wijk{": "}
                          <span className="text-sm">
                            {modalData.wijk.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.genoemdNaar !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          genoemdNaar{": "}
                          <span className="text-sm">
                            {modalData.genoemdNaar.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.huisnummer !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Huisnummer{": "}
                          <span className="text-sm">
                            {modalData.huisnummer.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.postcode !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Postcode{": "}
                          <span className="text-sm">
                            {modalData.postcode.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.mentions !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          mentions{": "}
                          <span className="text-sm">
                            {modalData.mentions.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.cbsWijkcode !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          CBS Wijk Code{": "}
                          <span className="text-sm">
                            {modalData.cbsWijkcode.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.sectie !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Sectie{": "}
                          <span className="text-sm">
                            {modalData.sectie.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.kadastraleGemeentecode !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          kadastraleGemeentecode{": "}
                          <span className="text-sm">
                            {modalData.kadastraleGemeentecode.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.adres !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          adres{": "}
                          <span className="text-sm">
                            {modalData.adres.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.temporalCoverage !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Temporal Coverage{": "}
                          <span className="text-sm">
                            {modalData.temporalCoverage.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.blad !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          blad{": "}
                          <span className="text-sm">
                            {modalData.blad.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.huisNummerToevoeging !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          huisNummerToevoeging{": "}
                          <span className="text-sm">
                            {modalData.huisNummerToevoeging.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.kadastraleAanduiding !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          KadastraleAanduiding{": "}
                          <span className="text-sm">
                            {modalData.kadastraleAanduiding.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.oppervlakte !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Oppervlakte{": "}
                          <span className="text-sm">
                            {modalData.oppervlakte.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.artikelLegger !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          artikelLegger{": "}
                          <span className="text-sm">
                            {modalData.artikelLegger.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.oatInkomenGebouwd !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          oatInkomenGebouwd{": "}
                          <span className="text-sm">
                            {modalData.oatInkomenGebouwd.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.oatInkomenOngebouwd !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          oatInkomenOngebouwd{": "}
                          <span className="text-sm">
                            {modalData.oatInkomenOngebouwd.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.perceelSoort !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          perceelSoort{": "}
                          <span className="text-sm">
                            {modalData.perceelSoort.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.hasOccupation !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          hasOccupation{": "}
                          <span className="text-sm">
                            {modalData.hasOccupation.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.disambiguatingDescription !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          disambiguatingDescription{": "}
                          <span className="text-sm">
                            {modalData.disambiguatingDescription.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.kadastraalPerceel !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          kadastraalPerceel{": "}
                          <span className="text-sm">
                            {modalData.kadastraalPerceel.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.verpondingsNummer !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          verpondingsNummer{": "}
                          <span className="text-sm">
                            {modalData.verpondingsNummer.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.plaatselijkeAanduiding !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          plaatselijkeAanduiding{": "}
                          <span className="text-sm">
                            {modalData.plaatselijkeAanduiding.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.folio !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          folio{": "}
                          <span className="text-sm">
                            {modalData.folio.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData && modalData.yearBuilt !== undefined ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          yearBuilt{": "}
                          <span className="text-sm">
                            {modalData.yearBuilt.value}
                          </span>
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.item_set !== undefined &&
                      modalData.item_set.value.large !== null ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Item Image{": "}
                          <br />
                            <Image
                              src={modalData.item_set.value.large}
                              alt={""}
                              width={1000}
                              height={200}
                            />
                        </p>
                      ) : null}

                      {modalData &&
                      modalData.media !== undefined &&
                      modalData.media.value.type === "image" ? (
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Media Image{": "}
                          <p>
                            <Image
                              src={modalData.media.value.link}
                              alt={""}
                              width={1000}
                              height={200}
                            />
                          </p>
                        </p>
                      ) : null}

                      {modalData && modalData.asWKT !== undefined ? (
                        <div>
                          <LeafletMapView
                            polygonString={modalData.asWKT.value}
                          />
                        </div>
                      ) : null}

                      {modalData && modalData.liesIn !== undefined ? (
                        <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Lies In{": "}
                          <p className="max-h-[300px] overflow-y-auto">
                            {modalData.liesIn.value.map((item: any, i: any) => (
                              <span className="text-sm" key={i}>
                                {item} <br />
                              </span>
                            ))}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative p-6 flex-auto">
                      {" "}
                      No data available for {datailName}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default ClassDetails;
