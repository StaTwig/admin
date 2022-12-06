import React, { useState, useEffect } from "react";
import Analytics from "../../components/analytics";
import { useDispatch } from 'react-redux';
import { getAllStates, getAllBrands, getAnalyticsByBrand } from '../../actions/analyticsAction';
import { getAllSKUs, getDistrictsByState } from '../../actions/inventoryAction';

const AnalyticsContainer = (props) => {
  const [states, setStates] = useState([]);
  const [SKUs, setSKUs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandStats, setBrandstat] = useState([]);
  const [SKUStats, setSKUStats] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const result = await dispatch(getAllStates());
      setStates(result.data);
      const results = await dispatch(getAllSKUs());
      setSKUs(results.data);
      const b_results = await dispatch(getAllBrands());
      setBrands(b_results.data);
      const s_result = await dispatch(getAnalyticsByBrand('?date_filter_type=by_yearly&year='+new Date().getFullYear()));
      setBrandstat(s_result.data);
      let n = [];
      for (let a of s_result.data) {
        for (let product of a.products) {
           n.push(product);
        }
      }
      setSKUStats(n);
      
    })();
  }, []);


  const getDistricts = async (state) => {
    const result = await dispatch(getDistrictsByState(state));
    return result;
  };

  return <Analytics getDistricts={getDistricts} states={states} SKUStats={SKUStats} brands={brands} SKUs={SKUs} bstats={brandStats} {...props} />;
};

export default AnalyticsContainer;