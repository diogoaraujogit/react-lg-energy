import React, { Fragment } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function BasicDatePicker(props) {

  const value = props.value 
  const handleChange = props.handleChange
  const format = props.format || "dd/MM/yyyy"
  const views = props.views || ["year", "month", "date"]

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableFuture
          openTo="date"
          format={format}
          views={views}
          value={value}
          onChange={handleChange}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default BasicDatePicker;
