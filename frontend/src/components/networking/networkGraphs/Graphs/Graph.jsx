import React from "react";
import { AreaChart, ColumnChart } from "react-chartkick";
import "chartkick/chart.js";

export default function Graph({ graph }) {
  return (
    <>
      {graph === "bigbar" && (
        <ColumnChart
          data={[
            ["01", 4000],
            ["02", 6000],
            ["03", 3000],
            ["04", 6000],
            ["05", 4000],
            ["06", 5000],
            ["07", 3500],
          ]}
          xtitle="Days"
          ytitle="Quantity"
          dataset={{ borderRadius: 20, borderWidth: 0 }}
          colors={["#FB7185", "#2DD4BF", "#818CF8"]}
          ymin="0"
          ymax="1000"
        />
      )}
      {graph === "bar" && (
        <ColumnChart
          data={[
            ["01", 1000],
            ["02", 6000],
            ["03", 500],
            ["04", 10000],
            ["05", 4000],
            ["06", 2000],
            ["07", 3500],
            ["08", 7000],
            ["09", 9000],
            ["10", 3000],
            ["11", 1000],
            ["12", 6000],
            ["13", 500],
            ["14", 10000],
            ["15", 4000],
            ["16", 2000],
            ["17", 3500],
            ["18", 7000],
            ["19", 9000],
            ["20", 10000],
            ["21", 1000],
            ["22", 6000],
            ["23", 500],
            ["24", 10000],
            ["25", 4000],
            ["26", 2000],
            ["27", 3500],
            ["28", 7000],
            ["29", 9000],
            ["30", 10000],
          ]}
          xtitle="Days"
          ytitle="Quantity"
          dataset={{ borderRadius: 5, borderWidth: 0 }}
          colors={["#FB7185", "#2DD4BF"]}
        />
      )}

      {graph === "area" && (
        <AreaChart
          data={{
            1: 0,
            2: 2000,
            3: 6000,
            4: 1000,
            5: 9000,
            6: 0,
            7: 4000,
            8: 2000,
            9: 8000,
            10: 3000,
            11: 4000,
            12: 9000,
            13: 4000,
            14: 9000,
            15: 2000,
            16: 5000,
            17: 4000,
            18: 1000,
            19: 2000,
            20: 5000,
            21: 4000,
            22: 9000,
            23: 4000,
            24: 9000,
            25: 2000,
            26: 5000,
            27: 4000,
            28: 9000,
            29: 2000,
            30: 5000,
          }}
          min={0}
          max={10000}
          xtitle="Days"
          ytitle="Quantity"
          colors={["#2DD4BF"]}
        />
      )}
    </>
  );
}
