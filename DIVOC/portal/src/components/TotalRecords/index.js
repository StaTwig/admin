import React from "react";
import styles from "./index.module.css";

export const TotalRecords = ({title, count}) => (
    <div className={styles["container"]}>
        <span className="font-weight-bolder" style={{color: '#0B65C1'}}>{count}</span>
        <span className="font-weight-bold" style={{whiteSpace: "no-wrap"}}>&emsp;{title}</span>
    </div>
);
