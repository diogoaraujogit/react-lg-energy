import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ThemeProvider } from '@material-ui/core/styles';
// Media Query

export default function SwitchLabels(props) {


    const [disabled, setDisabled] = useState(props.disabled || false)
    const size = props.size || 'medium'

    const label = props.label
    const variable = props.variable
    const [checked, setChecked] = useState(variable)
    const func = props.func

    return (
        <ThemeProvider >
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={(e) => {
                                func && func(checked, setChecked, setDisabled)
                            }}
                            value={checked}
                            disabled={disabled}
                            color="primary"
                            size={size}
                        />
                    }
                    label={label}
                />

            </FormGroup>
        </ThemeProvider>
    );
}
