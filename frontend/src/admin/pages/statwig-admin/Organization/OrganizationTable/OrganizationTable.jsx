import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import OrganizationRow from "./OrganizationRow";
import { TablePagination } from "@mui/material";
import { getOrgs, updateOrg } from "../../../../actions/organisationActions";
import { useDispatch, useSelector } from "react-redux";

export default function OrganizationTable() {

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {dispatch(getOrgs(`skip=${page * 10}&limit=${rowsPerPage}`))}, [dispatch, page, rowsPerPage]);
  const { list }= useSelector((state) => state.organisationReducer);
  const modifyOrg = async (data) => {
    const result = await updateOrg(data.org ? data.org : data);
    if (result.status === 200) {
      console.log("This organisation " + data.org ? data.status : data.status.toLowerCase() + "!");
    } else {
      console.log(result.data.data.message);
    }
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 992 }}
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
              <h1 className="vl-note f-500 vl-blue">Organization Name</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Organization Type</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Total Users</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">All Locations</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Country</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Status</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Created On</h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="organization-tbody">
          {list.map((rows, index) => (
            <OrganizationRow modifyOrg={modifyOrg} key={rows.id} rows={rows} index={index} />
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
