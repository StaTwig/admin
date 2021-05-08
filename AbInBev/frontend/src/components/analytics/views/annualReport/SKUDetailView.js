import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import becks from "../../../../assets/images/becks.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";

const SKUAnnualReport = [
    {
        name: 'Karnataka',
        Sales: 4000,
        Returns: 2400,
        Target: 2400,
    },
    {
        name: 'Delhi',
        Sales: 3000,
        Returns: 1398,
        Target: 2210,
    },
    {
        name: 'Pindicherry',
        Sales: 2000,
        Returns: 9800,
        Target: 2290,
    }
];

const SKU_State_AnnualReport = [
    {
        name: 'Events',
        Sales: 687000,
        Returns: 416000,
        Target: 519000
    }
];


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

const SKUDetailView = (props) => {
    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Dashboard - SKU Detail</h1>
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
                    <option>Becks</option>
                    <option>Budweiser</option>
                    <option>Budweiser Magnum</option>
                    <option>RC</option>
                    <option>Fosters</option>
                    <option>Knock Out</option>
                    <option>Haywards 5000</option>
                </select>
            </div>

            {/* Single product detailed view for brand */}
            <div className="productDetailedView">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-12">
                        <div className="productDetailCard">
                            <div className="productGrid">
                                <img className="productImage" src={becks} />
                            </div>
                            <div className="productcard">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="productSection mb-2">
                                            <div className="profile"><img src={bottlesIcon} alt="" width="50" height="100%" /></div>
                                            <div className="info">
                                                <div className="name">Becks 330 ml</div>
                                                <div className="caption">NRB Old Patent Becks Ice 330ml</div>
                                                <div className="caption">526025</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <span className="productText">Return Rate <span className="breweryPropertyValue">82%</span></span>
                                        <div className="captionSubtitle">Compared to (70% last month)</div>
                                        <div className="progress progress-line-default">
                                            <div className="progress-bar progress-bar-default" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>
                                                <span className="sr-only">80% Complete</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="productsChart">
                            <label className="productsChartTitle">States</label>
                            <ResponsiveContainer width="100%" height={500}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    barSize={10}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="TotalBottlepool" fill="#FDAB0F" />
                                    <Bar dataKey="Sales" fill="#A344B7" />
                                </BarChart>
                            </ResponsiveContainer>
                            <label className="productsChartTitle">States</label>
                            <ResponsiveContainer width="100%" height={500}>            
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={SKUAnnualReport}
                                    layout="vertical"
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                   <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" scale="band" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Sales" stackId="a" fill="#FDAB0F" />
                                    <Bar dataKey="Returns" stackId="a" fill="#A20134" />
                                    <Bar dataKey="Target" stackId="a" fill="#A344B7" />
                                </BarChart>
                            </ResponsiveContainer>    
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

                        <div className="productsChart">
                            <label className="productsChartTitle">Karnataka</label>
                            <ResponsiveContainer width="100%" height={500}>            
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={SKU_State_AnnualReport}
                                    layout="vertical"
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                   <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" scale="band" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Sales" fill="#FDAB0F" />
                                    <Bar dataKey="Returns" fill="#A20134" />
                                    <Bar dataKey="Target" fill="#A344B7" />
                                </BarChart>
                            </ResponsiveContainer>    
                        </div>
                        <div className="tableDetals">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">States</th>
                                        <th scope="col">Sales</th>
                                        <th scope="col">Returned</th>
                                        <th scope="col">Target</th>
                                        <th scope="col">Actual Returns</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">
                                            <a className="stateLink" href="#">Karnataka</a>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>50%</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <a className="stateLink" href="#">Delhi</a>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>65%</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <a className="stateLink" href="#">Telangana</a>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>89%</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <a className="stateLink" href="#">Gujarat</a>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>99%</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <a className="stateLink" href="#">Maharashtra</a>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>84%</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <a className="stateLink" href="#">Goa</a>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>78%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                                
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SKUDetailView;