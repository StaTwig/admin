import React, { useState, useEffect } from "react";
import Analytics from "../../components/analytics";
import { useDispatch } from 'react-redux';
import { getAnalyticsAllStats } from '../../actions/analyticsAction';

const AnalyticsContainer = (props) => {
  const [analytics, setAnalytics] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const result = await dispatch(getAnalyticsAllStats());
      setAnalytics(result.data.data);
    })();
  }, []);

  return <Analytics analytics={analytics} {...props} />;
};

export default AnalyticsContainer;