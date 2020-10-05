import React, { Fragment } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function BasicDatePicker(props) {

  const value = props.value 
  const handleChange = props.handleChange

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableFuture
          openTo="date"
          format="dd/MM/yyyy"
          views={["year", "month", "date"]}
          value={value}
          onChange={handleChange}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default BasicDatePicker;
