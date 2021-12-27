import React, { useState, useEffect } from "react";
import Tracing from "../../components/tracing";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { trackProduct } from "../../actions/shipmentActions";
import { chainOfCustody } from "../../actions/shipmentActions";
import { useTranslation } from 'react-i18next';

const TracingContainer = (props) => {
const { t, i18n } = useTranslation();
  const [trackData, setTrackData] = useState({});
  const [poChainOfCustodyData, setPoChainOfCustodyData] = useState([]);
  const [shippmentChainOfCustodyData, setShippmentChainOfCustodyData] =
    useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await trackProduct(props.match.params.id);
      if (result.status === 200) {
        console.log("Tracking data");
        console.log(result.data);
        setTrackData(result.data);
      } else {
        setTrackData({});
      }
    }
    fetchData();
  }, [props.match.params.id]);

  useEffect(() => {
    async function fetchData() {
      const result = await chainOfCustody(props.match.params.id);
      if (result.status === 200) {
        setPoChainOfCustodyData(result.data.data["poChainOfCustody"]);
        setShippmentChainOfCustodyData(
          result.data.data["shipmentChainOfCustody"]
        );
        console.log("from variable");
        console.log(poChainOfCustodyData);
        console.log(shippmentChainOfCustodyData);
      } else {
        setPoChainOfCustodyData([]);
        setShippmentChainOfCustodyData([]);
      }
    }
    fetchData();
  }, [
    poChainOfCustodyData,
    props.match.params.id,
    shippmentChainOfCustodyData,
  ]);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <Tracing
            trackData={trackData}
            poChainOfCustodyData={poChainOfCustodyData}
            shippmentChainOfCustodyData={shippmentChainOfCustodyData}
            t={t}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default TracingContainer;
