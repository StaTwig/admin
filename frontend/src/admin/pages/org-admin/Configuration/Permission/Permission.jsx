import React, { useState } from "react";
import "./Permission.css";
import Roles from "./Roles";

export default function Permission({permissions, updatePermissions}) {
  const [flag, setFlag] = useState(false);
  console.log(permissions)
  const List = permissions ? Object.keys(permissions) : []
  return (
    <section className="permission-container">
      <p className="vl-body f-500 vl-black">Permission Details</p>
      {List.map(
        (list) =>
          Boolean(permissions) && list !== "_id" &&
          list !== "role" && list !== "permissions" &&
          permissions[`${list.toLowerCase()}`] && (
            <Roles
              updatePermissions={updatePermissions}
              flag={flag}
              refresh={(f) => setFlag(f)}
              list={list}
              permissions={
                permissions ? permissions[`${list.toLowerCase()}`] : null
              }
            />
          )
      )}
    </section>
  );
}
