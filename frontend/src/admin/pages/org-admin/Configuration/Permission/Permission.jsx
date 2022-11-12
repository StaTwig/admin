import React from "react";
import "./Permission.css";
import Roles from "./Roles";

export default function Permission() {
  const List = [
    {
      id: "1",
      title: "Overview",
    },
    {
      id: "2",
      title: "Search",
    },
    {
      id: "3",
      title: "Inventory",
    },
    {
      id: "4",
      title: "Orders",
    },
    {
      id: "5",
      title: "Shipments",
    },
    {
      id: "6",
      title: "Network",
    },
    {
      id: "7",
      title: "Track & Trace",
    },
  ];
  return (
    <section className="permission-container">
      <p className="vl-body f-500 vl-black">Permission Details</p>
      {List.map((list) => (
        <Roles list={list} />
      ))}
    </section>
  );
}
