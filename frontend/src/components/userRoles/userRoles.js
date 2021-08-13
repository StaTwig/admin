import React from "react";
import CustomDropdown from "../customDropdown";
import "./styles.scss";

import Arrow from "../../assets/icons/arrow.png";
import Spinner from "../spinner";

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
}) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="user-role-container">
      <div className="user-role-header">
        <div className="input-section">
          <div className="role-section">
            <span className="text">{"Role Title"}</span>
            <CustomDropdown
              data={defaultRoles}
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
            className="save-button"
            onClick={() => onSaveOfUpdatePermission()}
          >
            {"SAVE"}
          </button>
          <button className="add-user-btn">
            <i className="fa fa-plus txt pr-2" aria-hidden="true"></i>
            <span className="txt">{"Add New User Role"}</span>
          </button>
        </div>
      </div>
      <div className="user-role-content">
        <div className="card card-container">
          <div className="list-group list-group-flush">
            {featurePanelValues?.map((item, index) => {
              return (
                <a
                  key={index}
                  className="list-group-item list-group-item-action feature-panel"
                  onClick={() => handleOnClickOfAFeature(item.key)}
                >
                  {item.value}
                  <img src={Arrow} alt="icon" width="7px" height="12px" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="feature-functionality-permissions">
          <div className="feature-functionality-permissions-headers">
            <span className="functionality-permission-text">
              {"Functionality"}
            </span>
            <span className="functionality-permission-text">
              {"Permission"}
            </span>
          </div>
          {functionalitiesPermissionPanelData.length > 0
            ? functionalitiesPermissionPanelData.map((item, index) => {
                return (
                  <div key={index} className="permission-selection-panal">
                    <div className="selection-panel">
                      <span>{item.value}</span>
                    </div>
                    <div className="selection-panel">
                      <input
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
            : ""}
        </div>
      </div>
    </div>
  );
};

export default UserRoles;