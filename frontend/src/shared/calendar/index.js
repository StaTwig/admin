import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './style.scss';

const Calendar = (props) => {
    const { filterTableByCalendar } = props;

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        if(state[0] && state[0].endDate !== null) {
            setTimeout(() => {
                filterTableByCalendar(state[0]);
            }, 1000);
        }
    }, [state]);

    return (
        <DateRange
            onChange={item => setState([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={state}
        />
    )
};

export default Calendar;