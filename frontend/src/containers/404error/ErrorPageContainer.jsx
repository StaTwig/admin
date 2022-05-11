import React from "react";
import Header from "../../shared/header";
import { useTranslation } from "react-i18next";
import ErrorPage from "../../components/404error/ErrorPage";
import "./style.scss";

export default function ErrorPageContainer(props) {
  const { t } = useTranslation();
  return (
    <div className='error-grid-container'>
      <Header {...props} t={t} />
      <div className='page-grid-content'>
        <ErrorPage {...props} t={t} />
      </div>
    </div>
  );
}
