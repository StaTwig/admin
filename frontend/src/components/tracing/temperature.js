import React, { useState,useEffect } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import {getTemperature} from '../../actions/shipmentActions';



const Chart = () => {
const [temp,setTemp]= useState({})
 
  

    useEffect(() => {
    async function fetchData() {
      const result = await getTemperature();
       setTemp(result.data)
      }
    fetchData();
  },[]);



    return (
        <div>
          <LineChart 
          ymin="-10" ymax="5" min={-10} max={10}  
          colors={["#FA7923", "#666"]} 
          data={temp} 
          />
    
        </div>
    
    
      );

};


 

export default Chart;
