import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function BasicTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          clearable
          ampm={false}
          label="24 hours"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default BasicTimePicker;
