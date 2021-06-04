import React, { useState, useEffect } from "react";
import becks from "../../../../assets/images/becks.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import profile from "../../../../assets/user.png";
import Chart from 'react-apexcharts';
import { getAllOrganisationStats } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

const DetailedSupplierView = (props) => {
    const { prop } = props;

    const [SupplierChartData, setSupplierChartData] = useState({
        series: [0, 0, 0],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: true,
                            label: 'Average Total',
                            formatter: function (w) {
                                let temp = (w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) / w.globals.series.length).toFixed(2);
                                return temp + ' %';
                            }
                        }
                    }
                }
            },
            labels: ['S1 Vendors', 'S2 Vendors', 'S3 Vendors'],
        }
    });
    const [name, setName] = useState(prop.name);
    const [shortName, setShortname] = useState(prop.shortName);
    const [image, setImage] = useState(prop.image);
    const dispatch = useDispatch();
    const [analytics, setAnalytics] = useState([]);
    useEffect(() => {
        (async () => {
            if (props.sku) {
                let n = props.SKUStats.filter(a => a.externalId == props.sku);
                setName(n[0].name);
                setShortname(n[0].shortName);
                setImage(n[0].image);
            }

            let result = await dispatch(getAllOrganisationStats('?sku=' + (props.sku ? props.sku : prop.externalId)));
            if (props.Otype) {
                if (props.Otype != 'All') {
                    let n = result.data.filter(a => a.type == props.Otype);
                    result.data = n;
                }
            }
            setAnalytics(result.data);
            let s1 = 0;
            let s2 = 0;
            let s3 = 0;
            s1 = (result.data.filter(a => a?.type == 'S1').length / result.data.length) * 100;
            s2 = (result.data.filter(a => a?.type == 'S2').length / result.data.length) * 100;
            s3 = (result.data.filter(a => a?.type == 'S3').length / result.data.length) * 100;
            setSupplierChartData({
                series: [s1, s2, s3],
                options: {
                    chart: {
                        height: 350,
                        type: 'radialBar',
                    },
                    plotOptions: {
                        radialBar: {
                            dataLabels: {
                                name: {
                                    fontSize: '22px',
                                },
                                value: {
                                    fontSize: '16px',
                                },
                                total: {
                                    // show: true,
                                    // label: 'Average Total',
                                    formatter: function (w) {
                                        let temp = (w.globals.seriesTotals.reduce((a, b) => {
                                            return a + b
                                        }, 0) / w.globals.series.length).toFixed(2);
                                        return temp + ' %';
                                    }
                                }
                            }
                        }
                    },
                    labels: ['S1 Vendors', 'S2 Vendors', 'S3 Vendors'],
                }
            })
        })();
    }, []);
    return (
        <div>
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
                                            <div className="progress-bar progress-bar-default" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: prop.returnRate + "%" }}>
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
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div id="chart">
                            <Chart options={SupplierChartData.options} series={SupplierChartData.series} type="radialBar" height={350} />
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="tableDetals">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Vendor</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Actual Returns</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.map((analytic, index) =>
                                        <tr key={index}>
                                            <td scope="row">
                                                <div className="supplierImage justify-content-start">
                                                    <img src={profile} className='displayImage' />
                                                    <div className="supplierNames justify-content-start">
                                                        <span>{analytic.name}</span><br />
                                                        <span className={`group ${analytic?.type?.toLowerCase()}group`}>{analytic.type} Vendor</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Karnataka</td>
                                            <td>{(analytic.analytics.actualReturns / (analytic.analytics.returns > 0 ? analytic.analytics.returns : 1)) * 100}%</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default DetailedSupplierView;