import React from 'react';
import "./style.scss";
import errorImage from "../../assets/images/error.png";
import { Link } from 'react-router-dom';


export default function ErrorPage(props) {
    const { t } = props;
    return (
        <div className="error-page-layout">
            <div className="error-container-lid">
                <div className="error-main-container">
                <figure>
                    <img src={errorImage} alt="" className="error-image" />
                </figure>
                <article className='content-area'>
                    <h1 className="error-heading">{t("something_went_wrong")}</h1>
                    <p className="error-message">{t("sorry_msg")}</p>
                    <p className="error-message">{t("sorry_reason")}</p>
                    <Link to="/"><button className="home-btn btn btn-primary">{t("back_to_home")}</button></Link>
                </article>
                </div>
            </div>
        </div>
    )
}
