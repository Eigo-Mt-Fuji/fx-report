import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

// TODO: jsonServerProviderわからない
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

// TODO: AdminコンポーネントとResourceコンポーネントわからない
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
    <Resource name="posts" list={ListGuesser} />
  </Admin>
);

export default App;
