import React from 'react'
import Tooltip from '../../components/Menu/tooltip'
const WrapperButton = props => (

    <Tooltip title={props.tip} placement='right-start'>
        <button {...props.style} className={props.className} {...props}>
            {props.children}
        </button>
    </Tooltip>


)

export default WrapperButton

