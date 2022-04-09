import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MyDashboard from "./ra-customize/dashboard";
import FxAnalysisList from "./ra-resources/fx-analysis-list";
import MyLayout from './ra-customize/layout';


const dataProvider = jsonServerProvider(process.env.NEXT_PUBLIC_FX_ANALYSIS_BACKEND_API_ENDPOINT);
const theme = createTheme({
  direction: 'rtl',
});

const AdminApp = () => (
  <ThemeProvider theme={theme}>
    <Admin 
      dashboard={MyDashboard} 
      dataProvider={dataProvider}
      disableTelemetry>
      <Resource name="fx-analysis" list={FxAnalysisList} icon={AttachMoneyIcon} />
    </Admin>
  </ThemeProvider>
);

export default AdminApp;
