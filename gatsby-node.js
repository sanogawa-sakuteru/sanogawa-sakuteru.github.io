/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// gatsby-node.js
exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: '/',
    toPath: '/index.html',
    isPermanent: true,
    redirectInBrowser: true,
  });
};
