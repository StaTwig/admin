import React, { useState, useEffect } from "react";
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

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });


  const rows = [
      {
        'name':'karnataka',
        'sales':683000, 
        'actualreturns':5000,
        districts: [
            { district: 'Bangalore', sales:'11091700', returned: '3000', target:2000, actualreturn: 3200 },
            { district: 'Shivmoga', sales:'11091700', returned: '3000', target:2000, actualreturn: 3200 },
            { district: 'Tumkur', sales:'11091700', returned: '3000', target:2000, actualreturn: 3200 }
          ]    
      },
      {
        'name':'Telangana',
        'sales':583000, 
        'actualreturns':67000,
        districts: [
            { district: 'Hyderabad', sales:'11091700', returned: '3000', target:2000, actualreturn: 3200 },
            { district: 'Warangal', sales:'11091700', returned: '3000', target:2000, actualreturn: 3200 },
            { district: 'Guntur', sales:'11091700', returned: '3000', target:2000, actualreturn: 3200 }
          ]    
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


  const State_district_Report = [
    {
        name: 'Total Sales',
        count: 619000
    },
    {
        name: 'Total Bottle Pool',
        count: 519000
    }
];

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.sales}</TableCell>
          <TableCell align="right">{row.actualreturns}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>District</TableCell>
                      <TableCell>Sales</TableCell>
                      <TableCell align="right">Returned</TableCell>
                      <TableCell align="right">Target</TableCell>
                      <TableCell align="right">Actual Returns</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.districts.map((district) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {district.district}
                        </TableCell>
                        <TableCell>{district.sales}</TableCell>
                        <TableCell align="right">{district.returned}</TableCell>
                        <TableCell align="right">
                          {district.target}
                        </TableCell>
                        <TableCell align="right">
                          {district.actualreturn}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

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

            {/* Inventory SKU View */}
            <h2>Geographical View - Inentory State and District Views</h2>
            <br/>
            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">Brand</a>
                <select className="btn selectState">
                    <option>All</option>
                    <option>Becks</option>
                    <option>Budweiser</option>
                </select>
            </div>

            <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="stateandDistrictCard mb-4">
                        <h2>Karnataka</h2>
                        <ResponsiveContainer width="100%" height={200}>            
                            <BarChart
                                width={200}
                                height={150}
                                barCategoryGap={1}
                                data={State_district_Report}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={50}
                                barGap={1}
                                >
                                <XAxis dataKey="name" scale="band" />
                                <YAxis type="number" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" barCategoryGap={80} radius={[5, 5, 0, 0]} fill="#54265E" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>                           
                </div>

                <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="stateDistrictTableContainer mb-4">
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                <TableCell />
                                    <TableCell>State</TableCell>
                                    <TableCell align="right">Sales</TableCell>
                                    <TableCell align="right">Actual Returns</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                <Row key={row.name} row={row} />
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>                
                    </div>
                </div>                
            </div>
        </div>
    );
};

export default InventoryDashboard;