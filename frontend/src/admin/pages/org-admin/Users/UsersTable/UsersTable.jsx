import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import UsersRow from "./UsersRow";
import {getOrgUsers} from "../../../../actions/organisationActions"
import { useDispatch, useSelector } from "react-redux";
export default function UsersTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrgUsers());
  }, [dispatch]);
  const { users } = useSelector((state) => state.organisationReducer);

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            <TableCell>
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
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">User Name</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Role</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Email ID</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Phone Number</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-blue">Location</h1>
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
          {users.map((rows, index) => (
            <UsersRow key={rows.id} rows={rows} index={index} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
