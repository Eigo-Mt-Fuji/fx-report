import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MyDashboard from "./ra-customize/dashboard";
import FxAnalysisList from "./ra-resources/fx-analysis-list";
import MyLayout from './ra-customize/layout';

const dataProvider = jsonServerProvider(process.env.NEXT_PUBLIC_FX_ANALYSIS_BACKEND_API_ENDPOINT);

const AdminApp = () => (
  <Admin 
    layout={MyLayout} 
    dashboard={MyDashboard} 
    dataProvider={dataProvider}
    disableTelemetry>
    <Resource name="fx-analysis" list={FxAnalysisList} icon={AttachMoneyIcon} />
  </Admin>
);

export default AdminApp;
