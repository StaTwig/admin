import React, { useState, useEffect } from "react";
import EditTable from "../../shared/table/editTable";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Modal from "../../shared/modal";
import InventoryPopUp from "./inventorypopup";
import ExcelPopUp from "./excelpopup";
import FailurePopUp from "./failurepopup";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import review from "../../assets/icons/review.png";
import ShipmentFailPopUp from "../neworder/shipmentFailPopUp";
import {
  setReviewinventories,
  resetReviewInventories,
} from "../../actions/inventoryActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { getProducts } from "../../actions/poActions";
import { isAuthenticated } from "../../utils/commonHelper";

const NewInventory = (props) => {
  const { t } = props;
  const editInventories = useSelector((state) => {
    return state.reviewInventory;
  });
  const [category, setCategory] = useState([]);
  if (!isAuthenticated("addInventory")) props.history.push(`/profile`);
  useEffect(() => {
    async function fetchData() {
      dispatch(turnOn());
      const result = await getProducts();
      const productsArray = result.map((product) => product.name);
      setProducts(
        result
          .filter((item) => item.name !== "category")
          .map((item) => {
            return {
              value: item.name,
              label: item.name,
              ...item,
            };
          })
      );
      const categoryArray = result.map((product) => product.type);
      setCategory(
        categoryArray
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((item) => {
            return {
              value: item,
              label: item,
            };
          })
      );
      setBlankInventory({ ...blankInventory, products: productsArray });
      if (editInventories.length === 0) {
        setInventoryState([{ ...blankInventory, products: productsArray }]);
      } else {
        setInventoryState(editInventories);
      }
      dispatch(turnOff());
    }
    fetchData();
    dispatch(resetReviewInventories([]));
  }, []);

  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openFailInventory, setOpenFailInventory] = useState(false);
  const [openQuantityFailInventory, setOpenQuantityFailInventory] =
    useState(false);
  const [inventoryError, setInventoryError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openExcel, setOpenExcel] = useState(false);
  const [products, setProducts] = useState([]);
  const [inventoryState, setInventoryState] = useState([]);
  const [menu, setMenu] = useState(false);
  const [blankInventory, setBlankInventory] = useState({
    productName: "Select Product",
    categories: "Select Category",
    manufacturer: "",
    productId: "",
    quantity: "",
    manufacturingDate: "",
    expiryDate: "",
    batchNumber: "",
    serialNumber: "",
    unitofMeasure: "",
    products: [],
  });

  const inventoryFields = [
    "categories",
    "productName",
    "manufacturer",
    "batchNumber",
    "quantity",
    "unitofMeasure",
  ];

  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenCreatedInventory(false);
  };
  const closeExcelModal = () => {
    setOpenExcel(false);
  };

  const closeModalFail = () => {
    setOpenFailInventory(false);
  };
  const closeModalFail1 = () => {
    setOpenQuantityFailInventory(false);
  };

  const month = new Date().getMonth() + 1;
  const newMonth = `0${month}`.slice(-2);
  const todayDate = newMonth + "/" + new Date().getFullYear();
  const dateValidationFields = ["expiryDate"];
  const expiryDateValidation = (date) => {
    let error = false;
    inventoryState.forEach((inventory) => {
      if (error) return;
      let validationVariable = inventory.expiryDate;
      let a = new Date(
        Date.parse(
          typeof validationVariable == "string"
            ? validationVariable
            : validationVariable.toLocaleDateString()
        )
      ).getFullYear();
      let b = todayDate.slice(-4);
      let c = `0${new Date(validationVariable).getMonth() + 1}`.slice(-2);
      let d = todayDate.substring(0, 2);
      a = a.toString();
      console.log(validationVariable);
      console.log(a, b, c, d);
      if (a < b || (a === b && c <= d)) {
        setInventoryError("Check expiryDate");
        setOpenFailInventory(true);
        error = true;
      }
    });

    return error;
  };

  const checkValidationErrors = (validations) => {
    let error = false;
    inventoryState.forEach((inventory) => {
      if (error) return error;
      for (let i = 0; i < validations.length; i++) {
        let validationVariable = inventory[validations[i]];

        if (
          validationVariable.length < 1 ||
          validationVariable === "Select Product" ||
          validationVariable === "Select Category"
        ) {
          setInventoryError(validations[i]);
          setOpenFailInventory(true);
          error = true;
          break;
        }
      }
      if (parseInt(inventory.quantity, 10) < 1) {
        setInventoryError("Check Quantity ");
        setOpenQuantityFailInventory(true);
        error = true;
      }
    });
    return error;
  };

  const importError = (message) => {
    setInventoryError(message);
    setOpenFailInventory(true);
  };

  const onProceedToReview = () => {
    if (checkValidationErrors(inventoryFields)) {
      return;
    } else if (expiryDateValidation(dateValidationFields)) {
      return;
    }

    dispatch(setReviewinventories(inventoryState));
    props.history.push("/reviewinventory");
  };

  const handleInventoryChange = (index, key, value) => {
    const updatedInventoryState = JSON.parse(JSON.stringify(inventoryState));
    updatedInventoryState[index][key] = value;
    const product = products.find(
      (p) => p.name === updatedInventoryState[index]["productName"]
    );
    updatedInventoryState[index]["manufacturer"] = product?.manufacturer;
    updatedInventoryState[index]["productId"] = product?.id;
    updatedInventoryState[index]["unitofMeasure"] = product?.unitofMeasure;

    if (key === "categories") {
      updatedInventoryState[index]["productName"] = "";
      updatedInventoryState[index]["manufacturer"] = "";
      updatedInventoryState[index]["productId"] = "";
      updatedInventoryState[index]["quantity"] = "";
      updatedInventoryState[index]["unitofMeasure"] = "";
    }
    let total = 0;
    updatedInventoryState.forEach((inv) => (total += parseInt(inv.quantity)));
    setInventoryState(updatedInventoryState);
  };

  const handleAddMore = (index) => {
    const updatedInventoryState = JSON.parse(JSON.stringify(inventoryState));
    updatedInventoryState[index]["serialNumber"] = "";
    updatedInventoryState[index]["batchNumber"] = "";
    updatedInventoryState[index]["manufacturingDate"] = "";
    updatedInventoryState[index]["expiryDate"] = "";
    setInventoryState(updatedInventoryState);
  };

  const onCategoryChange = async (index, value) => {
    try {
      handleInventoryChange(index, "categories", value);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const onRemoveRow = (index) => {
    const inventoryStateClone = JSON.parse(JSON.stringify(inventoryState));
    inventoryStateClone.splice(index, 1);
    setInventoryState(inventoryStateClone);
    let total = 0;
    inventoryStateClone.forEach((inv) => (total += parseInt(inv.quantity)));
  };

  const onAddAnotherProduct = () => {
    setInventoryState([...inventoryState, blankInventory]);
  };

  return (
    <div className="Newinventory">
      <div className="d-flex justify-content-between mb-0">
        <h1 className="vl-heading-bdr mt-3 mb-2">{t("add_inventory")}</h1>
        <div className="d-flex flex-column align-items-center">
          {isAuthenticated("importInventory") && (
            <button
              className="mi-btn mi-btn-md mi-btn-primary mt-4"
              onClick={() => setMenu(!menu)}
              style={{ position: "relative", left: "20px" }}
            >
              <div className="d-flex  align-items-center">
                <img
                  src={ExportIcon}
                  width="16"
                  height="16"
                  className="mr-3"
                  alt="Export"
                />
                <span>
                  <b>{t("import")}</b>
                </span>
                <img
                  src={dropdownIcon}
                  width="16"
                  height="16"
                  className="ml-3"
                  alt=""
                />
              </div>
            </button>
          )}
          {menu ? (
            <div className="menu">
              <button
                className=" btn btn-outline-info mb-2 "
                onClick={() => setOpenExcel(true)}
              >
                {" "}
                {t("excel")}
              </button>
              <button className=" btn btn-outline-info"> {t("other")}</button>
            </div>
          ) : null}
          {openExcel && (
            <Modal
              title={t("import")}
              close={() => closeExcelModal()}
              size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
            >
              <ExcelPopUp
                {...props}
                onHide={closeExcelModal} //FailurePopUp
                importError={importError}
                setOpenCreatedInventory={setOpenCreatedInventory}
                setOpenExcel={setOpenExcel}
                setInventoryError={setInventoryError}
                setOpenFailInventory={setOpenFailInventory}
              />
            </Modal>
          )}
        </div>
      </div>
      <EditTable
        inventories={inventoryState}
        handleInventoryChange={handleInventoryChange}
        handleAddMore={handleAddMore}
        onRemoveRow={onRemoveRow}
        category={category}
        handleCategoryChange={onCategoryChange}
        prods={products}
        t={t}
        setOpenFailInventory={setOpenFailInventory}
        setInventoryError={setInventoryError}
      />

      <div className="d-flex justify-content-between">
        <button
          className="mi-btn mi-btn-light mi-btn-md shadow-radius mt-0 font-bold ml-3"
          onClick={onAddAnotherProduct}
        >
          <div style={{ fontSize: "14px" }}>
            +
            <span>
              <b>{t("add_another_product")}</b>
            </span>
          </div>
        </button>
      </div>
      <hr />

      <div className="d-flex flex-row-reverse">
        {/* <div className="total">Grand Total</div>
      <span className="value">{grandTotal}</span> */}
        <button className="btn-orange btn" onClick={onProceedToReview}>
          <img src={review} width="20" className="" alt="" />
          <span className="ml-1">
            <b>{t("review_product")}</b>
          </span>
        </button>
        <button
          type="button"
          className="mi-btn mi-btn-md mi-btn-blue mr-3"
          onClick={() => {
            dispatch(resetReviewInventories([]));
            props.history.push("/inventory");
          }}
        >
          <b>{t("cancel")}</b>
        </button>
      </div>
      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <InventoryPopUp
            t={t}
            onHide={closeModal} //FailurePopUp
          />
        </Modal>
      )}

      {openFailInventory && (
        <Modal
          close={() => closeModalFail()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <FailurePopUp
            t={t}
            onHide={closeModalFail} //FailurePopUp
            inventoryError={inventoryError}
          />
        </Modal>
      )}
      {openQuantityFailInventory && (
        <Modal
          close={() => closeModalFail1()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentFailPopUp
            t={t}
            onHide={closeModalFail1} //FailurePopUp
            shipmentError={inventoryError}
          />
        </Modal>
      )}
    </div>
  );
};

export default NewInventory;
