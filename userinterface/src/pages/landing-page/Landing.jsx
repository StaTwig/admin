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

export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");

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
          <Contact handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
