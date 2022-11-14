import React from "react";
import { Calendar } from "react-multi-date-picker";

export default function DateFilter({ t, onSelectionDateFilter }) {
  const [fweek, setFweek] = React.useState([new Date(), new Date()]);
  const [DateType, setDateType] = React.useState(2);
  return (
    <>
      {/* <div className="calenderHeader">
                <div className="tabs-cal tab1" onClick={() => setDateType(1)}>
                    <h1 className={`tab-text ${DateType === 1 && "tab-text-active"}`}>Single</h1>
                </div>
                <div className="tabs-cal tab2" onClick={() => setDateType(2)}>
                    <h1 className={`tab-text ${DateType === 2 && "tab-text-active"}`}>Range</h1>
                </div>
            </div> */}
      <div className='valueDisplay'>
        <div className='groupFlex fromData'>
          <label htmlFor='from'>{t("from")}</label>
          <input
            readOnly
            type='text'
            value={fweek[0] ? new Date(fweek[0]) : ""}
            placeholder='DD/MM/YYYY'
          />
        </div>
        {DateType === 2 && (
          <div className='groupFlex toData'>
            <label htmlFor='to'>{t("to")}</label>
            <input
              readOnly
              type='text'
              value={fweek[1] ? new Date(fweek[1]) : ""}
              placeholder='DD/MM/YYYY'
            />
          </div>
        )}
      </div>
      <Calendar
        value={fweek}
        range={DateType === 2 ? true : false}
        onChange={(e) => {
          setFweek(e);
          onSelectionDateFilter(e);
        }}
      />
      <div className='valueDisplay'>
        <button
          style={{
            padding: "10px",
            height: "40px",
            width: "100%",
          }}
          className='btn btn-link btn-sm font-weight-bold'
          variant='outlined'
          color='primary'
          onClick={() => {
            setFweek(new Array("", ""));
            onSelectionDateFilter(new Array("", ""));
          }}
        >
          {t("clear")}
        </button>
      </div>
    </>
  );
}
