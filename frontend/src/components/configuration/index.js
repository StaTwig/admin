import React, { useState, useEffect } from "react";
import Tabs from "./tabs/tabs";
import "./style.scss";
import Arrow from "../../assets/icons/arrow.png";
import Add from "../../assets/icons/add.svg";
import EditTable from "./table/editTable";
import EditTable1 from "./table1/editTable";
import { useSelector, useDispatch } from "react-redux";
import { DEFAULT_USER_ROLES } from '../../constants/userRoles';
import { DEFAULT_FEATURE_PANEL_VALUES } from '../../constants/featureConstants';
import { INVENTORY_CONSTANTS, NETWORK_CONSTANTS, ORDERS_CONSTANTS, OVERVIEW_CONSTANTS, SEARCH_CONSTANTS, SHIPMENT_CONSTANTS, TRACK_AND_TRACE_CONSTANTS } from '../../constants/functionalitiesAndPermissionContants';

//import EditTable from "./table/editTable";
import { Formik } from "formik";

import { getAllRoles, getOrgTypeiIdsUrl, getPermissionByRole, getPermissions, getWareHouses, updatePermissionsByRole } from "../../actions/organisationActions";
import { updateOrgTypesUrl } from "../../actions/organisationActions";
import { addNewOrgTypesUrl } from "../../actions/organisationActions";
import UserRoles from "../userRoles/userRoles";
import { t } from "i18next";

