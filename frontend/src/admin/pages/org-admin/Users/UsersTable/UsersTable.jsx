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
import { getOrgUsers } from "../../../../actions/organisationActions";
import { useDispatch, useSelector } from "react-redux";

export default function UsersTable(props) {
  const dispatch = useDispatch();
  const { defaultRoles, t } = props;

  // useEffect(() => {
  //   dispatch(getOrgUsers());
  // }, [dispatch]);
  const { users } = useSelector((state) => state.organisationReducer);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    dispatch(getOrgUsers(`skip=${page * 10}&limit=${rowsPerPage}`));
  }, [dispatch, page, rowsPerPage, props.tableFlag]);
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
              <h1 className="vl-note f-500 vl-royal">{t("user_name")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-royal">{t("role")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-royal">{t("email")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-royal">{t("phone_no")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-royal">{t("location")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-royal">{t("status")}</h1>
            </TableCell>
            <TableCell>
              <h1 className="vl-note f-500 vl-royal">{t("created_on")}</h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="organization-tbody">
          {users.map((rows, index) => (
            <UsersRow
              t={t}
              key={rows.id}
              rows={rows}
              index={index}
              defaultRoles={defaultRoles}
            />
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
