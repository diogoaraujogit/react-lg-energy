import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function BasicTimePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const label = props.label || ''

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          clearable
          ampm={false}
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default BasicTimePicker;
