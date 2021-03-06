import { NextPage } from 'next';
import dynamic from "next/dynamic";
const App = dynamic( () => import("../../components/fx-analysis/app"), {ssr: false});

const AdminPage: NextPage = () => {
  return <App />;
};

export default AdminPage;
