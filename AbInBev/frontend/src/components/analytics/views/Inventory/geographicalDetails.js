import React, {useState, useEffect} from "react";
import becks from "../../../../assets/images/becks.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import { BarChart,AreaChart, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const iGraphicalDetailedView = (props) => {
    const [analytics, setAnalytics] = useState(props.bstats);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     (async () => {
    //     const result = await dispatch(getAnalyticsByBrand());
    //     console.log(result);
        
    //     setAnalytics(result.data);
    //     })();
    // }, []);
    const openDetailView = (sku) => {
        props.onViewChange('SKU_DETAIL_VIEW', { sku: sku });
    }

    return (
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
        </div>
    )
}

export default iGraphicalDetailedView;