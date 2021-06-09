import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../../style.scss";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import { getAnalyticsAllStats, getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';

// const data = [
//     {
//       name: 'Jan',
//       Sales: 2100,
//       Returns: 400,
//       Target: 2600,
//       ActualReturn:100
//     },
//     {
//       name: 'Feb',
//       Sales: 5000,
//       Returns: 250,
//       Target: 4000,
//       ActualReturn:100
//     },
//     {
//       name: 'Mar',
//       Sales: 2600,
//       Returns: 1400,
//       Target: 3000,
//       ActualReturn:1200
//     },
//     {
//       name: 'Apr',
//       Sales: 6523,
//       Returns: 500,
//       Target: 6200,
//       ActualReturn:620
//     },
//     {
//       name: 'May',
//       Sales: 4000,
//       Returns: 2400,
//       Target: 1000,
//       ActualReturn:1200
//     },
//     {
//       name: 'Jun',
//       Sales: 6000,
//       Returns: 3400,
//       Target: 5000,
//       ActualReturn:5200
//     },
//     {
//       name: 'Jul',
//       Sales: 8000,
//       Returns: 5000,
//       Target: 10000,
//       ActualReturn:2000
//     },
//   ];

const DetailedGeographicalView = (props) => {
    const { states, prop, sku, SKUStats, params, brandsArr, brands } = props;

    const [analytics, setAnalytics] = useState([]);
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

            let qp = '';

            if (props.params) {
                const p = props.params;
                if (p.year)
                    qp = '&year=' + p.year;
                if (p.month)
                    qp += '&month=' + p.month;
                if (p.quarter)
                    qp += '&quarter=' + p.quarter;
                if (p.state)
                    qp += '&state=' + p.state;

                if (p.year && p.month)
                    qp += '&date_filter_type=by_monthly';
                else if (p.year && p.quarter)
                    qp += '&date_filter_type=by_quarterly';
                else if (p.year)
                    qp += '&date_filter_type=by_yearly';
            }

            const result = await dispatch(getAnalyticsAllStats('?sku=' + (props.sku ? props.sku : prop.externalId) + '&group_by=date' + qp));
            setAnalytics(result.data);
        })();
    }, [props]);
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Analytics</h1>
            </div>
            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">State</a>
                <select className="btn selectState">
                    <option>Select state</option>
                    {states?.map((state) =>
                        <option>{state}</option>
                    )
                    }
                </select>
            </div>

            <div className="geocard cursor-pointer mb-4">
                <div className="author mb-2">
                    <div className="profile"><img src={brandsArr[brands.indexOf(prop.manufacturer.split(' ').join(''))]} alt="" height="60" /></div>
                    <div className="info">
                        <div className="name">{name}</div>
                        <div className="caption">{shortName}</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="geoAnalyticsCard">
                        <div className="geoanalyticsTitle">Karnataka</div>
                        <div className="geosubTitle mb-4">Return Rate</div>
                        <ResponsiveContainer width="100%" height={380}>
                            <LineChart
                                width={500}
                                height={300}
                                data={analytics}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis dataKey="groupedBy" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke="#FBBD0E" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="returns" stroke="#A344B7" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="targetSales" stroke="#A21233" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="actualReturns" stroke="#E36141" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DetailedGeographicalView;