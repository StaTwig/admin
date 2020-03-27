import React from 'react';
import LineChart from 'react-chartkick';


const Chart = () => {

    return (
        <div>
          <LineChart ymin="-10" ymax="10" min={-5} max={10}  colors={["#228B22", "#666"]} 
          data={{"1:00": 2, "2:00": 5,  "3:00": 3 , "4:00": 4, "5:00": 3, "6:00": 5, "7:00": 3, "8:00": 4, "9:00": 3}} />
    
        </div>
    
    
      );



    
};


 

export default Chart;
