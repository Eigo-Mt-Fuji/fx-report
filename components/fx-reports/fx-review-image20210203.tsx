import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 */

 
const Image = () => {
  // warn [gatsby-transformer-sharp] The "fixed" and "fluid" resolvers are now deprecated. Switch to "gatsby-plugin-image" for better performance and a simpler API. See https://gatsby.dev/migrate-images to learn how.
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "fx-review-20210203.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
  }`)

  if (!data?.placeholderImage?.childImageSharp?.gatsbyImageData) {
    return <div>Picture not found</div>
  }

  return <GatsbyImage alt="fx-review-20210203.png" image={data.placeholderImage.childImageSharp.gatsbyImageData}  imgStyle={{'width':'100%'}} />
}

export default Image


