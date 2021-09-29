import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/spinner";

const Spinner = () => {
  const isLoading = useSelector((state) => state.spinner);

  return isLoading ? <Loader /> : null;
};

export default Spinner;
