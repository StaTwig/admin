import React from "react";
import "../../style.scss";
import becks from "../../../../assets/images/becks.png";
import bottlesIcon from "../../../../assets/becks_330ml.png";
import profile from "../../../../assets/user.png";

const BreweryDetailedView = (props) => {
    return (
        <div >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Dashboard - Detailed Brewery view</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                </div>
            </div>

            <div className="btn-group mainButtonFilter">
                <a href="#!" className="btn active">Brewery</a>
                <select className="btn selectState">
                    <option>All</option>
                    <option>SPR Mysuru</option>
                </select>
            </div>

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
                    <div className="col-lg-12 col-md-12">
                        <div className="tableDetals">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Vendor</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Sales</th>
                                        <th scope="col">Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">
                                            <div className="displayImageName">
                                                <img src={profile} className='displayImage' />
                                                Nicolas Cook
                                            </div>
                                        </td>
                                        <td>333333</td>
                                        <td>333333</td>
                                        <td>333333</td>
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
export default BreweryDetailedView;