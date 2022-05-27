import React from 'react'
import {Link} from "react-router-dom";

const NoMatch = () => (
<div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
    <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
    <div className="inline-block align-middle">
    	<h2 className="font-weight-normal lead" id="desc">The page you requested was not found. <Link to="/overview"> Return to Home </Link></h2>
    </div>
</div>
)

export default NoMatch