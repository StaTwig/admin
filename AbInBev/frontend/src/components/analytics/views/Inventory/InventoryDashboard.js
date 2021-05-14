import React, {useState, useEffect} from "react";
import { BarChart,AreaChart, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import becks from "../../../../assets/images/becks.png";
import rc from "../../../../assets/images/rc.png";
import bud from "../../../../assets/images/bud.png";
import knockout from "../../../../assets/images/knockout.png";
import budmagnum from "../../../../assets/images/budmag.png";
import fasters from "../../../../assets/images/fasters.png";
import haywards from "../../../../assets/images/haywards.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import { getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const data = [
    {
        name: 'Karnataka',
        Sales: 4000,
        TotalBottlepool: 2400,
        amt: 2400,
    },
    {
        name: 'Delhi',
        Sales: 3000,
        TotalBottlepool: 1398,
        amt: 2210,
    },
    {
        name: 'Pindicherry',
        Sales: 2000,
        TotalBottlepool: 9800,
        amt: 2290,
    },
    {
        name: 'Maharashtra',
        Sales: 2780,
        TotalBottlepool: 3908,
        amt: 2000,
    },
    {
        name: 'Telangana',
        Sales: 1890,
        TotalBottlepool: 4800,
        amt: 2181,
    },
    {
        name: 'Goa',
        Sales: 2390,
        TotalBottlepool: 3800,
        amt: 2500,
    },
    {
        name: 'Gujarat',
        Sales: 3490,
        TotalBottlepool: 4300,
        amt: 2100,
    },
];


const InventoryDashboard = (props) => {
    const [visible, setVisible] = useState([]);
    const [analytics, setAnalytics] = useState(props.bstats);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     (async () => {
    //     const result = await dispatch(getAnalyticsByBrand());
    //     console.log(result);
        
    //     setAnalytics(result.data);
    //     })();
    // }, []);
    
    return (
        <div className="inventoryDashboard">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Dashboard - Supplier</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                </div>
            </div>

            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">Brand</a>
                <select className="btn selectState">
                    <option>All</option>
                    {props.brands.map((brand) => 
                        <option value={brand._id}>{brand._id}</option>
                    )}
                </select>
            </div>

            <div className="row">
                {analytics.map((analytic, index) => {
                    return (<>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="productGrid" onClick={() => { let newState = [...visible]; newState[index] = !newState[index]; setVisible(newState)}}>
                                <img className="productImage" src={analytic.products[0].image} />
                            </div>
                        </div>

                        {visible[index] &&
                            <div className="card-container">
                                {analytic.products.map((product, i) =>
                                    <div className="card">
                                        <div className="author mb-2">
                                            <div className="profile"><img src={bottlesIcon} alt="" width="50" height="100%" /></div>
                                            <div className="info">
                                                <div className="name">{product.name}</div>
                                                <div className="caption">{product.shortName}</div>
                                                <div className="caption">{product.externalId}</div>
                                            </div>
                                        </div>
                                        <span className="breweryPropertyText">Return Rate <span className="pull-right breweryPropertyValue">{product.returnRate}%</span></span>
                                        <div className="progress progress-line-danger">
                                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "{product.returnRate}%" }}>
                                                <span className="sr-only">{product.returnRate}% Complete</span>
                                            </div>
                                        </div>
                                        <div className="captionSubtitle">Compared to ({product.returnRatePrev}% last month)</div>
                                    </div>
                                )}
                            </div>
                        }
                    </>)
                }
                )}
            </div>
        </div>
    );
};

export default InventoryDashboard;