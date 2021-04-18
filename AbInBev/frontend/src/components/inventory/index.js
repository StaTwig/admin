import React from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import "./style.scss";
import SideBar from "../../components/sidebar";
import filterIcon from "../../assets/icons/funnel.svg"



const Inventory = (props) => {
  return (
    <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 d-none d-md-block padding0 greyBG">
              <SideBar {...props} />
            </div>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
              <div className="row">
                <div className="col-md-9 mainContainer pt-3 px-4">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                    <h1 className="h2">Inventory</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                      </svg>
                    </div>
                  </div>

                  <div class="btn-group mainButtonFilter">
                    <a href="#!" class="btn active">Brewery</a>
                    <span className="breweryTitle">Vendor</span>
                  </div>
                  
                  <div className="inventoryDetails">
                      <table className="inventorytable">
                        <thead>
                          <tr>
                            <th className="inventoryHeader">Brand <br/><span className="tableHeadersubtitle">Size</span></th>
                            <th className="inventoryHeader">SKU<br/><span className="tableHeadersubtitle">Stock Code</span></th>
                            <th className="inventoryHeader">Stock Long Description</th>
                            <th className="inventoryHeader">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                          <tr>
                            <td className="inventorydesc">Knock Out <br/><span className="inventorydescsubtitle">330</span></td>
                            <td className="inventorydesc">Adonis 330ml <br/><span className="inventorydescsubtitle">52614</span></td>
                            <td>NRB Old Patent Haywards 330ml</td>
                            <td>330</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
              
                </div>
                <div className="col-md-3 rightSideMenu pt-3 px-2">
                  <div className="filterSection">
                    <div className="filterHeader">
                      <img src={filterIcon} className="filterIcon"/> FILTERS
                    </div>
                    <span className="pull-right pr-4 pl-4 viewall"><a href="#">View All</a></span>
                    <label className="filterSubHeading mt-2">Select Brewery </label>
                    <select className="filterSelect mt-2">
                      <option>Select Brewery</option>
                    </select>

                    <label className="filterSubHeading mt-2">Select SKU</label>
                    <select className="filterSelect mt-2">
                      <option>Select SKU</option>
                    </select>
                  </div>   
                </div>
              </div>
              
            </main>
          </div>
        </div>
    );
};
export default Inventory;
