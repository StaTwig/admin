import React, { useState } from "react";
import CustomDropdown from "../customDropdown";
import "./styles.scss";

import Arrow from "../../assets/icons/arrow.png";
import info from "../../assets/icons/info_icon.png";
import Spinner from "../spinner";
import Modal from "../../shared/modal";
import NUModal from "../users/NUModal";
import SuccessPopUp from "../../shared/PopUp/successPopUp";

import { t } from "i18next";

const UserRoles = ({
  defaultRoles,
  showAddNewInputSection,
  onSelectOfRole,
  onChangeOfAddNewInput,
  featurePanelValues,
  handleOnClickOfAFeature,
  functionalitiesPermissionPanelData,
  handleOnPermissionsChecked,
  onSaveOfUpdatePermission,
  isLoading,
  permissions,
  acceptApproval,
  addresses,
  selectedFeature,
  selectedLevel,
  // newRoleState,
  ...props
}) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [TabName, setTabName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [btnTxt, setBtnTxt] = useState("");
  const [isDisabled, setDisable] = useState(true);
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [message, setMessage] = useState("Successfully Updated Configuration");
  const [permissionRoles, setPermissionRoles] = useState([]);

  React.useEffect(() => {
   if(props?.userRoles){ let role = [];
    for (let i = 0; i < permissions.length; i++) {
      for (let j = 0; j < props.userRoles.length; j++) {
        if (permissions[i].role === props.userRoles[j]) {
          role.push(permissions[i]);
          continue;
       }
      }
     }
     setPermissionRoles(role);}
  }, [])
  

  // const [newRoleForuser, setNewRoleForuser] = props?.newRoleState;

  const unDisableBtn = () => {
    console.log("enable save button");
    setDisable(false);
    document.getElementById("saveBtn").style.backgroundColor = "#0093e9";
    document.getElementById("saveBtn").style.opacity = "1";
  };

  const closeModals = () => {
    setShowSuccessModel(false);
    if (props?.newRoleState && props?.newRoleState[0]) props.history.push('/overview', { state: { newUser: true } })
  };
  console.log({ featurePanelValues });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="user-role-container">
      {showModal && (
        <Modal
          close={closeModal}
          title={title}
          size="modal-lg" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <NUModal
            data={data}
            permissions={permissions}
            addresses={addresses}
            onSuccess={() => {
              acceptApproval(data);
              closeModal();
            }}
            onHide={closeModal}
            buttonText={btnTxt}
            setData={setData}
            defaultRoles={permissionRoles}
          />
        </Modal>
      )}
      {showSuccessModel && (
        <Modal
          close={closeModals}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopUp onHide={closeModals} message={message} />
        </Modal>
      )}
      {props?.tabIndex === 2 &&
        <div className="user-role-tpl-head">
          <h4 className="user-role-tpl-heading" >Third party system integrations</h4>
          <div className="user-role-info" >
            <img src={info} alt="info" width={'20px'} style={{ paddingBottom: '6px' }} />
            <div className="user-role-information" >
              You can integrate the below listed addons into VaccineLedger. Based on user privileges your organization users can utilize the respective functionalities based on the user previlizes
            </div>
          </div>
        </div>
      }
      {props?.tabIndex !== 2 && <div className="user-role-header">
        <div className="input-section">
          <div className="role-section">
            <span className="text">{t("Role Title")}</span>
            <CustomDropdown
              data={defaultRoles}
              selected={selectedLevel}
              onSelectOfRole={onSelectOfRole}
              t={t}
            />
          </div>
          {showAddNewInputSection && (
            <div className="role-section">
              <span className="text">{"Add new Role"}</span>
              <input
                id="add-new-role"
                className="add-new-section-input"
                onChange={(e) => onChangeOfAddNewInput(e)}
                placeholder={"Add a new role"}
              />
            </div>
          )}
        </div>
        <div className={"btn-section"}>
          <button
            id="saveBtn"
            className="save-button"
            onClick={() => {
              onSaveOfUpdatePermission();
              setDisable(true);
              setShowSuccessModel(true);
            }}
            disabled={isDisabled}
          >
            {t("save")}
          </button>
          <button
            className="add-user-btn"
            style={{ outline: "none" }}
            onClick={() => {
              setTitle("ADD NEW USER");
              setBtnTxt("ADD USER");
              setData([]);
              setShowModal(true);
            }}
          >
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">{t('add_new_user_role')}</span>
          </button>
        </div>
      </div>}
      <div className="user-role-content">
        <div className="card card-container p-2 mt-2">
          <div className="list-group list-group-flush">
            {featurePanelValues?.map((item, index) => {
              return (
                <a
                  key={index}
                  className={`list-group-item list-group-item-action feature-panel ${item.key === selectedFeature ? "selectedFeature" : ""
                    }`}
                  onClick={() => {
                    handleOnClickOfAFeature(item.key);
                    setTabName(item.value);
                  }}
                >
                  {t(item.value)}
                  <img src={Arrow} alt="icon" width="7px" height="12px" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="feature-functionality-permissions">
          <div className="feature-functionality-permissions-headers">
            <span className="functionality-permission-text">
              {t("functionality")}
            </span>
            <span className="functionality-permission-text">
              {t("permission")}
            </span>
          </div>
          {functionalitiesPermissionPanelData.length > 0
            ? functionalitiesPermissionPanelData.map((item, index) => {
              return (
                <div key={index} className="permission-selection-panal">
                  <div className="selection-panel">
                    <span>{t(item.value)}</span>
                  </div>
                  <div className="selection-panel">
                    <input
                      onClick={unDisableBtn}
                      type="checkbox"
                      style={{
                        marginRight: "50px",
                      }}
                      checked={item.hasPermission}
                      onChange={() =>
                        handleOnPermissionsChecked({
                          ...item,
                          hasPermission: !item.hasPermission,
                        })
                      }
                    />
                  </div>
                </div>
              );
            })
            : <div className="user-role-empty-func">  Will be available soon </div>}
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
