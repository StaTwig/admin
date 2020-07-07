import React, { useState,useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { getInventories} from '../actions/inventoryActions';

const ChartsPage = (props) => {

  const ChartsPage = props => {
    useEffect(() => {
      async function fetchData() {
        getInventories();
      }

      fetchData();
    }, []);
    const inventoriesKeys = Object.keys(props.inventoriesCount);
    const filteredInventoriesKeys = inventoriesKeys.filter(
      inventory => inventory !== 'tot_qty' && inventory !== 'tot_inv',
    );
    const labels = filteredInventoriesKeys.filter(
      inventoryKey => props.inventoriesCount[inventoryKey] !== 0,
    );
    const [dataDoughnut] = useState({
      labels: labels,
      datasets: [
        {
          data: [
            props.inventoriesCount.bOPV,
            props.inventoriesCount.MMR,
            props.inventoriesCount.PVC,
            props.inventoriesCount.BCG,
            props.inventoriesCount.RV,
            props.inventoriesCount.HepB,
          ],
          backgroundColor: [
            '#ffbcc4',
            '#c1e3f2',
            '#ffc18c',
            '#ffef83',
            '#d4e7ff',
            '#e0b0ff',
          ],
          hoverBackgroundColor: [
            '#ffbcc4',
            '#c1e3f2',
            '#ffc18c',
            '#ffef83',
            '#d4e7ff',
            '#e0b0ff',
          ],
        },
      ],
    });

    return (
      <MDBContainer>
        <Doughnut data={dataDoughnut}/>
      </MDBContainer>
    );
  };
}

export default ChartsPage;