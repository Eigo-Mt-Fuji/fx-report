import React from 'react'
import Layout from '../components/layout'
import DigitalSignageList from '../components/digital-signages/list';

export default function DigitalSignage() : any {
  return (
    <Layout>
      <DigitalSignageList title="お気に入り"></DigitalSignageList>
    </Layout>
  );
}
