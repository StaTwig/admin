import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import ProductRow from "./ProductRow";
import { getProducts } from "../../../../../actions/poActions";
import { useSelector } from "react-redux";
export default function ProductTable(props) {
  const { user } = useSelector((state) => state);
  const { t } = props;
  console.log(user.organisationId);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts(
        `orgId=${
          ""
          // ||user.organisationId
        }&skip=${page * 10}&limit=${rowsPerPage}`
      );
      setProducts(products);
    }
    fetchProducts();
  }, [page, rowsPerPage, user.organisationId, props.productAdded]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer
      sx={{ background: "#fff", padding: "0.6rem", borderRadius: "0.6rem" }}
    >
      <div className="organization-table-header-area">
        <div className="table-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="table-actions-area table-action-space">
          <div className="table-action-icon">
            <i className={`fa-solid fa-power-off vl-disabled`}></i>
          </div>
          <div className="table-action-icon">
            <i className={`fa-solid fa-trash-can vl-disabled`}></i>
          </div>
        </div>
      </div>
      <Table
        sx={{ minWidth: 665 }}
        aria-label="simple table"
        className="organization-table"
      >
        <TableHead className="organization-thead">
          <TableRow className="organization-tr">
            {/* <TableCell>
              <Checkbox
                className="vl-checkbox"
                name="allCheck"
                sx={{
                  color: "#7e858f",
                  "&.Mui-checked": {
                    color: "#221ecc",
                  },
                }}
              />
            </TableCell> */}
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">{t("product_category")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">{t("product_name")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">{t("manufacturer")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">{t("unit_of_measure")}</h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="organization-tbody">
          {products.map((rows, index) => (
            <ProductRow key={rows.id} rows={rows} index={index} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={1000}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
