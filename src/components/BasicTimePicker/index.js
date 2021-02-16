import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function BasicTimePicker(props) {

  const label = props.label || ''
  const value = props.value 
  const handleChange = props.handleChange

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          clearable
          ampm={false}
          label={label}
          value={value}
          onChange={handleChange}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default BasicTimePicker;
