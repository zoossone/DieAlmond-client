import React, { useState } from 'react';
import styled from 'styled-components';

// Date
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko'; 
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";

const Div = styled.div`
    margin: 1rem;
`

const Calendar = ({setBirth}) => {
    const [startDate, setStartDate] = useState(new Date());
    const years = [] 
    for (let year = new Date().getFullYear(); year >= 1900; year--) {
        years.push(String(year));        
    }
    const months = [];
    for (let month = 1; month <= 12; month++) {
        months.push(String(month));        
    }
    
    registerLocale("ko", ko);
    
    return (
        <Div>
            <DatePicker
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                    >
                    <div onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"⬅️"}
                    </div>
                    <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    <span>년</span>

                    <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    <span>월</span>

                    <div onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {"➡️"}
                    </div>
                    </div>
                )}
                selected={startDate}
                onChange={(date) => {
                    setStartDate(date)
                    setBirth(date)
                }}
                dateFormat="yyyy.MM.dd"
                placeholderText="ex) 1999.09.09"
                />
        </Div>
    );
};

export default Calendar;