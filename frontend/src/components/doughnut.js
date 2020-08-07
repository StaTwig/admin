import React, { useState,useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { getInventories} from '../actions/inventoryActions';

const ChartsPage = (props) => {

  useEffect(() => {
    async function fetchData() {
      getInventories();
    }
    fetchData();

  },[]);
  const inventoriesKeys  = Object.keys(props.inventoriesCount.dict);
  //const filteredInventoriesKeys = inventoriesKeys.filter(inventory => inventory !== 'tot_qty' && inventory !== 'tot_inv')
  const labels = inventoriesKeys.filter(inventoryKey => props.inventoriesCount.dict[inventoryKey] !== 0);
  //const data = props.inventoriesCount[filteredInventoriesKeys]
  const data = labels.map((product, index) => (
    props.inventoriesCount.dict[product]
 ))
  const [dataDoughnut] = useState({
    labels: labels,
    datasets: [
      {
        data: data,
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

  });

  return (
    <MDBContainer>
      <Doughnut data={dataDoughnut}/>
    </MDBContainer>
  );
};


export default ChartsPage;