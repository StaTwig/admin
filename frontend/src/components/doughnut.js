import React, { useState,useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { getProductList} from '../actions/productActions';

const ChartsPage = (props) => {
 const [ doughnut , setDoughnut ] = useState({});
  useEffect(() => {
    async function fetchData() {
     const result = await getProductList();
     const productNames = result.message.map(product => product.productName);
     const quantity = result.message.map(product => product.quantity);
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
             "#000000",
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
             "#000000",
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
   
           ]
         }
       ],
   
     })
    }
    fetchData();

  },[]);
  //const filteredInventoriesKeys = inventoriesKeys.filter(inventory => inventory !== 'tot_qty' && inventory !== 'tot_inv')


  return (
    <MDBContainer>
      <Doughnut 
      id="doughnut-chart" height="200px"
      data={doughnut}
      />
    </MDBContainer>
  );
};


export default ChartsPage;