const Configurationpart = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const [defaultRoles, setDefaultRoles] = useState([]);
  const [showAddNewInputSection, setShowAddNewInputSection] = useState(false);
  const [featurePanelValues, setFeaturePanelValues] = useState([]);
  const [showFunctionalitiesAndPermission, setShowFunctionalitiesAndPermission] = useState(false);
  const [functionalitiesPermissionPanelData, setFunctionalitiesPermissionPanelData] = useState([]);
  const [defaultOverviewPanelValues, setDefaultOverviewPanelValues] = useState([]);
  const [permissionByRoleData, setPermissionByRoleData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [updatePermissions, setUpdatePermissions] = useState({});
  const [allPermissions, setAllPermissions] = useState({});
  const [errorForRoleNotFound, setErrorForRoleNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState('');

  const [addOrganisation, setAddOrganisation] = useState([]);
  const [blankInventory, setBlankInventory] = useState({
    orgname: "",
  });

  const [showorg, setShowOrg] = useState(true);

  const [showleft, setShowLeft] = useState(true);

  const editPo = useSelector((state) => {
    return state?.reviewPo;
  });

  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState(false);

  const [addProducts, setAddProducts] = useState([]);
  const [addProducts1, setAddProducts1] = useState([]);
  const dispatch = useDispatch();

  const [organisationsArr, setOrganisationsArr] = useState([]);

  useEffect(() => {
    dispatch(getPermissions());
    dispatch(getWareHouses());
  }, []);

  useEffect(() => {
    async function fetchOrganisationType() {
      const orgsType = await getOrgTypeiIdsUrl("CONF000");
      var arr = [];
      arr.push(orgsType.data[0].organisationTypes);
      setOrganisationsArr(arr);
    }
    fetchOrganisationType();
  }, []);

  const prepareDefaultRoleData = (data) => {
    return data.map(item => {
      let obj = {};
      obj['key'] = item;
      obj['value'] = item;
      return obj;
    })
  }

  const getPermissionsValueByUpdatePermissionOrByOriginalPermissionList = (originalPermissionState, updatedPermissionObject, currentPermisionObj, selectedFeature) => {
    if ((updatedPermissionObject && Object.keys(updatedPermissionObject).length > 0)) {
      if (Object.keys(updatedPermissionObject).includes(selectedFeature)) {
        return updatedPermissionObject[selectedFeature][currentPermisionObj.key];
      }
    }
    return originalPermissionState;
  }

  const mapPermissionToFunctionalitiesAndPermissionByFeaturePanel = (permissionsByRoleList, selectedFeature, selectedFeatureConstants) => {
    const permission = permissionsByRoleList.length > 0 ? permissionsByRoleList[0][selectedFeature] : {};

    const constants = selectedFeatureConstants.map(item => {
      if (!showAddNewInputSection && Object.keys(permission).map(key => key === item.key).filter(item => item)[0]) {
        return extractItemsWithHasPermissions(item, getPermissionsValueByUpdatePermissionOrByOriginalPermissionList, permission[item.key], updatePermissions, selectedFeature)
      } else {
        if (showAddNewInputSection) {
          return extractItemsWithHasPermissions(item, getPermissionsValueByUpdatePermissionOrByOriginalPermissionList, false, updatePermissions, selectedFeature)
        }
        return {
          ...item
        }
      }

    });
    setFunctionalitiesPermissionPanelData([...constants]);
  };

  useEffect(() => {
    //getRoles
    async function getRoles() {
      const roles = await getAllRoles();
      setDefaultRoles([...prepareDefaultRoleData(roles), { key: 'add_new_role', value: 'Add new role' }]);
      setSelectedLevel(roles[0]);
    }
    getRoles();
    setFeaturePanelValues([...DEFAULT_FEATURE_PANEL_VALUES]);
  }, []);

  useEffect(() => {
    async function getPermissions() {
      let permissions = [];
      if (!showAddNewInputSection && selectedLevel) {
        permissions = [...await getPermissionByRole(selectedLevel)];
        setPermissionByRoleData([...permissions]);
      }
      setSelectedFeature('overview');
      mapPermissionToFunctionalitiesAndPermissionByFeaturePanel(permissions, 'overview', OVERVIEW_CONSTANTS);
    }
    getPermissions();
  }, [selectedLevel]);

  var orgTypeArray = [];
  organisationsArr.map((data) => {
    for (var i = 0; i < data.length; i++) {
      orgTypeArray.push(data[i].name);
    }
  });

  const onQuantityChange = (v, i, setFieldValue) => {
    let newArr = [...addProducts];
    newArr[i].quantity = v;
    setFieldValue(
      "products",
      newArr.map((row) => ({ type: row.type }))
    );
    setAddProducts((prod) => [...newArr]);
  };

  const onAddAnotherOrganisation = () => {
    setInventoryState([...addOrganisation, blankInventory]);
  };

  const onSelectOfRole = (event) => {
    const value = event?.target?.value;
    setUpdatePermissions({});
    if (value === 'add_new_role') {
      setShowAddNewInputSection(current => current = true);
      setSelectedLevel(value);
    } else {
      setShowAddNewInputSection(current => current = false);
      setSelectedLevel(value);
    }
  };

  //should get the functionality of adding this role to the list only if only of the role is selected.
  const onChangeOfAddNewInput = (event) => {
    const { value } = event?.target;
    setShowAddNewInputSection(current => current = true);
    setSelectedLevel(value);
  }

  const handleOnClickOfAFeature = (selectedFeature) => {
    const CONSTANTS_DATA = extractConstantsBySelectedFeature(selectedFeature);
    setSelectedFeature(selectedFeature);
    mapPermissionToFunctionalitiesAndPermissionByFeaturePanel(permissionByRoleData, selectedFeature, CONSTANTS_DATA);
  }

  const setPermissionOnCheckOfAnItem = (selectedFeatureConstants, permission) => {
    const updatedPermissionData = selectedFeatureConstants.map(item => {
      if (permission.key === item.key) {
        return {
          ...item,
          hasPermission: permission.hasPermission
        }
      }
      return {
        ...item
      }
    });
    if (!showAddNewInputSection) {
      let pr =  permissionByRoleData[0];
      pr[selectedFeature][permission.key] = permission.hasPermission;
      setAllPermissions({overview: pr.overview, search: pr.search, inventory: pr.inventory, shipment: pr.shipment, order: pr.order, network: pr.network, track: pr.track, admin: pr.admin});
    }
    else
      setAllPermissions({});
  
    // console.log(pr[selectedFeature], selectedFeature, permission, permissionByRoleData);
    setFunctionalitiesPermissionPanelData([...updatedPermissionData]);
    prepareDataToUpdatePermission(updatedPermissionData, selectedFeature, selectedLevel);
  }

  const prepareKeyValueByPermissionData = (data) => {
    let obj = {};
    data.forEach(item => {
      obj = {
        ...obj,
        [item.key]: item.hasPermission
      }
    });
    return obj;
  };

  const prepareDataToUpdatePermission = (permissionData, selectedFeature, selectedLevel) => {
    const permissionsObj = prepareKeyValueByPermissionData(permissionData);
    let selectedPermissionObj = {
      permissions: {
        ...updatePermissions.permissions,
        [selectedFeature]: {
          ...permissionsObj
        }
      },
      role: selectedLevel
    }
    setUpdatePermissions(selectedPermissionObj);
  };

  const handleOnPermissionsChecked = (item) => {
    setPermissionOnCheckOfAnItem(functionalitiesPermissionPanelData, item);
  }

  const onSaveOfUpdatePermission = async () => {
    if (updatePermissions && Object.keys(updatePermissions).length > 0) {
      if (!showAddNewInputSection) {
        await requestUpdatePermissionAPIAndUpdateDefaultValues({permissions: allPermissions, role: selectedLevel}, setIsLoading);
      } else {
        if (updatePermissions.role) {
          await requestUpdatePermissionAPIAndUpdateDefaultValues(updatePermissions, setIsLoading);
        } else {
          setErrorForRoleNotFound(current => current = true);
        }
      }
    }
  }

  const permissions = useSelector((state) => {
    return state.organisation.permissions;
  });

  const addresses = useSelector((state) => {
    return state.organisation.addresses;
  });

  const acceptApproval = async (data) => {
    let result;
    if (data?.emailId) result = await addOrgUser(data);
    else result = await verifyOrgUser(data);
    if (result.status == 200) {
      if (data.rindex) reqPending.splice(data.rindex, 1);
      setMessage(result.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setError(result.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div>
      <div className="spacingbutton">
        <h1 className="breadcrumb">{t('configuration')}</h1>
        <div>
          <Tabs {...props} tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </div>
        {
          tabIndex == 0 &&
          (<UserRoles
            defaultRoles={defaultRoles}
            showAddNewInputSection={showAddNewInputSection}
            onSelectOfRole={onSelectOfRole}
            onChangeOfAddNewInput={onChangeOfAddNewInput}
            featurePanelValues={featurePanelValues}
            handleOnClickOfAFeature={handleOnClickOfAFeature}
            functionalitiesPermissionPanelData={functionalitiesPermissionPanelData}
            handleOnPermissionsChecked={handleOnPermissionsChecked}
            onSaveOfUpdatePermission={onSaveOfUpdatePermission}
            errorForRoleNotFound={errorForRoleNotFound}
            isLoading={isLoading}
            permissions={permissions}
            addresses={addresses}
            acceptApproval={acceptApproval}
            selectedFeature={selectedFeature}
            selectedLevel={selectedLevel}
          />)
        }
        {tabIndex == 6 && (
          <div className="row">
            <div className="col-2">
              <div className="card" Style="list-style: none; height:450px">
                <div className="card-body">
                  <li
                    className="p-2 "
                    onClick={() => {
                      setShowOrg(true);
                    }}
                  >
                    <a href="#">{t('Organisation')}</a>
                    <img
                      src={Arrow}
                      alt="icon"
                      width="7px"
                      height="12px"
                      className="ml-4"
                    />
                  </li>
                  <li
                    className="p-2"
                    onClick={() => {
                      setShowOrg(false);
                    }}
                  >
                    <a href="#">{t('Warehouse')}</a>
                    <img
                      src={Arrow}
                      alt="icon"
                      width="7px"
                      height="12px"
                      className="ml-4"
                    />
                  </li>
                </div>
              </div>
            </div>
            {showorg ? (
              <div className="col">
                <div className="row">
                  <p className="mb-4">
                    <b>{t('Organisation Type')}</b>
                  </p>
                  <div style={{ position: "relative", left: "70%" }}>
                    <button
                      className="btn btn-yellow ml-5 btnText"
                      onClick={() => {
                        let newArr = { name: "" };
                        setAddProducts((prod) => [...prod, newArr]);
                        setShowLeft(!showleft);
                        setCategory(true);
                      }}
                    >
                      <img src={Add} width="13" height="13" className="mr-2" />
                      <span>{t('Add New Type')}</span>
                    </button>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-6">
                      <EditTable
                        product={addProducts}
                        products={organisationsArr}
                        category={category}
                        handleQuantityChange={(v, i) =>
                          onQuantityChange(v, i, setFieldValue)
                        }
                      />
                      {/* {setShowLeft(false)}; */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <div className="col">
                  <div className="row">
                    <p className="mb-4">
                      <b>{t('Warehouse Type')}</b>
                    </p>

                    <div style={{ position: "relative", left: "70%" }}>
                      <button
                        className="btn btn-yellow ml-5 btnText"
                        onClick={() => {
                          let newArr = { name: "" };
                          setAddProducts1((prod) => [...prod, newArr]);
                          setShowLeft(!showleft);
                          // console.log(showleft,"------------------");
                        }}
                      >
                        <img src={Add} width="13" height="13" className="mr-2" />
                        <span>{t('Add New Type')}</span>
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-6">
                        <EditTable1
                          product={addProducts1}
                          products={products}
                          // category={category}
                          handleQuantityChange={(v, i) =>
                            onQuantityChange(v, i, setFieldValue)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}

        {tabIndex == 3 && (
          <div className="row d-flex flex-row p-3">
            <div className=" w-13 mt-3 mr-3">
              <div className="card">
                <div
                  className="card-body"
                  Style="list-style: none; height:450px"
                >
                  <div className="">
                    <li className="p-2 ">
                      {t('overview')}
                      <img
                        src={Arrow}
                        alt="icon"
                        width="7px"
                        height="12px"
                        className="ml-4"
                      />
                    </li>
                    <li className="p-2">
                      {t('shipment')}
                      <img
                        src={Arrow}
                        alt="icon"
                        width="7px"
                        height="12px"
                        className="ml-4"
                      />
                    </li>
                    <li className="p-2">
                      {t('inventory')}
                      <img
                        src={Arrow}
                        alt="icon"
                        width="7px"
                        height="12px"
                        className="ml-4"
                      />
                    </li>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <table class="table ">
                <thead className="borderless">
                  <tr className="borderless text-center">
                    <th scope="col"></th>
                    <th scope="col">{t('Sent')}</th>
                    <th scope="col">{t('Received')}</th>
                    <th scope="col">{t('InTransit')}</th>
                    <th scope="col">{t('Expiring')}</th>
                    <th scope="col">{t('Expired')}</th>
                    <th scope="col">{t('Delay')}</th>
                    <th scope="col">{t('Added')}</th>
                  </tr>
                </thead>
                <tbody className="borderless">
                  <tr>
                    <th scope="row">{t('Total Products')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Products Expiring this week')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Products Expiring this month')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Products Expiring this year')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Products Expired this week')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Products Expired this month')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Products Expired this year')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Shipments')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{t('Total Product in inventory')}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configurationpart;
async function requestUpdatePermissionAPIAndUpdateDefaultValues(updatePermissions, setIsLoading) {
  try {
    setIsLoading(true);
    await updatePermissionsByRole(updatePermissions);
    // window.location.reload();
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}

function extractItemsWithHasPermissions(item, getPermissionsValueByUpdatePermissionOrByOriginalPermissionList, permission, updatePermissions, selectedFeature) {
  return {
    ...item,
    hasPermission: getPermissionsValueByUpdatePermissionOrByOriginalPermissionList(permission,
      updatePermissions.permissions, item, selectedFeature)
  };
}

function extractConstantsBySelectedFeature(selectedFeature) {
  let CONSTANTS_DATA = [];
  if (selectedFeature === 'overview') {
    CONSTANTS_DATA = [...OVERVIEW_CONSTANTS];
  } else if (selectedFeature === 'search') {
    CONSTANTS_DATA = [...SEARCH_CONSTANTS];
  } else if (selectedFeature === 'inventory') {
    CONSTANTS_DATA = [...INVENTORY_CONSTANTS];
  } else if (selectedFeature === 'order') {
    CONSTANTS_DATA = [...ORDERS_CONSTANTS];
  } else if (selectedFeature === 'shipment') {
    CONSTANTS_DATA = [...SHIPMENT_CONSTANTS];
  } else if (selectedFeature === 'network') {
    CONSTANTS_DATA = [...NETWORK_CONSTANTS];
  } else if (selectedFeature === 'track') {
    CONSTANTS_DATA = [...TRACK_AND_TRACE_CONSTANTS];
  }
  return CONSTANTS_DATA;
}

