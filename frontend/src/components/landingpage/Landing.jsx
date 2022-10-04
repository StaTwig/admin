import React from "react";
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleAlertClick = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (event, reason) => {
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
  return (
    <React.Fragment>
      <Landingheader />
      <Showcase handleClickOpen={handleClickOpen} />
      <Client />
      <Features />
      <Services />
      <Landingfooter />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent sx={{ padding: "0rem !important" }}>
          <Contact
            handleClose={handleClose}
            handleAlertClick={handleAlertClick}
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
          severity="error"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
