import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";

import logo from '../../assets/brands/VACCINELEDGER.png';


import './mobile-header-style.scss'

const MobileHeader = props => {
    const [sidebar, openSidebar] = useState(false);

    return (
        <div className="mobile-header">
            <div className="branding">
                <img src={logo} alt="vaccineledger" />
            </div>
            <div className="actions">
                <div className="mobile-menu" onClick={() => openSidebar(!sidebar)}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                {
                    sidebar && <div className="slider-menu">
                        {
                            <React.Fragment>
                                <Link className="slider-item border-top-0" to="/trackAndTrace">Track & Trace</Link>
                                <Link className="slider-item" to="/login">Login</Link>
                                <Link className="slider-item" to="/signup">Sign Out</Link>
                            </React.Fragment>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default MobileHeader;
