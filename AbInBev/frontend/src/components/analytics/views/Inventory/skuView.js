import React, {useState, useEffect} from "react";
import becks from "../../../../assets/images/becks.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import { getAnalyticsByBrand } from '../../../../actions/analyticsAction';
import { useDispatch } from 'react-redux';
import { BarChart,AreaChart, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const dataInventorySKUSales = [
    {
      name: 'JAN',
      Sales: 10000
    },
    {
      name: 'FEB',
      Sales: 4500
    },
    {
      name: 'MAR',
      Sales: 6700
    },
    {
      name: 'APR',
      Sales: 9000
    },
    {
      name: 'MAY',
      Sales: 6478
    },
    {
      name: 'JUN',
      Sales: 2600
    },
    {
      name: 'JUL',
      Sales: 9050
    },
  ];

const iSKUView = (props) => {
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
        <>
            <h2>SKU View - Inentory</h2>
            <br/>
            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">SKU</a>
                <select className="btn selectState">
                    <option>All</option>
                    <option>Becks 330ml</option>
                    <option>Budweiser 330ml</option>
                </select>
            </div>
            <div className="productDetailedView">
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
        </>
    )
}

export default iSKUView;