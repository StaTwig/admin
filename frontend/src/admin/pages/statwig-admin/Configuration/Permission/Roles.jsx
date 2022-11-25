import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

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
  <MuiAccordionSummary key={props.key} {...props} />
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

export default function Roles({
  list,
  permissionType,
  permissions,
  refresh,
  flag,
  updatePermissions,
}) {
  const [expanded, setExpanded] = useState("");
  const [permission, setPermission] = useState({});

  useEffect(() => {
		let temp = permissions;
		setPermission(temp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [permissions]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="collapse-container">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        key={permission}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          key={JSON.stringify(permission)}
        >
          <div className="role-header-space">
            <div className="role-header-text-space">
              <h1 className="vl-subheading vl-black f-700 text_uppercase">
                {list}
              </h1>
            </div>
            <div className="indication-icon">
              {expanded === "panel1" ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </div>
          </div>
        </AccordionSummary>
        {Object.keys(permission).map((key, index) => (
          <AccordionDetails key={key + permission[`${key}`]}>
            <div className="permission-role-body">
              <div className="roles-card">
                <p className="vl-body vl-grey-md f-500">{key}</p>
                <Switch
                  {...label}
                  onChange={() => {
                    let obj = permission;
                    obj[`${key}`] = !obj[`${key}`];
										setPermission(obj);
										updatePermissions(permissionType, obj);
										refresh(!flag);
									}}
									checked={permission[`${key}`] ? true : false}
								/>
							</div>
						</div>
					</AccordionDetails>
				))}
			</Accordion>
		</div>
	);
}
