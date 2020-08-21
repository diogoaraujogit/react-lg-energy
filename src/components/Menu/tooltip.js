
import { Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const MenuToolTip = withStyles(theme => ({
    tooltip: {
        fontSize: 18
    }
}))(Tooltip)

export default MenuToolTip
