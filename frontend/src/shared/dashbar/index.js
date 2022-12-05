import React from "react";
import "./style.scss";
import EnterWareHouse from "./enterwarehouse";
import SearchWareHouse from "./searchwarehouse";

const DashBar = (props) => {
  return props.content ? (
    <div>
      <EnterWareHouse {...props} />
    </div>
  ) : (
    <div>
      <SearchWareHouse {...props} />
    </div>
  );
};

export default DashBar;
