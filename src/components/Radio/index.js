import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButton(props) {

  const label = props.label
  const value = props.value
  const variable = props.variable
  const func = props.func

  const handleChange = (event) => {
    func(event.target.value)
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={variable} onChange={handleChange}>
        <FormControlLabel value={value} control={<Radio />} label={label} />
      </RadioGroup>
    </FormControl>
  );
}
