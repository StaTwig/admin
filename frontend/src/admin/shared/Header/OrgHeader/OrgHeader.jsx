import React, { useEffect, useRef } from "react";
import vaccineledger from "../../../assets/files/brands/vaccineledger.svg";
import profile from "../../../assets/files/profile/profile.jpg";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getImage } from "../../../../actions/notificationActions";
import { useTranslation } from "react-i18next";
import EnglishFlag from "../../../../assets/files/images/flags/English.webp";
import SpanishFlag from "../../../../assets/files/images/flags/Spanish.webp";
import { logoutUser } from "../../../../actions/userActions";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

export default function OrgHeader() {
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  let domNode = useClickOutside(() => {
    setProfileClickBtn(false);
  });

  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    let userName = user?.firstName;
    let org = user?.organisation?.split("/")[0];
    if (user?.photoId) {
      getImage(profile?.photoId).then((result) => {
        setImage(result?.data);
      });
    }

    setName(userName);
    setOrgName(org);
  }, [user]);

  const handleUiSwitch = () => {
    history.push("/overview");
  };

  const [ProfileClickBtn, setProfileClickBtn] = useState(false);
  const [LangOption, setLangOption] = React.useState(i18n.language);

  const changeLanguage = (option) => {
    setLangOption(option);
    i18n.changeLanguage(option);
    setProfileClickBtn(false);
  };

  return (
    <header className='admin-header'>
      <div className='admin-container'>
        <nav className='admin-nav'>
          <article className='admin-nav-left'>
            <figure className='admin-logo'>
              <img src={vaccineledger} alt='vaccineledger' />
            </figure>
            <ul className='admin-nav-list'>
              <li className='admin-nav-item'>
                <Link
                  to='/org/dashboard'
                  className={`admin-nav-link ${
                    location.pathname === "/org/dashboard" && "active"
                  }`}
                >
                  <p className="vl-note">{t("dashboard")}</p>
                </Link>
              </li>
              <li className='admin-nav-item'>
                <Link
                  to='/org/manage-users'
                  className={`admin-nav-link ${
                    location.pathname === "/org/manage-users" && "active"
                  }`}
                >
                  <p className="vl-note">{t("manage_user")}</p>
                </Link>
              </li>
              <li className='admin-nav-item'>
                <Link
                  to='/org/product-list'
                  className={`admin-nav-link ${
                    location.pathname === "/org/product-list" && "active"
                  }`}
                >
                  <p className="vl-note">{t("prod_list")}</p>
                </Link>
              </li>
            </ul>
          </article>
          <article className="admin-nav-right">
            <ul className="admin-nav-list switch-button-container">
              <li className="admin-nav-item configure-link">
                <div className="switch-button">
                  <p className="vl-note">{t("admin")}</p>
                  <i class="fa-solid fa-caret-down"></i>
                </div>
                <div className={`configure-list active `}>
                  <button
                    onClick={handleUiSwitch}
                    className='vl-btn vl-btn-sm vl-btn-full vl-btn-primary'
                  >
                    {t("switch_to_user")}
                  </button>
                </div>
              </li>
              {/* <li className="admin-nav-item">
                <Link className="admin-nav-link">
                  <Badge color="error" variant="dot">
                    <i className="fa-solid fa-bell"></i>
                  </Badge>
                </Link>
              </li> */}
            </ul>
            <div className="admin-mini-profile" ref={domNode}>
              <div
                className="admin-profile-card vl-flex-md"
                onClick={() => setProfileClickBtn(!ProfileClickBtn)}
              >
                {image && (
                  <figure className='profile-space'>
                    <img src={image} alt='profile' />
                  </figure>
                )}
                <hgroup className="profile-name-card">
                  <h1 className="vl-note vl-light f-700">{name}</h1>
                  <h2 className="vl-small vl-light f-400">{orgName}</h2>
                </hgroup>
              </div>
              <div
                className={`admin-header__profile_dropdown ${
                  ProfileClickBtn && "active"
                }`}
              >
                <div className="header__profile_top">
                  <div className="header__inner_profile_icon">
                    <div className="green__active"></div>
                    <img src={image} alt="image" />
                  </div>
                  <div className="header__inner_profile_content">
                    <h1 className="vl-name-header f-500 profile__black">
                      {name}
                    </h1>
                    <p className="vl-note f-400 vl-grey-sm"> {orgName}</p>
                  </div>
                </div>
                <div className="header__profile_middle">
                  <div
                    className="header__link__card"
                    onClick={() => {
                      if (LangOption === "en") {
                        changeLanguage("es");
                      } else {
                        changeLanguage("en");
                      }
                    }}
                  >
                    <i class="fa-solid fa-earth-americas"></i>
                    <div className="langugae__option">
                      <p className="vl-body f-400">{t("switch_lang")}</p>
                      <div className="lang__logo">
                        <p className="vl-small f-400">
                          {LangOption === "en" ? "SPA" : "ENG"}
                        </p>
                        <img
                          src={LangOption === "en" ? SpanishFlag : EnglishFlag}
                          className="lang__flag"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="header__profile_bottom">
                  <div
                    className="header__link__card"
                    onClick={() => dispatch(logoutUser())}
                  >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <p className="vl-body f-400">{t("sign_out")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='mobile-menu-icon'>
              <i className='fa-solid fa-bars vl-light'></i>
            </div>
          </article>
        </nav>
      </div>
    </header>
  );
}
