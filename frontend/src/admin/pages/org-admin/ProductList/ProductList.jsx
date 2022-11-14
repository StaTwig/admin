import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AnalyticsCard from "../../../common/AnalyticsCard/AnalyticsCard";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import "./ProductList.css";
import ProductTable from "./ProductTable/ProductTable";
import Modal from "../../../../shared/modal";
import SuccessPopup from "../../../shared/Popup/SuccessPopup";

import { useSelector, useDispatch } from "react-redux";
import { getOrgAnalytics } from "../../../actions/organisationActions";
import { addNewProduct } from "../../../../actions/poActions";
export default function AdminProductList() {
  const [productName, setProductName] = useState();
  const [productCategory, setProductCategory] = useState();
  const [UOM, setUOM] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [openSuccessPopup, setOpenSuccessPopup] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrgAnalytics());
  }, [dispatch]);
  const { orgAnalytics } = useSelector((state) => state.organisationReducer);
  const { totalCount, activeCount, inactiveCount } = orgAnalytics;
  async function addProduct() {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("shortName", productName);
    formData.append("type", productCategory);
    formData.append("externalId", Math.random().toString(36).substr(2, 7));
    formData.append(
      "unitofMeasure",
      JSON.stringify({
        id: UOM,
        name: UOM,
      })
    );
    formData.append("manufacturer", manufacturer);
    const res = await addNewProduct(formData);
    console.log(res);
    setOpenSuccessPopup(true);
  }

  const closeModal = () => {
    setOpenSuccessPopup(false);
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
                valueTitle="Total Number of Organization"
                bgColor="analytic-bg-1"
                textColor="analytic-text-1"
              />
              <AnalyticsCard
                layout="type4"
                icon="fa-building"
                value={activeCount}
                valueTitle="Active Organization"
                bgColor="analytic-bg-2"
                textColor="analytic-text-2"
              />
              <AnalyticsCard
                layout="type4"
                icon="fa-building"
                value={inactiveCount}
                valueTitle="In Active Organization"
                bgColor="analytic-bg-3"
                textColor="analytic-text-3"
              />
            </div>
            <div className="product-list-two-column">
              <ProductTable />
              <div className="add-product-container">
                <div className="add-product-card">
                  {/* <button className="vl-btn vl-btn-md vl-btn-full vl-btn-secondary">
                    <span>
                      <i className="fa-solid fa-plus"></i>
                    </span>
                    Import Product
                  </button>
                  <div className="divider-space">
                    <div className="dotted-line"></div>
                    <p className="vl-body f-700 vl-grey-sm">OR</p>
                    <div className="dotted-line"></div>
                  </div> */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Category"
                    onChange={(e) => setProductCategory(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Name"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Manufacturer"
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Unit of Measure"
                    onChange={(e) => setUOM(e.target.value)}
                  />
                  <button
                    onClick={() => addProduct()}
                    className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {openSuccessPopup && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModal}
            successMessage="Add the Success Message Here"
            // errorMessage="Put the Error Message Here"
          />
        </Modal>
      )}
    </>
  );
}
