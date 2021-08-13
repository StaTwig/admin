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

import { getAllRoles, getOrgTypeiIdsUrl, getPermissionByRole, getPermissions, updatePermissionsByRole } from "../../actions/organisationActions";
import { updateOrgTypesUrl } from "../../actions/organisationActions";
import { addNewOrgTypesUrl } from "../../actions/organisationActions";
import UserRoles from "../userRoles/userRoles";

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
    if((updatedPermissionObject && Object.keys(updatedPermissionObject).length > 0))
      {
        if(Object.keys(updatedPermissionObject).includes(selectedFeature)) {
          return updatedPermissionObject[selectedFeature][currentPermisionObj.key];
        }
    }
    return originalPermissionState;
  }

  const mapPermissionToFunctionalitiesAndPermissionByFeaturePanel = (permissionsByRoleList, selectedFeature, selectedFeatureConstants) => {
    const permission = permissionsByRoleList.length > 0 ? permissionsByRoleList[0][selectedFeature] : {};
    const constants = selectedFeatureConstants.map(item => {
      if (Object.keys(permission).map(key => key === item.key)) {
        return {
          ...item,
          hasPermission: getPermissionsValueByUpdatePermissionOrByOriginalPermissionList(permission[item.key], updatePermissions.permissions, item, selectedFeature)
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
      const permissions = await getPermissionByRole(selectedLevel);
      setPermissionByRoleData([...permissions]);
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
    console.log('onchange of add new inputs: ', value);
    // setShowAddNewInputSection(current => current = true);
    // setSelectedLevel(value);
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

  //TODO: CHECKS THE VALUES of add new roles...
  const checkIfAllThePermissionsAreMarked = (obj) => {
    Object.keys(obj['permissions']).map(key => {
      if(obj['permissions'][key]) {
        console.log(obj.permissions[key])
      }
    })
  }

  const onSaveOfUpdatePermission = async () => {
    if (updatePermissions && Object.keys(updatePermissions).length > 0) {
      if (!showAddNewInputSection) {
        console.log('update: permissions', updatePermissions);
        const permissions = await updatePermissionsByRole(updatePermissions);
        setPermissionByRoleData([permissions]);
        setSelectedFeature('overview');
        mapPermissionToFunctionalitiesAndPermissionByFeaturePanel([permissions], 'overview', OVERVIEW_CONSTANTS);
      } else {
        checkIfAllThePermissionsAreMarked(updatePermissions);
        // const permissions = await updatePermissionsByRole(updatePermissions);
        // console.log(permissions);
      }
    }
  }

  return (
    <div>
      <div className="addproduct">
        <h1 className="breadcrumb">CONFIGURATION</h1>
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
                    <a href="#">Organisation</a>
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
                    <a href="#"> Warehouse</a>
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
                    <b>Organisation Type</b>
                  </p>
                  <div style={{ position: "relative", left: "70%" }}>
                    <button
                      className="btn btn-yellow ml-5"
                      onClick={() => {
                        let newArr = { name: "" };
                        setAddProducts((prod) => [...prod, newArr]);
                        setShowLeft(!showleft);
                        setCategory(true);
                      }}
                    >
                      <img src={Add} width="13" height="13" className="mr-2" />
                      <span>Add New Type</span>
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
                      <b>Warehouse Type</b>
                    </p>

                    <div style={{ position: "relative", left: "70%" }}>
                      <button
                        className="btn btn-yellow ml-5"
                        onClick={() => {
                          let newArr = { name: "" };
                          setAddProducts1((prod) => [...prod, newArr]);
                          setShowLeft(!showleft);
                          // console.log(showleft,"------------------");
                        }}
                      >
                        <img src={Add} width="13" height="13" className="mr-2" />
                        <span>Add New Type</span>
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
                      Overview
                      <img
                        src={Arrow}
                        alt="icon"
                        width="7px"
                        height="12px"
                        className="ml-4"
                      />
                    </li>
                    <li className="p-2">
                      Shipment
                      <img
                        src={Arrow}
                        alt="icon"
                        width="7px"
                        height="12px"
                        className="ml-4"
                      />
                    </li>
                    <li className="p-2">
                      Inventory
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
                    <th scope="col">Sent</th>
                    <th scope="col">Received</th>
                    <th scope="col">InTransit</th>
                    <th scope="col">Expiring</th>
                    <th scope="col">Expired</th>
                    <th scope="col">Delay</th>
                    <th scope="col">Added</th>
                  </tr>
                </thead>
                <tbody className="borderless">
                  <tr>
                    <th scope="row">Total Products</th>
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
                    <th scope="row">Total Products Expiring this week</th>
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
                    <th scope="row">Total Products Expiring this month</th>
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
                    <th scope="row">Total Products Expiring this year</th>
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
                    <th scope="row">Total Products Expired this week</th>
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
                    <th scope="row">Total Products Expired this month</th>
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
                    <th scope="row">Total Products Expired this year</th>
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
                    <th scope="row">Total Shipments</th>
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
                    <th scope="row">Total Product in inventory</th>
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

