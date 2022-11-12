import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import { useState } from "react";

export default function ProductRow() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        className={`organization-tr ${checked && "organization-bar-added"}`}
      >
        <TableCell>
          <Checkbox
            className="vl-checkbox"
            value={checked}
            onChange={() => setChecked(!checked)}
            sx={{
              color: "#7e858f",
              "&.Mui-checked": {
                color: "#221ecc",
              },
            }}
          />
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            Vaccine
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            Covishield
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            Bharath Biotech
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`vl-body ${
              checked ? "f-500 vl-black" : "f-500 vl-grey-sm"
            }`}
          >
            Mg
          </p>
        </TableCell>
      </TableRow>
    </>
  );
}
