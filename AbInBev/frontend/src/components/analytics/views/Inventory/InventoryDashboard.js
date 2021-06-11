import React, { useState, useEffect } from "react";
import { BarChart, AreaChart, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import becks from "../../../../assets/images/becks.png";
import rc from "../../../../assets/images/rc.png";
import bud from "../../../../assets/images/bud.png";
import knockout from "../../../../assets/images/knockout.png";
import budmagnum from "../../../../assets/images/budmag.png";
import fasters from "../../../../assets/images/fasters.png";
import haywards from "../../../../assets/images/haywards.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";

const InventoryDashboard = (props) => {
    const [visible, setVisible] = useState(false);
    const [analytics, setAnalytics] = useState(props.bstats);

    const [old, setOld] = useState(props.bstats);
    const [show, setShow] = useState(false);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     (async () => {
    //     const result = await dispatch(getAnalyticsByBrand());
    //     console.log(result);

    //     setAnalytics(result.data);
    //     })();
    // }, []);
    const openDetailView = (sku) => {
        props.onViewChange('INVENTORY_GRAPHICAL', { ...sku });
    }

    const toggleBrand = (brand) => {
        setVisible(true);
        setAnalytics(old.filter(a => a._id == brand));
        setShow(true);
    }

    const goBack = () => {
        setAnalytics(old);
        setVisible(false);
        setShow(false);
    }

    return (
        <div className="inventoryDashboard">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Dashboard - Supplier</h1>
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
                {show &&
                    <span onClick={goBack}>Back</span>
                }
                {analytics.map((analytic, index) => {
                    return (<>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="productGrid" onClick={() => toggleBrand(analytic._id)}>
                                <img className="productImage" src={props.brandsIconArr[props.brands.indexOf(analytic._id.split(' ').join(''))]} />
                            </div>
                        </div>

                        {visible &&
                            <div className="card-container">
                                {analytic.products.map((product, i) =>
                                    <div className="card" onClick={() => openDetailView(product)}>
                                        <div className="author mb-2">
                                            <div className="profile"><img src={props.brandsArr[props.brands.indexOf(product.manufacturer.split(' ').join(''))]} alt="" height="60" /></div>
                                            <div className="info">
                                                <div className="name">{product.name}</div>
                                                <div className="caption">{product.shortName}</div>
                                                <div className="caption">{product.externalId}</div>
                                            </div>
                                        </div>
                                        <span className="breweryPropertyText">Return Rate <span className="pull-right breweryPropertyValue">{product.returnRate || 0}%</span></span>
                                        <div className="progress progress-line-danger">
                                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: (product.returnRate || 0)+"%" }}>
                                                <span className="sr-only">{product.returnRate || 0}% Complete</span>
                                            </div>
                                        </div>
                                        <div className="captionSubtitle">Compared to ({product.returnRatePrev || 0}% last month)</div>
                                    </div>
                                )}
                            </div>
                        }
                    </>)
                }
                )}
            </div>
            {/* <div className="productDetailedView">
                <div className="row">
                    
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="productsChart">
                            <label className="productsChartTitle">Overall Sales</label>
                            <ResponsiveContainer width="100%" height={180}>
                                <AreaChart
                                    width={500}
                                    height={400}
                                    data={dataInventorySKUSales}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                    >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Sales" stroke="#8884d8" strokeWidth={2} fill="#8884d8"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="productsChart">
                            <label className="productsChartTitle">Overall Inventory</label>
                            <ResponsiveContainer width="100%" height={180}>
                                <AreaChart
                                    width={500}
                                    height={400}
                                    data={dataInventorySKUSales}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                    >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Sales" stroke="#FAAB10" strokeWidth={2} fill="#FAAB10"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="tableDetals">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">States</th>
                                    <th scope="col">Sales</th>
                                    <th scope="col">Total Bottle Pool</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">
                                        <a className="stateLink" href="#">Karnataka</a>
                                    </td>
                                    <td>333333</td>
                                    <td>333333</td>
                                </tr>
                                <tr>
                                    <td scope="row">
                                        <a className="stateLink" href="#">Delhi</a>
                                    </td>
                                    <td>333333</td>
                                    <td>333333</td>
                                </tr>
                                <tr>
                                    <td scope="row">
                                        <a className="stateLink" href="#">Telangana</a>
                                    </td>
                                    <td>333333</td>
                                    <td>333333</td>
                                </tr>
                                <tr>
                                    <td scope="row">
                                        <a className="stateLink" href="#">Gujarat</a>
                                    </td>
                                    <td>333333</td>
                                    <td>333333</td>
                                </tr>
                                <tr>
                                    <td scope="row">
                                        <a className="stateLink" href="#">Maharashtra</a>
                                    </td>
                                    <td>333333</td>
                                    <td>333333</td>
                                </tr>
                                <tr>
                                    <td scope="row">
                                        <a className="stateLink" href="#">Goa</a>
                                    </td>
                                    <td>333333</td>
                                    <td>333333</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>                            

            <h2>Geographical View - Inentory State and District Views</h2>
            <br/>
            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">Brand</a>
                <select className="btn selectState">
                    <option>All</option>
                    <option>Becks</option>
                    <option>Budweiser</option>
                </select>
            </div> */}
        </div>
    );
};

export default InventoryDashboard;