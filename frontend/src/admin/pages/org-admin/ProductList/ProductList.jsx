import { TextField } from "@mui/material";
import React from "react";
import AnalyticsCard from "../../../common/AnalyticsCard/AnalyticsCard";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import "./ProductList.css";
import ProductTable from "./ProductTable/ProductTable";

export default function AdminProductList() {
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
                value="436"
                valueTitle="Total Number of Organization"
                bgColor="analytic-bg-1"
                textColor="analytic-text-1"
              />
              <AnalyticsCard
                layout="type4"
                icon="fa-building"
                value="316"
                valueTitle="Active Organization"
                bgColor="analytic-bg-2"
                textColor="analytic-text-2"
              />
              <AnalyticsCard
                layout="type4"
                icon="fa-building"
                value="120"
                valueTitle="In Active Organization"
                bgColor="analytic-bg-3"
                textColor="analytic-text-3"
              />
            </div>
            <div className="product-list-two-column">
              <ProductTable />
              <div className="add-product-container">
                <div className="add-product-card">
                  <button className="vl-btn vl-btn-md vl-btn-full vl-btn-secondary">
                    <span>
                      <i className="fa-solid fa-plus"></i>
                    </span>
                    Import Product
                  </button>
                  <div className="divider-space">
                    <div className="dotted-line"></div>
                    <p className="vl-body f-700 vl-grey-sm">OR</p>
                    <div className="dotted-line"></div>
                  </div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Category"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Name"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Manufacturer"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Unit of Measure"
                  />
                  <button className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
