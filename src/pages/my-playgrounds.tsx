import React from 'react'
import Layout from '../components/layout'
import MyPlaygroundMap from '../components/my-playgrounds/my-playground-map';

export default function MyPlaygrounds() : any {
  return (
    <Layout>
      <MyPlaygroundMap geocoder={true} zoom={12} width={400} height={400} latitude={35.697976} longitude={139.704339}>焼肉ますお 新宿本店(2021.02.13)</MyPlaygroundMap>
    </Layout>
  );
}
