import React, { useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const ChartsPage = () => {

  const [dataDoughnut] = useState({
    labels: ["bOPV", "Hep B", "MMR"],
    datasets: [
      {
        data: [200, 200, 800],
        backgroundColor: [
          "#A6CEE3",
          "#B2DF8A",
          "#1F78B4 "
        ],
        hoverBackgroundColor: [
          "#A6CEE3",
          "#B2DF8A",
          "#1F78B4 "
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