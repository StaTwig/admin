import React from 'react';
import { Calendar } from "react-multi-date-picker";

function CustomRangeInput({openCalendar, value}) {
    let from = value[0] || ""
    let to = value[1] || ""
    
    value = from && to ? "from " + from + ", to " + to : from
    console.log(value);
    return (
      <input
        onFocus={openCalendar}
        value={value}
        readOnly
      />
    )
  }

export default function DateFilter({ t }) {

    const [fweek, setFweek] = React.useState([new Date(), new Date()]);
    console.log(fweek)

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
        <div className="valueDisplay">
            <div className="groupFlex fromData">
                <label htmlFor="from">{t("from")}</label>
                <input type="text" placeholder='DD/MM/YYYY' />
            </div>
            {DateType === 2 && (<div className="groupFlex toData">
            <label htmlFor="to">{t("to")}</label>
                <input type="text" placeholder='DD/MM/YYYY' />
            </div>)}
        </div>
      <Calendar
      value={fweek}
          range={DateType === 2 ? true : false }
          onChange={(e) =>setFweek(e.target.value)}
        />
        </>
    )
}
