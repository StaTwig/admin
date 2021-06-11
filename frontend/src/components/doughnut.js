import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { getProductList } from "../actions/productActions";
import EmptyInventory from "../assets/icons/EmptyInventory.png";

const ChartsPage = (props) => {
  const [doughnut, setDoughnut] = useState({});
  const [validdata,setValiddata]=useState(false);
  
  useEffect(() => {
    async function fetchData() {
      const productList = await getProductList();
      const productArray = productList.message;
      const result = productArray.slice(0, 10);
      const productNames = result.map((product) => product.productName);
      const quantity = result.map((product) => product.quantity);
     
      if(productNames.length>0)
      {
        setValiddata(true);
        setDoughnut({
          labels: productNames,
          datasets: [
            {
              data: quantity,
              backgroundColor: [
                "#ffbcc4",
                "#c1e3f2",
                "#ffc18c",
                "#ffef83",
                "#d4e7ff",
                "#e0b0ff",
                "#EDE7F6",
                "#D1C4E9",
                "#B39DDB",
                "#9575CD",
                "#E0F7FA",
                "#B2EBF2",
                "#80DEEA",
                "#4DD0E1",
                "#78909C",
                "#607D8B",
                "#546E7A",
                "#455A64",
              ],
              hoverBackgroundColor: [
                "#ffbcc4",
                "#c1e3f2",
                "#ffc18c",
                "#ffef83",
                "#d4e7ff",
                "#e0b0ff",
                "#EDE7F6",
                "#D1C4E9",
                "#B39DDB",
                "#9575CD",
                "#9575CD",
                "#E0F7FA",
                "#B2EBF2",
                "#80DEEA",
                "#4DD0E1",
                "#78909C",
                "#607D8B",
                "#546E7A",
                "#455A64",
              ],
            },
          ],
        });
      }
     
     
    }
    fetchData();
  }, []);
  //const filteredInventoriesKeys = inventoriesKeys.filter(inventory => inventory !== 'tot_qty' && inventory !== 'tot_inv')
  
  const option = {
    maintainAspectRatio: true,
    responsive: true,
    layout: {
            padding: {
                left: 0,
                right: 0,
                top:0,
                bottom:0
            }
        },
  legend: {
  position: 'right',
  padding:10,
  labels: {
  usePointStyle: true,

  }
 }
}

  return (
    <div>
      { validdata  ? 
  (   
    <MDBContainer>
    <Doughnut id="doughnut-chart" data={doughnut} options={option} />
  </MDBContainer>
  
   
  )   : (
      <div className="summaryTable justify-content-center ">
      <div className="d-flex flex-column ">
        <img src={EmptyInventory} height="200" width="200" />
      </div>
      </div>
     )
    }
  </div>
  );
};

export default ChartsPage;
