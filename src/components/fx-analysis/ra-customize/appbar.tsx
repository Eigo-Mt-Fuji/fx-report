import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
