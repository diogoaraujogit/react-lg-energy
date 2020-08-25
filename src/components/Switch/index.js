import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
// Media Query
import { useMediaPredicate } from "react-media-hook";

export default function SwitchLabels(props) {

    // Media query
    const smallerThan1650 = useMediaPredicate("(max-width: 1650px)");
    const smallerThan1045 = useMediaPredicate("(max-width: 1045px)");
    const smallerThan768 = useMediaPredicate("(max-width: 768px)");
    const smallerThan480 = useMediaPredicate("(max-width: 480px)");


    const font480 = props.font480
    const fontSize = smallerThan480? font480 || '1.8rem' : props.fontSize || '1.8rem'
    const disabled = props.disabled || false

    const label = props.label
    const variable = props.variable
    const [checked, setChecked] = useState(variable)
    const func = props.func


    const theme =  createMuiTheme({
        overrides: {
            MuiFormControlLabel: {
                label: {
                    fontFamily: [
                        'Roboto',
                        'sans-serif',
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                    ].join(','),
                }
            },
            MuiSwitch: {
                root: {
                    //padding: '0rem'
                },

                colorPrimary: {
                    color: '#C1C1C1',
                    "&$checked": {
                      color: '#222222'
                    },
                    '&$checked + $track': {
                        backgroundColor: '#222222',
                        opacity: '0.8'
                      },
                }
            }
        }
    });

    const SwitchFormControlLabel = withStyles({
        root: {
            marginRight: '0rem',
            marginLeft: '0rem',
        },
        label: {
            fontSize: fontSize,
            letterSpacing: '0.36px',
            color: '#788195',
        }

    })(props => <FormControlLabel {...props} />)

    const StyledSwitch = withStyles({

    })(props => <Switch {...props} />)


	return (
        <ThemeProvider theme={theme}>
		<FormGroup row>
			<SwitchFormControlLabel
				control={
					<StyledSwitch
						checked={checked}
						onChange={(e) => {
                            func(checked, setChecked)
                            console.log(e.target)
                        }}
                        value="checked"
                        disabled={disabled}
                        color="primary"
                        size={(smallerThan1650 && !smallerThan1045) || (smallerThan768 && !smallerThan480) ? 'small':'medium'}
					/>
				}
				label={label}
			/>

		</FormGroup>
        </ThemeProvider>
	);
}
