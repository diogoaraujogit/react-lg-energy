import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels(props) {

  const value = props.value
  const variable = props.variable
  const func = props.func
  const multiple = props.multiple
  const label = props.label

  const handleChange = (event) => {
    if(multiple) {

    } else {
      func(value)
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={variable === value}
          onChange={handleChange}
        />
      }
      label={label}
    />

  );
}
