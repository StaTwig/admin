import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../../style.scss";
import bottlesIcon from "../../../../assets/becks_330ml.png";

const data = [
    {
      name: 'Jan',
      Sales: 2100,
      Returns: 400,
      Target: 2600,
      ActualReturn:100
    },
    {
      name: 'Feb',
      Sales: 5000,
      Returns: 250,
      Target: 4000,
      ActualReturn:100
    },
    {
      name: 'Mar',
      Sales: 2600,
      Returns: 1400,
      Target: 3000,
      ActualReturn:1200
    },
    {
      name: 'Apr',
      Sales: 6523,
      Returns: 500,
      Target: 6200,
      ActualReturn:620
    },
    {
      name: 'May',
      Sales: 4000,
      Returns: 2400,
      Target: 1000,
      ActualReturn:1200
    },
    {
      name: 'Jun',
      Sales: 6000,
      Returns: 3400,
      Target: 5000,
      ActualReturn:5200
    },
    {
      name: 'Jul',
      Sales: 8000,
      Returns: 5000,
      Target: 10000,
      ActualReturn:2000
    },
  ];

const DetailedGeographicalView = (props) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Analytics</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                </div>
            </div>
            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">State</a>
                <select className="btn selectState">
                    <option>Select state</option>
                    <option>Karnataka</option>
                </select>
            </div>

            <div className="geocard cursor-pointer mb-4">
                <div className="author mb-2">
                    <div className="profile"><img src={bottlesIcon} alt="" width="50" height="100%" /></div>
                    <div className="info">
                        <div className="name">Bud 650 ml</div>
                        <div className="caption">Budweiser 650ml</div>
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
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Sales" stroke="#FBBD0E" strokeWidth={3} dot={false} />
                            <Line type="monotone" dataKey="Returns" stroke="#A344B7" strokeWidth={3} dot={false}/>
                            <Line type="monotone" dataKey="Target" stroke="#A21233" strokeWidth={3} dot={false}/>
                            <Line type="monotone" dataKey="ActualReturn" stroke="#E36141" strokeWidth={3} dot={false}/>
                            </LineChart>
                        </ResponsiveContainer> 
                    </div>
                </div>
            </div>
        </>
    );
}
export default DetailedGeographicalView;