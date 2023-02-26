import React from "react";
import { Box, Typography } from "@mui/material";
import { DateTimePicker } from "react-advance-jalaali-datepicker";
import moment from "jalali-moment";

const DatePicker = ({ setDateTime, dateTime }) => {
  const change = (unix, formatted) => {
    console.log(unix); // returns timestamp of the selected value, for example.
    console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
  };
  console.log(dateTime);
  const DatePickerInput = (props) => {
    setDateTime(props.value);
    return (
      <Box sx={{ mt: 2 }}>
        <button className="popo" {...props}>
          <Typography
            sx={{ cursor: "pointer", fontSize: "1rem", fontWeight: "bold" }}
          >
            انتخاب تاریخ
          </Typography>
        </button>
        <Typography>
          {props.value
            ? moment(props.value)
                .locale("fa")
                .format("YYYY/MM/DD_HH:mm")
                .toPersianDigits()
            : dateTime &&
              moment(dateTime)
                .locale("fa")
                .format("YYYY/MM/DD_HH:mm")
                .toPersianDigits()}
        </Typography>
      </Box>
    );
  };

  return (
    <div className="datePicker">
      <DateTimePicker
        inputComponent={DatePickerInput}
        placeholder="انتخاب تاریخ و ساعت"
        format="YYYY-MM-DDTHH:mm:ss"
        id="dateTimePicker"
        onChange={change}
      />
    </div>
  );
};

export default DatePicker;
