import React, { useState, useEffect, useMemo } from "react";
import becks from "../../../../assets/images/becks.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Label,
} from "recharts";
import {
  getAnalyticsAllStats,
  getAllOrganisationTypeStats,
} from "../../../../actions/analyticsAction";
import { useDispatch } from "react-redux";
import abbreviate from "number-abbreviate";

const iGraphicalDetailedView = (props) => {
  const [analytics, setAnalytics] = useState([]);
  const [old, setOld] = useState([]);
  const { states, prop } = props;
  const [data, setData] = useState([
    {
      name: "Total Sales",
      count: 0,
    },
    {
      name: "Total Bottle Pool",
      count: 0,
    },
  ]);
  const [active, setActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(prop.name);
  const [stateLabel, setStateLabel] = useState("");
  const [shortName, setShortname] = useState(prop.shortName);
  const [image, setImage] = useState(prop.image);
  const [arrIndex, setArrIndex] = useState(-1);
  const [subAnalytics, setSubAnalytics] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let cond = "";
      let gb = "state";
      if (props.params) {
        if (props.params.state) cond = "&state=" + props.params.state;
        if (props.params.district) {
          setIsActive(true);
          cond += "&district=" + props.params.district;
        }
      }

      if (props.sku) {
        let n = props.SKUStats.filter((a) => a.externalId == props.sku);
        setName(n[0].name);
        setShortname(n[0].shortName);
        setImage(n[0].image);
      }
      const result = await dispatch(
        getAnalyticsAllStats(
          "?sku=" +
            (props.sku ? props.sku : prop.externalId) +
            "&pid=" +
            prop.id +
            "&orgType=" +
            props.Otype +
            "&brand=" +
            prop.manufacturer +
            "&group_by=" +
            gb +
            "&inventory=true" +
            cond
        )
      );
      setAnalytics(result.data);
      setOld(result.data);
      setData([
        {
          name: "Total Sales",
          count: result.data[0].sales,
        },
        {
          name: "Total Bottle Pool",
          count: result.data[0].inventory,
        },
      ]);
    })();
    requestSort("sales");
  }, []);

  const openDetailView = async (sku) => {
    if (!active) {
      let cond = "";
      if (props.params) {
        if (props.params.state) cond = "&state=" + props.params.state;
        if (props.params.district) {
          setIsActive(true);
          cond += "&district=" + props.params.district;
        }
      }
      const result = await dispatch(
        getAnalyticsAllStats(
          "?sku=" +
            (props.sku ? props.sku : prop.externalId) +
            cond +
            "&pid=" +
            prop.id +
            "&brand=" +
            prop.manufacturer +
            "&group_by=district&inventory=true&state=" +
            sku
        )
      );
      setIsActive(true);
      setAnalytics(result.data);
      setOld(result.data);
      setData([
        {
          name: "Total Sales",
          count: result.data[0].sales,
        },
        {
          name: "Total Bottle Pool",
          count: result.data[0].inventory,
        },
      ]);
    } else {
      let n = old.filter((a) => a.groupedBy == sku);
      setAnalytics(n);
      setData([
        {
          name: "Total Sales",
          count: n[0].sales,
        },
        {
          name: "Total Bottle Pool",
          count: n[0].inventory,
        },
      ]);
    }
    setActive(!active);
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{ display: "grid" }}>
        {payload.map((entry, index) => (
          <div className='renderLegendLabel'>
            <div
              className='renderLegendCircle'
              style={{ backgroundColor: `${entry.color}` }}
            />
            <div
              className='renderLabelFont'
              style={{ color: `${entry.color}` }}
            >
              {entry.payload.name === "Total Sales"
                ? "Sales"
                : "Total Bottle Pool"}
            </div>
            <div
              className='renderLabelFont'
              style={{ color: `${entry.color}` }}
            >
              {entry.payload.value.toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(analytics);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const getAnalyticsByType = async (district, i) => {
    setArrIndex(i);
    const result = await dispatch(
      getAllOrganisationTypeStats(
        "?sku=" +
          (props.sku ? props.sku : prop.externalId) +
          "&pid=" +
          prop.id +
          "&district=" +
          district
      )
    );
    setSubAnalytics(result.data);
  };

  return (
    <div className='productDetailedView'>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3'>
        <h1 className='h2'>Inventory Details</h1>
      </div>
      <div className='row'>
        <div className='col-lg-10 col-md-10 col-sm-12'>
          <div className='productDetailCard'>
            <div className='productGrid'>
              <img
                className='productImage'
                src={
                  props.brandsIconArr[
                    props.brands.indexOf(prop.manufacturer.split(" ").join(""))
                  ]
                }
              />
            </div>
            <div className='productcard'>
              <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                  <div className='productSection mb-2'>
                    <div className='profile'>
                      <img
                        src={
                          props.brandsArr[
                            props.brands.indexOf(
                              prop.manufacturer.split(" ").join("")
                            )
                          ]
                        }
                        alt=''
                        height='60'
                      />
                    </div>
                    <div className='info'>
                      <div className='name'>{name}</div>
                      <div className='caption'>{shortName}</div>
                      <div className='caption'>
                        {props.sku ? props.sku : prop.externalId}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                  <span className='productText'>
                    Return Rate{" "}
                    <span className='breweryPropertyValue'>
                      {!isNaN(prop.returnRate) ? prop.returnRate : 0}%
                    </span>
                  </span>
                  <div className='captionSubtitle'>
                    Compared to (
                    {!isNaN(prop.returnRatePrev) ? prop.returnRatePrev : 0}%
                    last month)
                  </div>
                  <div className='progress progress-line-default'>
                    <div
                      className='progress-bar progress-bar-default'
                      role='progressbar'
                      aria-valuenow='60'
                      aria-valuemin='0'
                      aria-valuemax='100'
                      style={{
                        width:
                          (!isNaN(prop.returnRate) ? prop.returnRate : 0) + "%",
                      }}
                    >
                      <span className='sr-only'>
                        {!isNaN(prop.returnRate) ? prop.returnRate : 0}%
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12 col-sm-12'>
          {active ? (
            <div className='productsChart'>
              {isActive && (
                <h2 className='stateTitle'>{stateLabel} Inventory Details</h2>
              )}
              <label className='productsChartTitle'>
                {isActive ? "Districts" : "State"}
              </label>
              <ResponsiveContainer
                width='100%'
                height={analytics.length <= 1 ? 300 : 1500}
              >
                <BarChart
                  width={500}
                  height={300}
                  layout='vertical'
                  data={analytics}
                  margin={{
                    top: 15,
                    right: 30,
                    left: 70,
                    bottom: 15,
                  }}
                  barSize={10}
                >
                  <Legend verticalAlign='top' height={36} />
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis type='number' tickFormatter={abbreviate} />
                  <YAxis
                    dataKey='groupedBy'
                    type='category'
                    scale='band'
                    offset={0}
                    tickLine={false}
                    dx={-8}
                    style={{ fontSize: "12px", fontWeight: "600" }}
                  >
                    {/* <Label 
                      value={'District'} 
                      dx={-15} 
                      dy={-20} 
                      offset={10} 
                      position="top"
                      style={{
                        fontSize: '16px',
                        fontWeight: '600'
                      }} /> */}
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Bar name='Sales' dataKey='sales' fill='#A344B7' />
                  <Bar
                    name='Total Bottle Pool'
                    dataKey='inventory'
                    fill='#FDAB0F'
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              {data &&
                data.map((item) => (
                  <div className='stateandDistrictCard mb-4'>
                    <h2>
                      {analytics.length
                        ? item.name === "Total Sales"
                          ? `${analytics[0].groupedBy} Sales`
                          : `${analytics[0].groupedBy} Total Bottle Pool`
                        : isActive
                        ? "District"
                        : "State"}
                    </h2>
                    <ResponsiveContainer width='100%' height={280}>
                      <RadialBarChart
                        width={"100%"}
                        height={400}
                        cx={220}
                        cy={130}
                        innerRadius={120}
                        barSize={20}
                        data={
                          item.name === "Total Sales"
                            ? [{ ...item, fill: "#F8AB11" }]
                            : [{ ...item, fill: "#A344B7" }]
                        }
                      >
                        <PolarAngleAxis
                          type='number'
                          domain={[
                            0,
                            data.reduce((n, { count }) => n + count, 0),
                          ]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          background
                          dataKey='count'
                          angleAxisId={0}
                          data={
                            item.name === "Total Sales"
                              ? [{ ...item, fill: "#F8AB11" }]
                              : [{ ...item, fill: "#A344B7" }]
                          }
                        />
                        <Legend
                          iconSize={10}
                          verticalAlign='bottom'
                          align={"middle"}
                          content={renderLegend}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                ))}
            </div>
          )}
          <div className='tableDetals'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>{isActive ? "District" : "State"}</th>
                  <th
                    scope='col'
                    onClick={() => requestSort("sales")}
                    className={getClassNamesFor("sales")}
                  >
                    Sales
                  </th>
                  <th
                    scope='col'
                    onClick={() => requestSort("inventory")}
                    className={getClassNamesFor("inventory")}
                  >
                    Total Bottle Pool
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length == 0 ? (
                  <tr>
                    <td colSpan='3'>No Data found</td>
                  </tr>
                ) : (
                  items.map((analytic, index) => (
                    <>
                      <tr
                        key={index}
                        onClick={() => {
                          // setIsActive((i) => !i);
                          openDetailView(analytic.groupedBy);
                          if (!isActive) {
                            setStateLabel(analytic.groupedBy);
                          } else {
                            getAnalyticsByType(
                              analytic.groupedBy,
                              analytic.groupedBy
                            );
                          }
                        }}
                      >
                        <td scope='row'>
                          <span className='stateLink'>
                            {analytic.groupedBy}
                          </span>
                        </td>
                        <td>{analytic.sales.toLocaleString("en-IN")}</td>
                        <td>{analytic.inventory.toLocaleString("en-IN")}</td>
                      </tr>
                      {arrIndex === analytic.groupedBy &&
                        subAnalytics?.map((sub, i) => (
                          <tr key={i}>
                            <td scope='row'>
                              <span className='stateLink'>{sub.type}</span>
                            </td>
                            <td scope='row'>&nbsp;</td>
                            <td scope='row'>
                              {sub.inventory.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        ))}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default iGraphicalDetailedView;
