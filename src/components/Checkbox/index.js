import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels(props) {

  const value = props.value
  const variable = props.variable
  const func = props.func
  const multiple = props.multiple
  const label = props.label
  const notRemove = props.notRemove
  const disabled = props.disabled

  const handleChange = (event) => {
    if (multiple) {
      if (variable.filter(elem => elem.id === value).length) {
        
          const newArray = variable.filter(vari => vari.id !== value)
          func(newArray)
        

      } else {
        const newArray = variable.concat({ id: value, name: label })
        func(newArray)
      }
    } else {
      func(value)
    }
  };

  return (
    <FormControlLabel
      disabled={disabled}
      control={
        <Checkbox
          checked={multiple ? variable.filter(elem => elem.id === value).length : variable === value}
          onChange={handleChange}
          
        />
      }
      label={label}
    />

  );
}
