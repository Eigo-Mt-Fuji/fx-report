import { Layout } from 'react-admin';
import MyAppBar from './appbar';
import MyMenu from './menu';
import MyNotification from './notification';

const MyLayout = (props) => <Layout
    {...props}
    appBar={MyAppBar}
    menu={MyMenu}
    notification={MyNotification}
/>;

export default MyLayout
