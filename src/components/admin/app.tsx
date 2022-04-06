import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Dashboard from "./dashboard";
import FxAnalysisList from "./fx-analysis-list";

const dataProvider = jsonServerProvider(process.env.NEXT_PUBLIC_FX_ANALYSIS_BACKEND_API_ENDPOINT);

const App = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="fx-analysis" list={FxAnalysisList} icon={AttachMoneyIcon} />
  </Admin>
);

export default App;
