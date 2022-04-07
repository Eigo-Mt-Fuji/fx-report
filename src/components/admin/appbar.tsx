import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// https://scriptverse.academy/tutorials/reactjs-material-ui-icons.html
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const MyAppBar = (props : any) => {
    const classes = useStyles();
    return (
        <AppBar {...props}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <AttachMoneyIcon />
            <span className={classes.spacer} />
        </AppBar>
    );
};

export default MyAppBar;
