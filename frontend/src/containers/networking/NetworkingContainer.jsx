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
} from "../../actions/networkActions";

const NetworkingContainer = (props) => {
  const { t } = useTranslation();
  const [user, setUser] = React.useState();
  const [bestseller, setBestseller] = React.useState();
  const [TopBestseller, setTopBestseller] = React.useState();
  const [inStock, setInStock] = React.useState();
  const [outStock, setOutStock] = React.useState();
  const [MainTab, setMainTab] = useState("INSTOCK");

  const [manufacturer, setManufacturer] = React.useState({
    myLocations: 0,
    partnerLocations: 0,
  });
  const [oManufacturer, setOManufacturer] = React.useState([]);
  const [reportWarehouse, setReportWarehouse] = useState("");
  const [partnerLocation, setPartnerLocation] = useState(false);
  const [MylocationFilter, setMylocationFilter] = useState(false);
  const getBestsellers = async () => {
    const bestSellers = await getBestSellers(reportWarehouse);
    setBestseller(bestSellers.data.bestSellers);
  };
  const getTopBestsellers = async () => {
    const bestSellers = await getBestSellerSummary(reportWarehouse);
    setTopBestseller(bestSellers.data.bestSellers);
    setReportWarehouse(bestSellers.data.warehouseId);
  };
  const getInstock = async () => {
    const inStock = await getmanufacturerInStockReport(reportWarehouse);
    setInStock(inStock.data.inStockReport);
    setReportWarehouse(inStock.data.warehouseId);
  };
  const getOutStock = async () => {
    const outStock = await getmanufacturerOutStockReport(reportWarehouse);
    setOutStock(outStock.data.outOfStockReport);
    setReportWarehouse(outStock.data.warehouseId);
  };
  const getWarehouses = async (org) => {
    const warehouses = await getManufacturerWarehouses("", "", partnerLocation, MylocationFilter);
    setManufacturer(warehouses.data);
  };
  const getManFilters = async () => {
    const filterWarehouse = await getManufacturerFilterOptions("org");
    setOManufacturer(filterWarehouse.data);
  };
  useEffect(() => {
    getTopBestsellers();
  }, []);
  useEffect(() => {
    (async () => {
      getBestsellers();
      getInstock();
      getOutStock();
      getManFilters();
    })();
  }, [reportWarehouse, MainTab]);
 
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
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkingContainer;
