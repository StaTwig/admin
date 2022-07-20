import React from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
import Networking from "../../components/networking/Networking";
import { getUserInfoUpdated } from "../../actions/userActions";
import { getBestSellers, getmanufacturerInStockReport, getmanufacturerOutStockReport, getManufacturerWarehouses, getManufacturerFilterOptions } from "../../actions/networkActions";

const NetworkingContainer = (props) => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = React.useState();
  const [bestseller, setBestseller] = React.useState();
  const [inStock, setInStock] = React.useState();
  const [outStock, setOutStock] = React.useState();
  const [manufacturer, setManufacturer] = React.useState();
  const [oManufacturer, setOManufacturer] = React.useState();
  React.useEffect(() => {
    (async () => {
      const response = await getUserInfoUpdated();
      const {
        organisation,
      } = response.data.data;
      setUser(response?.data?.data);
      const org = organisation?.split('/');
      const bestSellers = await getBestSellers();
      setBestseller(bestSellers.data.bestSellers);
      const inStock = await getmanufacturerInStockReport();
      setInStock(inStock.data);
      const outStock = await getmanufacturerOutStockReport();
      setOutStock(outStock.data.outOfStock);
      const warehouses = await getManufacturerWarehouses(org[0], "");
      console.log(warehouses, "warehouses");
      setManufacturer(warehouses.data);
      const filterWarehouse = await getManufacturerFilterOptions("org");
      setOManufacturer(filterWarehouse.data);
    })();
  }, []);
  return (
    <div className="container-fluid p-0">
      <Header {...props} t={t} />
      <div className="d-flex">
        <Sidebar {...props} t={t} />
        <div className="Network-content">
          <Networking
            user={user}
            bestseller={bestseller}
            inStock={inStock}
            outStock={outStock}
            manufacturer={manufacturer}
            oManufacturer={oManufacturer}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkingContainer;
