import * as React from 'react';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@mui/icons-material/Label';

const Menu: any = ({ onMenuClick, logout }:any) => {
    // const isXSmall = useMediaQuery((theme:any) => theme.breakpoints.down('xs'));
    const open = useSelector((state:any) => state.admin.ui.sidebarOpen);
    const resources:any[] = useSelector(getResources);
    return (
        <div>
            {resources.map((resource:any) => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.options && resource.options.label || resource.name}
                    leftIcon={createElement(resource.icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/custom-route"
                primaryText="Miscellaneous"
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {/* {isXSmall && logout} */}
        </div>
    );
}

export default withRouter(Menu);
