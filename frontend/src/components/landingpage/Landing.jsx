import React, { useState, useEffect, useRef } from "react";
import Client from "./clients/Client";
import Contact from "./contact/Contact";
import Features from "./features/Features";
import Landingfooter from "./landing-footer/Landingfooter";
import Landingheader from "./landing-header/Landingheader";
import Services from "./services/Services";
import Showcase from "./showcase/Showcase";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertDetails, setAlertDetails] = React.useState({});

  const serviceRef = useRef(null);
  const contactRef = useRef(null);

  const { t, i18n } = useTranslation();

  const [LanguageOpen, setLanguageOpen] = useState(false);
  const [Language, setLanguage] = useState(i18n.language);

  let domNode = useClickOutside(() => {
    setLanguageOpen(false);
  });

  const [LangOption, setLangOption] = React.useState(i18n.language);

  console.log(LangOption);

  const changeLanguage = (option) => {
    setLangOption(option);
    console.log(option);
    setLanguage(option);
    setLanguageOpen(false);
    i18n.changeLanguage(option);
  };

  const handleAlertClick = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    setAlertDetails({});
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavClick = (option) => {
    switch (option) {
      case "service":
        serviceRef.current?.scrollIntoView({ behavaiour: "smooth" });
        break;
      case "contact":
        contactRef.current?.scrollIntoView({ behavaiour: "smooth" });
        break;
    }
  };

  return (
    <React.Fragment>
      <Landingheader
        handleNavClick={handleNavClick}
        changeLanguage={changeLanguage}
        domNode={domNode}
        LanguageOpen={LanguageOpen}
        Language={Language}
        setLanguageOpen={setLanguageOpen}
        t={t}
      />
      <Showcase handleClickOpen={handleClickOpen} t={t} />

      <Client t={t} />
      <Features t={t} />
      <Services t={t} serviceRef={serviceRef} />
      <Landingfooter t={t} contactRef={contactRef} />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent sx={{ padding: "0rem !important" }}>
          <Contact
            t={t}
            handleClose={handleClose}
            handleAlertClick={handleAlertClick}
            setAlertDetails={setAlertDetails}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertDetails?.type}
          sx={{ width: "100%" }}
        >
          {alertDetails?.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
