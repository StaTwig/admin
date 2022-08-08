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
  getInStockFilterOptions
} from "../../actions/networkActions";

const NetworkingContainer = (props) => {
  const { t } = useTranslation();
  const [user, setUser] = React.useState();
  const [bestseller, setBestseller] = React.useState();
  const [TopBestseller, setTopBestseller] = React.useState();
  const [inStock, setInStock] = React.useState([]);
  const [inStockFilters, setInStockFilters] = React.useState();
  const [outStock, setOutStock] = React.useState();
  const [MainTab, setMainTab] = useState("INSTOCK");
  const [InstockType, setInstockType] = useState("");
  const [InstockId, setInstockId] = useState("");
  const date = new Date();
  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const [manufacturer, setManufacturer] = React.useState({
    myLocations: 0,
    partnerLocations: 0,
  });
  const [oManufacturer, setOManufacturer] = React.useState([]);
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
    if (inStockFilters) setInStockFilters(inStockFilters.filters);
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
      const inStock = await getmanufacturerInStockReport(
        reportWarehouse,
        startDate
      );
      if(InstockType && InstockType === "productCategory")
        setInStock(inStock.data.inStockReport.filter((item) => item.productCategory === InstockId));
      else
        setInStock(inStock.data.inStockReport.filter((item) => item._id === InstockId));
    }
    filterInstockReports();
  }, [InstockType, InstockId])
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
            setInstockType={setInstockType}
            setInstockId={setInstockId}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkingContainer;
