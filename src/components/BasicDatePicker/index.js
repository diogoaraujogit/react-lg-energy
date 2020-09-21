import React, { Fragment, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());


  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableFuture
          openTo="year"
          format="dd/MM/yyyy"
          views={["year", "month", "date"]}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default BasicDatePicker;
