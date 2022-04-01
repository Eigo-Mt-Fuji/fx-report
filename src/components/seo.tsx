import React from 'react'
import Head from 'next/head'
import config from '../config'

interface SEOProps {
  description: string;
  title: string
}
export default function SEO(props: SEOProps) {
  const siteTitle = config.title
  console.log(props.description);
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.social.twitter} />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
    </Head>
  );
};