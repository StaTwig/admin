import React, { useState } from "react";
import CustomDropdown from "../customDropdown";

import Arrow from "../../assets/icons/arrow.png";
import Spinner from "../spinner";
import Modal from "../../shared/modal";
import NUModal from "../users/NUModal";
import SuccessPopUp from "../../shared/PopUp/successPopUp";
import { t } from "i18next";

const Integrations = ({
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
}) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [btnTxt, setBtnTxt] = useState("");
  const [isDisabled, setDisable] = useState(true);
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [message, setMessage] = useState("Successfully Updated Configuration");
  const [subTab, setsubTab] = useState(1);

  const unDisableBtn = () => {
    console.log("enable save button");
    setDisable(false);
    document.getElementById("saveBtn").style.backgroundColor = "#0093e9";
    document.getElementById("saveBtn").style.opacity = "1";
  };

  const closeModals = () => {
    setShowSuccessModel(false);
  };

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
      <div className="user-role-header">
        <div className="input-section">
          <div className="role-section">
            <span className="text">{t("Role Title")}</span>
            <CustomDropdown
              data={defaultRoles}
              selected={selectedLevel}
              onSelectOfRole={onSelectOfRole}
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
          {/* <button
            className="add-user-btn"
            style={{outline:"none"}}
            onClick={() => {
              setTitle("ADD NEW USER");
              setBtnTxt("ADD USER");
              setData([]);
              setShowModal(true);
            }}
          >
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">{t('add_new_user_role')}</span>
          </button> */}
        </div>
      </div>
      <div className="user-role-content">
        <div className="card card-container p-2 mt-2">
          <div className="list-group list-group-flush">
            <a
              className={`list-group-item list-group-item-action feature-panel selectedFeature`}
              onClick={() => setsubTab(1)}
            >
              {" "}
              IOT
              <img src={Arrow} alt="icon" width="7px" height="12px" />
            </a>
            <a
              className={`list-group-item list-group-item-action feature-panel `}
              onClick={() => setsubTab(2)}
            >
              {" "}
              ERP
              <img src={Arrow} alt="icon" width="7px" height="12px" />
            </a>
            <a
              className={`list-group-item list-group-item-action feature-panel`}
              onClick={() => setsubTab(3)}
            >
              {" "}
              Line Management
              <img src={Arrow} alt="icon" width="7px" height="12px" />
            </a>
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
          {subTab === 1 && (
            <>
              <div className="permission-selection-panal">
                <div className="selection-panel">
                  <span>Roambee</span>
                </div>
                <div className="selection-panel">
                  <input
                    onClick={unDisableBtn}
                    type="checkbox"
                    style={{
                      marginRight: "50px",
                    }}
                  />
                </div>
              </div>
              <div className="permission-selection-panal">
                <div className="selection-panel">
                  <span>Mobileye</span>
                </div>
                <div className="selection-panel">
                  <input
                    onClick={unDisableBtn}
                    type="checkbox"
                    style={{
                      marginRight: "50px",
                    }}
                  />
                </div>
              </div>
              <div className="permission-selection-panal">
                <div className="selection-panel">
                  <span>Vacus</span>
                </div>
                <div className="selection-panel">
                  <input
                    onClick={unDisableBtn}
                    type="checkbox"
                    style={{
                      marginRight: "50px",
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {subTab === 2 && (
            <>
              <div className="permission-selection-panal">
                <div className="selection-panel">
                  <span>SAP</span>
                </div>
                <div className="selection-panel">
                  <input
                    onClick={unDisableBtn}
                    type="checkbox"
                    style={{
                      marginRight: "50px",
                    }}
                  />
                </div>
              </div>
              <div className="permission-selection-panal">
                <div className="selection-panel">
                  <span>Other</span>
                </div>
                <div className="selection-panel">
                  <input
                    onClick={unDisableBtn}
                    type="checkbox"
                    style={{
                      marginRight: "50px",
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {subTab === 3 && (
            <>
              <div className="permission-selection-panal">
                <div className="selection-panel">
                  <span>ABC</span>
                </div>
                <div className="selection-panel">
                  <input
                    onClick={unDisableBtn}
                    type="checkbox"
                    style={{
                      marginRight: "50px",
                    }}
                  />
                </div>
              </div>
              <div className="permission-selection-panal">
                <div className="selection-panel">
                  <span>XYZ</span>
                </div>
                <div className="selection-panel">
                  <input
                    onClick={unDisableBtn}
                    type="checkbox"
                    style={{
                      marginRight: "50px",
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
