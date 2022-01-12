import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { getProductList } from "../actions/productActions";
import EmptyInventory from "../assets/icons/EmptyInventory-min.png";

const ChartsPage = (props) => {
  const [doughnut, setDoughnut] = useState({});
  const [validdata, setValiddata] = useState(false);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    async function fetchData() {
      const productList = await getProductList();
      const productArray = productList.message;
      const result = productArray.slice(0, 10);
      const productNames = result?.map((product) => product.productName);
      const quantity = result?.map((product) => product.quantity);

      const productNameShorted = productNames?.map((product) =>
        truncate(product, 15)
      );

      if (productNames.length > 0) {
        setDoughnut({
          labels: productNameShorted,
          datasets: [
            {
              data: quantity,
              backgroundColor: [
                "#D8E5FB",
                "#FFEF83",
                "#DFF1F2",
                "#EBDDED",
                "#D9E5EF",
                "#FFC18C",
                "#F1DDC6",
                "#BCFFF2",
                "#FFD0CA",
                "#63B7AF",
              ],
              hoverBackgroundColor: [
                "#D8E5FB",
                "#FFEF83",
                "#DFF1F2",
                "#EBDDED",
                "#D9E5EF",
                "#FFC18C",
                "#F1DDC6",
                "#BCFFF2",
                "#FFD0CA",
                "#63B7AF",
              ],
            },
          ],
        });
        setValiddata(true);
      }
    }
    fetchData();
  }, []);
  //const filteredInventoriesKeys = inventoriesKeys.filter(inventory => inventory !== 'tot_qty' && inventory !== 'tot_inv')

  const option = {
    cutout: "75%",
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        position: "right",
        padding: 10,
        labels: {
          usePointStyle: true,
          fontFamily: "Source Sans Pro",
        },
      },
    },
  };

  return (
    <div>
      {validdata ? (
        <Doughnut
          height={250}
          id='doughnut-chart'
          data={doughnut}
          options={option}
        />
      ) : (
        <div className='summaryTable justify-content-center '>
          <div className='d-flex flex-column '>
            <img src={EmptyInventory} height='200' width='200' alt='' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsPage;
