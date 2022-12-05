import React, { useState, useEffect, useRef } from "react";
import "./Users.css";
import AnalyticsCard from "../../../common/AnalyticsCard/AnalyticsCard";
import { Dialog, DialogContent } from "@mui/material";
import UsersTable from "./UsersTable/UsersTable";
import AddUsers from "../../../components/AddUsers/AddUsers";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import UploadPopup from "../../../common/UploadPopup/UploadPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrgUser,
  getAllOrganisations,
  getAllRoles,
  getAllRolesForTPL,
  getOrgActiveUsers,
  getPermissions,
  getRecentReqSent,
  getRequestsPending,
  getWareHouses,
  getOrgUserAnalytics,
} from "../../../actions/organisationActions";
import { useTranslation } from "react-i18next";
import AddOrganization from "../../../components/AddOrganization/AddOrganization";

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

export default function Users(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tableFlag, setTableFlag] = useState(false);

  const user = useSelector((state) => state.user);
  const permissions = useSelector(
    (state) => state?.organisationReducer?.permissions
  );
  const addresses = useSelector(
    (state) => state?.organisationReducer?.addresses
  );
  const { userAnalytics } = useSelector((state) => state.organisationReducer);
  const { totalCount, activeCount, inactiveCount } = userAnalytics;

  const [ButtonOpen, setButtonOpen] = useState(false);
  const [ButtonOpen2, setButtonOpen2] = useState(false);

  let domNode = useClickOutside(() => {
    setButtonOpen(false);
  });

  let domNode2 = useClickOutside(() => {
    setButtonOpen2(false);
  });

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [defaultRoles, setDefaultRoles] = useState([]);
  const [smallWidth] = React.useState("sm");
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("md");
  const [Importopen, setImportOpen] = React.useState(false);
  const [Importopen2, setImportOpen2] = React.useState(false);

  useEffect(() => {
    dispatch(getRequestsPending());
    props.user.organisationType == "Third Party Logistics"
      ? dispatch(getPermissions(props.user.organisationId))
      : dispatch(getPermissions());
    dispatch(getRecentReqSent());
    dispatch(getAllOrganisations());
    dispatch(getOrgActiveUsers());
    dispatch(getWareHouses());
    dispatch(getOrgUserAnalytics(user.organisationId));

    //getRoles
    async function getRoles() {
      var roles = [];
      if (props.user.organisationType == "Third Party Logistics") {
        roles = await getAllRolesForTPL(props.user.organisationId);
      } else {
        roles = await getAllRoles();
      }
      setDefaultRoles(roles);
    }
    getRoles();
  }, []);

  const onSuccess = async (data) => {
    try {
      const result = await addOrgUser(data);
      if (result.status === 200) {
        console.log("User added successfully!");
        handleClose();
      } else {
        console.log("Error in adding user - ", result.data.message);
      }
    } catch (err) {
      console.log("error - ", err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleImportClose = () => {
    setImportOpen(false);
  };
  const handleImportClickOpen = () => {
    setImportOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleImportClose2 = () => {
    setImportOpen2(false);
  };
  const handleImportClickOpen2 = () => {
    setImportOpen2(true);
  };
  return (
    <>
      <OrgHeader />
      <section className="admin-page-layout">
        <div className="admin-container">
          <div className="admin-organization-container admin-section-space">
            <div className="tiles-three-column-layout">
              <AnalyticsCard
                layout="type4"
                icon="fa-building"
                value={totalCount}
                valueTitle={t("to_no_of_user")}
                bgColor="analytic-bg-1"
                textColor="analytic-text-1"
              />
              <AnalyticsCard
                layout="type4"
                icon="fa-building"
                value={activeCount}
                valueTitle={`${t("active")} ${t("users")}`}
                bgColor="analytic-bg-2"
                textColor="analytic-text-2"
              />
              <AnalyticsCard
                layout="type4"
                icon="fa-building"
                value={inactiveCount}
                valueTitle={`${t("inactive")} ${t("users")}`}
                bgColor="analytic-bg-3"
                textColor="analytic-text-3"
              />
            </div>
            <div className="organization-table-container">
              <div className="organization-table-header-area">
                <div className="table-search-bar">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder={t("search")} />
                </div>
                <div className="table-actions-area">
                  {(user.type === "DISTRIBUTORS" || user.type === "DROGUERIA") && <div className="table-dropdown-button" ref={domNode2}>
                    <button
                      className="vl-btn vl-btn-alt vl-btn-primary"
                      // onClick={() => setButtonOpen(!ButtonOpen)}
                      onClick={() => setButtonOpen2(true)}
                    >
                      {t("add_pharmacies")}
                    </button>

                    <div
                      className={`button-dropdown ${ButtonOpen2 && "active"}`}
                    >
                      <div
                        className="btn-dropdown-card"
                        onClick={handleImportClickOpen2}
                      >
                        <i className="fa-solid fa-upload"></i>
                        <p className="vl-note f-500">{t("import_pharmacy")}</p>
                      </div>
                      <div
                        className="btn-dropdown-card"
                        onClick={handleClickOpen2}
                      >
                        <i className="fa-solid fa-plus"></i>
                        <p className="vl-note f-500">{t("add_pharmacy")}</p>
                      </div>
                    </div>
                  </div>}
                  <div className="table-dropdown-button" ref={domNode}>
                    <button
                      className="vl-btn vl-btn-alt vl-btn-primary"
                      // onClick={() => setButtonOpen(!ButtonOpen)}
                      onClick={() => setButtonOpen(true)}
                    >
                      {t("add_users")}
                    </button>

                    <div
                      className={`button-dropdown ${ButtonOpen && "active"}`}
                    >
                      <div
                        className="btn-dropdown-card"
                        onClick={handleImportClickOpen}
                      >
                        <i className="fa-solid fa-upload"></i>
                        <p className="vl-note f-500">{t("import_users")}</p>
                      </div>
                      <div
                        className="btn-dropdown-card"
                        onClick={handleClickOpen}
                      >
                        <i className="fa-solid fa-plus"></i>
                        <p className="vl-note f-500">{t("add_users")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <UsersTable
                t={t}
                defaultRoles={defaultRoles}
                tableFlag={tableFlag}
              />
            </div>
          </div>
        </div>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogContent sx={{ padding: "0rem !important" }}>
            <AddUsers
              t={t}
              handleClose={handleClose}
              addresses={addresses}
              defaultRoles={defaultRoles}
              onSuccess={onSuccess}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={smallWidth}
          open={Importopen}
          onClose={handleImportClose}
        >
          <DialogContent sx={{ padding: "0rem !important" }}>
            <UploadPopup
              t={t}
              type="user"
              orgUpload={false}
              resetFlag={() => {
                setTableFlag(!tableFlag);
              }}
              handleImportClose={handleImportClose}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open2}
          onClose={handleClose2}
        >
          <DialogContent sx={{ padding: "0rem !important" }}>
            <AddOrganization
              t={t}
              resetFlag={() => {
                setTableFlag(!tableFlag);
              }}
              handleClose={handleClose2}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={smallWidth}
          open={Importopen2}
          onClose={handleImportClose2}
        >
          <DialogContent sx={{ padding: "0rem !important" }}>
            <UploadPopup
              t={t}
              type="org"
              orgUpload={true}
              resetFlag={() => {
                setTableFlag(!tableFlag);
              }}
              handleImportClose={handleImportClose2}
            />
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
