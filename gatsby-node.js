/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
// Workaround gatsby build failure using mapbox-gl-geocoder: https://stackoverflow.com/questions/64911729/gatsby-build-fails-when-adding-mapbox-gl-geocoder-to-gatsby-js
// https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//     if (stage === "build-html") {
//       actions.setWebpackConfig({
//         module: {
//           rules: [
//             {
//               test: /@mapbox/,
//               use: loaders.null(),
//             },
//           ],
//         },
//       })
//     }
//   }
// workaround for https://stackoverflow.com/questions/65394014/how-to-make-mapbox-load-on-gatsby-site-build-succeeds-but-map-not-displaying-d
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//     console.log(stage);
//     actions.setWebpackConfig({
//         module: {
//             rules: [
//             {
//                 test: /@mapbox|mapbox-gl/,
//                 use: loaders.null(),
//             },
//             ],
//         },
//     });
//   }
exports.onCreateWebpackConfig = ( {stage, loaders, actions} ) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            externals: ['canvas'],
            module: {
                rules: [
                {
                    test: /holderjs/,
                    use: loaders.null(),
                },
                ],
            },
        });    
    }
};
