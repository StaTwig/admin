import React, {useState, useEffect} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import becks from "../../../../assets/images/becks.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import { getAnalyticsAllStats, getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const SKUDetailView = (props) => {
    const { states, prop } = props;
    
    const [analytics, setAnalytics] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState(prop.name);
    const [shortName, setShortname] = useState(prop.shortName);
    const [image, setImage] = useState(prop.image);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            if (props.sku) {
                let n = props.SKUStats.filter(a => a.externalId == props.sku);
                setName(n[0].name);
                setShortname(n[0].shortName);
                setImage(n[0].image);
            }
            const result = await dispatch(getAnalyticsAllStats('?sku='+(props.sku ? props.sku : prop.externalId)+'&group_by=state'));
            setAnalytics(result.data);
        })();
    }, []);
    
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
                    {props.brands.map((brand) => 
                        <option value={brand._id}>{brand._id}</option>
                    )}
                </select>
            </div>

            {/* Single product detailed view for brand */}
            <div className="productDetailedView">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-12">
                        <div className="productDetailCard">
                            <div className="productGrid">
                                <img className="productImage" src={image} />
                            </div>
                            <div className="productcard">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="productSection mb-2">
                                            <div className="profile"><img src={image} alt="" width="50" height="100%" /></div>
                                            <div className="info">
                                                <div className="name">{name}</div>
                                                <div className="caption">{shortName}</div>
                                                <div className="caption">{props.sku ? props.sku : prop.externalId}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <span className="productText">Return Rate <span className="breweryPropertyValue">{prop.returnRate}%</span></span>
                                        <div className="captionSubtitle">Compared to ({prop.returnRatePrev}% last month)</div>
                                        <div className="progress progress-line-default">
                                            <div className="progress-bar progress-bar-default" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: prop.returnRate+"%" }}>
                                                <span className="sr-only">{prop.returnRate}% Complete</span>
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
                        {!isActive ? 
                            <>
                                <div className="productsChart">
                                    <label className="productsChartTitle">States</label>
                                    <ResponsiveContainer width="100%" height={500}>
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={analytics}
                                            layout="vertical"
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 10,
                                                bottom: 5,
                                            }}
                                            barSize={10}
                                            barGap={1}
                                        >
                                            <XAxis type="number" />
                                            <YAxis dataKey="groupedBy" type="category" scale="band" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="sales" stackId="a" fill="#FDAB0F" />
                                            <Bar dataKey="returns" stackId="a" fill="#A20134" />
                                            <Bar dataKey="targetSales" radius={[0, 5, 5, 0]} stackId="a" fill="#A344B7" />
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
                                            {analytics.map((analytic, index) =>
                                                <tr>
                                                    <td scope="row">
                                                        <span className="stateLink" onClick={() => setIsActive(true)}>{analytic.groupedBy}</span>
                                                    </td>
                                                    <td>{analytic.sales}</td>
                                                    <td>{analytic.returns}</td>
                                                    <td>{analytic.targetSales}</td>
                                                    <td>{analytic.actualReturns}%</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            : 
                            <>  
                                <div className="productsChart">
                                    <label className="productsChartTitle">Karnataka</label>
                                    <ResponsiveContainer width="100%" height={200}>            
                                        <BarChart
                                            width={500}
                                            height={250}
                                            barCategoryGap={1}
                                            data={analytics}
                                            layout="vertical"
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                            barSize={10}
                                            barGap={10}
                                            >
                                        <XAxis type="number" />
                                            <YAxis dataKey="groupedBy" type="category" scale="band" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="sales" barCategoryGap={80} radius={[0, 5, 5, 0]} fill="#FDAB0F" />
                                            <Bar dataKey="returns" barCategoryGap={80} radius={[0, 5, 5, 0]} fill="#A20134" />
                                            <Bar dataKey="targetSales" barCategoryGap={80} radius={[0, 5, 5, 0]} fill="#A344B7" />
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
                                            {analytics.map((analytic, index) => 
                                                <tr key={index}>
                                                    <td scope="row">
                                                        <span className="stateLink">{analytic.groupedBy}</span>
                                                    </td>
                                                    <td>{analytic.sales}</td>
                                                    <td>{analytic.return}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SKUDetailView;