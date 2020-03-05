import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
state = {
  dataDoughnut: {
    labels: ["bOPV", "Hep B", "MMR"],
    datasets: [
      {
        data: [200, 200, 800],
        backgroundColor: [
        
        "#A6CEE3",
        "#B2DF8A",
        "#1F78B4 "],
        hoverBackgroundColor: [
        
          "#A6CEE3",
          "#B2DF8A",
          "#1F78B4 "
          
          
        ]
      }
    ]
  }
}

render() {
    return (
    <MDBContainer>
      <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} />
    </MDBContainer>
    );
  }
}

export default ChartsPage;