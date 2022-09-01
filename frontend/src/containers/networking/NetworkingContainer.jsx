import React, { useState, useEffect } from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
import Networking from "../../components/networking/Networking";
import { getUserInfoUpdated } from "../../actions/userActions";
import {
  getBestSellers,
  getmanufacturerInStockReport,
  getmanufacturerOutStockReport,
  getManufacturerWarehouses,
  getManufacturerFilterOptions,
  getBestSellerSummary,
  getInStockFilterOptions,
  getOutStockFilterOptions
} from "../../actions/networkActions";

const NetworkingContainer = (props) => {
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const [bestseller, setBestseller] = useState();
  const [TopBestseller, setTopBestseller] = useState();
  const [inStock, setInStock] = useState([]);
  const [inStockFilters, setInStockFilters] = useState();
  const [outStockFilters, setOutStockFilters] = useState();
  const [outStock, setOutStock] = useState([]);
  const [MainTab, setMainTab] = useState("INSTOCK");
  const [InstockType, setInstockType] = useState("");
  const [OutstockType, setOutstockType] = useState("");
  const [OutstockId, setOutstockId] = useState("");
  const [InstockId, setInstockId] = useState("");
  const date = new Date();
  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const [manufacturer, setManufacturer] = useState({
    myLocations: 0,
    partnerLocations: 0,
  });
  const [oManufacturer, setOManufacturer] = useState([]);
  const [reportWarehouse, setReportWarehouse] = useState("");
  const [partnerLocation, setPartnerLocation] = useState(false);
  const [MylocationFilter, setMylocationFilter] = useState(false);

  const getBestsellers = async () => {
    const bestSellers = await getBestSellers(reportWarehouse, startDate);
    if (bestSellers) setBestseller(bestSellers.data.bestSellers);
  };
  const getTopBestsellers = async () => {
    const bestSellers = await getBestSellerSummary(reportWarehouse);
    if (bestSellers) setTopBestseller(bestSellers.data.bestSellers);
    if (bestSellers) setReportWarehouse(bestSellers.data.warehouseId);
  };
  const getInstock = async (startDate) => {
    const inStock = await getmanufacturerInStockReport(
      reportWarehouse,
      startDate
    );
    if (inStock) setInStock(inStock.data.inStockReport);
    if (inStock) setReportWarehouse(inStock.data.warehouseId);
  };
  const getInstockFilters = async () => {
    const inStockFilters = await getInStockFilterOptions(
      reportWarehouse,
      ""
    );
    const outStockFilters = await getOutStockFilterOptions(
      reportWarehouse,
      ""
    );
    if (inStockFilters) setInStockFilters(inStockFilters.filters);
    if(outStockFilters) setOutStockFilters(outStockFilters.filters);
  };
  const getOutStock = async () => {
    const outStock = await getmanufacturerOutStockReport(
      reportWarehouse,
      startDate
    );
    if (outStock) setOutStock(outStock.data.outOfStockReport);
    if (outStock) setReportWarehouse(outStock.data.warehouseId);
  };
  const getWarehouses = async (org) => {
    const warehouses = await getManufacturerWarehouses(
      "",
      "",
      partnerLocation,
      MylocationFilter
    );
    setManufacturer(warehouses.data);
  };
  const getManFilters = async () => {
    const filterWarehouse = await getManufacturerFilterOptions("org");
    setOManufacturer(filterWarehouse.data);
  };
  useEffect(() => {
    getManFilters();
    getInstockFilters();
    getTopBestsellers();
  }, []);
  useEffect(()=>{
    async function filterInstockReports(){
      let pname;
      let type;
      if(InstockType && InstockType === "clear"){
        pname = null;
        type = null;
      }
      else if(InstockType && InstockType === "productCategory"){
          type = InstockId;
      }
        else{
          pname = InstockId;
        }

      const inStock = await getmanufacturerInStockReport(
        reportWarehouse,
        startDate,
        type,
        pname
      );

        setInStock(inStock.data.inStockReport);
    }
    filterInstockReports();
  }, [InstockType, InstockId])


  useEffect(()=>{
    async function filterOustockReports(){
      let pname;
      let type;
      if(OutstockType && OutstockType === "clear"){
        pname = null;
        type = null;
      }
      else if(OutstockType && OutstockType === "productCategory"){
          type = OutstockId;
      }
        else{
          pname = OutstockId;
        }
      const outStock = await getmanufacturerOutStockReport(
        reportWarehouse,
        startDate,
        type,
        pname
      );

        setOutStock(outStock.data.outOfStockReport);
    }
    filterOustockReports();
  }, [OutstockType, OutstockId])
  
  useEffect(() => {
    (async () => {
      getBestsellers(startDate);
      getInstock(startDate);
      getOutStock(startDate);
    })();
  }, [reportWarehouse, MainTab, startDate]);

  useEffect(() => {
    (async () => {
      const response = await getUserInfoUpdated();
      const { organisation } = response.data.data;
      setUser(response?.data?.data);
      const org = organisation?.split("/");
      getWarehouses(org);
    })();
  }, [partnerLocation, MylocationFilter]);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='Network-content'>
          <Networking
            user={user}
            bestseller={bestseller}
            TopBestseller={TopBestseller}
            inStock={inStock}
            outStock={outStock}
            manufacturer={manufacturer}
            MainTab={MainTab}
            setMainTab={setMainTab}
            setPartnerLocation={setPartnerLocation}
            oManufacturer={oManufacturer}
            reportWarehouse={reportWarehouse}
            setReportWarehouse={(param) => setReportWarehouse(param)}
            partnerLocation={partnerLocation}
            MylocationFilter={MylocationFilter}
            setMylocationFilter={setMylocationFilter}
            startDate={startDate}
            setStartDate={setStartDate}
            inStockFilters={inStockFilters}
            outStockFilters={outStockFilters}
            setInstockType={setInstockType}
            setInstockId={setInstockId}
            setOutstockType={setOutstockType}
            setOutstockId={setOutstockId}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkingContainer;
