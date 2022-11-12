import React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Roles({ list }) {
  const [expanded, setExpanded] = React.useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    borderRadius: "0.8rem",
    margin: "1rem 0 !important",
    background: `#fff`,
    boxShadow: `rgba(0, 0, 0, 0.08) 0px 4px 12px`,
    border: "1px solid #eee",
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary {...props} />
  ))(({ theme }) => ({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
    padding: "1rem 1rem !important",
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }));

  return (
    <div className="collapse-container">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="role-header-space">
            <div className="role-header-text-space">
              <h1 className="vl-subheading vl-black f-700">{list.id}</h1>
              <h1 className="vl-subheading vl-black f-700">{list.title}</h1>
            </div>
            <div className="indication-icon">
              {expanded === "panel1" ? (
                <i class="fa-solid fa-chevron-up"></i>
              ) : (
                <i class="fa-solid fa-chevron-down"></i>
              )}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="permission-role-body">
            <div className="roles-card">
              <p className="vl-body vl-grey-md f-500">Search by Order ID</p>
              <Switch {...label} />
            </div>
            <div className="roles-card">
              <p className="vl-body vl-grey-md f-500">
                Search by Product Category
              </p>
              <Switch {...label} />
            </div>
            <div className="roles-card">
              <p className="vl-body vl-grey-md f-500">Search by Product ID</p>
              <Switch {...label} />
            </div>
            <div className="roles-card">
              <p className="vl-body vl-grey-md f-500">Search by Product Name</p>
              <Switch {...label} />
            </div>
            <div className="roles-card">
              <p className="vl-body vl-grey-md f-500">Search by Shipment ID</p>
              <Switch {...label} />
            </div>
            <div className="roles-card">
              <p className="vl-body vl-grey-md f-500">
                Search by Transit Number
              </p>
              <Switch {...label} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
