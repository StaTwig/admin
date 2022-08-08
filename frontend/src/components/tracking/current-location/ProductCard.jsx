import React, { useState } from "react";
import Chart from "react-apexcharts";

const ProductCard = () => {
  const [radialBarOptions, setRadialBarOptions] = useState({
    options: {
      stroke: {
        lineCap: "round",
      },
      colors: ["#FF872B"],
      plotOptions: {
        radialBar: {
          size: 50,
          inverseOrder: false,
          startAngle: -180,
          endAngle: 180,
          offsetX: 0,
          offsetY: 0,

          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: "#eee",
            strokeWidth: "60%",
            opacity: 1,
            margin: 5,

            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          dataLabels: {
            show: true,
            name: {
              show: false,
              fontSize: "10px",
              fontFamily: undefined,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "12px",
              fontFamily: undefined,
              color: undefined,
              offsetY: 5,
              formatter: function (val) {
                return val + " (PAC)";
              },
            },
          },
        },
      },
    },

    series: [50],
    fill: {
      colors: "#eeeeee",
      opacity: 0.9,
      type: "solid",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: "#eeeeee",
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
  });

  return (
    <>
      <div className="product-card-location">
        <ul className="product-details-list">
          <li className="product-list-card">
            <div className="mi-flex-ac gap-1">
              <p className="mi-body-sm f-500 mi-reset grey">Paracetomal</p>
            </div>
            <p className="mi-body-sm f-500 mi-reset color-blue">Biopolio</p>
          </li>
          <li className="product-list-card">
            <div className="mi-flex-ac gap-1">
              <p className="mi-body-sm f-500 mi-reset grey">Manufacturer</p>
            </div>
            <p className="mi-body-sm f-500 mi-reset color-blue">
              Bharath Biotech
            </p>
          </li>
          <li className="product-list-card">
            <div className="mi-flex-ac gap-1">
              <p className="mi-body-sm f-500 mi-reset grey">Batch</p>
            </div>
            <p className="mi-body-sm f-500 mi-reset color-blue">BJS2456</p>
          </li>
          <li className="product-list-card">
            <div className="mi-flex-ac gap-1">
              <p className="mi-body-sm f-500 mi-reset grey">Label</p>
            </div>
            <p className="mi-body-sm f-500 mi-reset color-blue">LB124</p>
          </li>
        </ul>
        <div className="product-quantity-details">
          <div>
            <Chart
              options={radialBarOptions.options}
              series={radialBarOptions.series}
              type="radialBar"
              width="160"
            />
            <div className="mi-flex-jc mi-input-xs">Quantity Sent</div>
          </div>
          <div>
            <Chart
              options={radialBarOptions.options}
              series={radialBarOptions.series}
              type="radialBar"
              width="160"
            />
            <div className="mi-flex-jc mi-input-xs">Quantity Received</div>
          </div>
        </div>
        <div className="product-date-details">
          <div className="date-container">
            <div className="date-header mi-flex-ac gap-1">
              <i className="fa-solid fa-calendar-days calender-icon white"></i>
              <p className="mi-body-xs f-500 mi-reset white ">Mfg Date</p>
            </div>
            <p className="mi-body-xs f-500 mi-reset white">12/08/2018</p>
          </div>
          <div className="date-container">
            <div className="date-header mi-flex-ac gap-1">
              <i className="fa-solid fa-calendar-days calender-icon white"></i>
              <p className="mi-body-xs f-500 mi-reset white ">Exp Date</p>
            </div>
            <p className="mi-body-xs f-500 mi-reset white">12/08/2018</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
