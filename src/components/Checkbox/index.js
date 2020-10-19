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
      if(variable.includes(value)) {
        const newArray = variable.filter(vari => vari !== value)
        func(newArray)
      } else {
        const newArray = variable.concat(value)
        func(newArray)
      }
    } else {
      func(value)
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={multiple? variable.includes(value) :  variable === value}
          onChange={handleChange}
        />
      }
      label={label}
    />

  );
}
