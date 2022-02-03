import React from "react";
import EmptyShipments from "../../assets/icons/overviewEmpty.png";

function OverviewEmptyPage({ alt , t}) {
    return (
        <div style={{display: "flex",flexDirection: 'column',justifyContent:"center", alignItems: "center"}}>
            <div style={{textAlign: "center",marginBottom: '0.5rem'}}  >{t(`Looks_like_your_${alt}_are_empty`)}!</div>
            <img src={EmptyShipments} height='200' width='200' alt={alt} />
        </div>
    );
}

export default OverviewEmptyPage;
