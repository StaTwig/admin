import { useEffect, useState } from "react";

import { getIotShipmentData } from '../actions/shipmentActions';
import { isType } from "../utils/commonHelper";

const mockTemperatureData = {
  data: [
    { "temp": { "temp": "45", "UnixTimeStamp": "2021-01-01 00:01:00 -0800" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } },
    { "temp": { "temp": "56", "UnixTimeStamp": "2021-01-01 00:03:00 -0800" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } },
    { "temp": { "temp": "47", "UnixTimeStamp": "2021-01-01 00:05:00 -0800" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } },
    { "temp": { "temp": "58", "UnixTimeStamp": "2021-01-01 00:07:00 -0800" }, "humidity": { "humidity": "34", "UnixTimeStamp": "12345678z" }, "battery": { "battery": "67%", "UnixTimeStamp": "123456z" } },]
};

const formatUnixTimeStamp = (timeStamp) => {
  return new Date(timeStamp * 1e3).toISOString().slice(-13, -5);
}

const prepareTemperatureData = (temperatureData) => {
  return temperatureData.reduce((obj, item) =>
    (obj[item.temp['UnixTimeStamp']] = item.temp['temp'], obj), {});
}

export const useIotShipmentData = (url, enableStatus) => {
  const [iotData, setIotData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchData() {
        const result = await getIotShipmentData(url);

        if (isType('array', result)) {
          const data = result.length > 0 ? prepareTemperatureData(mockTemperatureData.data) : {};
          setIotData(data);
        }

        if (isType('object', result)) {
          setIotData(result);
        }

      }
      if(enableStatus) {
        fetchData();
      }
    }, 5000);
    return () => {
      window.clearInterval(interval); // clear the interval in the cleanup function
    };
  }, [url, enableStatus]);
  return iotData;
}
