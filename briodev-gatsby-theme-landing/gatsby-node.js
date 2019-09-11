const fs = require("fs")
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const crypto = require(`crypto`)
const Debug = require(`debug`)
const { createFilePath } = require('gatsby-source-filesystem')
const { urlResolve } = require(`gatsby-core-utils`)

const debug = Debug(`gatsby-theme-landing-pages-core`)
const withDefaults = require(`./utils/default-options`)


// Make sure the data directory exists
exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
  const { program } = store.getState()
  const { contentPath } = withDefaults(themeOptions)

  const dirs = [
    path.join(program.directory, contentPath),
  ]

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(`interface LandingPage @nodeInterface {
      id: ID!
      title: String!
      description: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      headerImage: File
      tags: [String]!
      keywords: [String]!
      excerpt: String!
      canonical: String!
      twitterCreator: String!
  }`)

  createTypes(
    schema.buildObjectType({
      name: `mdxLandingPage`,
      fields: {
        id: { type: `ID!` },
        title: { type: `String!` },
        canonical: { type: `String!`},
        description: { type: `String!` },
        slug: { type: `String!` },
        headerImage: {
          type: `File`
        },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        keywords: { type: `[String]!` },
        twitterCreator: {type: `String!`},
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`, `LandingPage`],
    })
  )
}



exports.onCreateNode = async ({ node, actions, getNode, createNodeId}, themeOptions) => {
  const { createNode, createParentChildLink } = actions
  const { contentPath, basePath } = withDefaults(themeOptions)

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === `Mdx` && source === contentPath) {
    let slug
    if (node.frontmatter.slug) {
      if (path.isAbsolute(node.frontmatter.slug)) {
        // absolute paths take precedence
        slug = node.frontmatter.slug
      } else {
        // otherwise a relative slug gets turned into a sub path
        slug = urlResolve(basePath, node.frontmatter.slug)
      }
    } else {
      // otherwise use the filepath function from gatsby-source-filesystem
      const filePath = createFilePath({
        node: fileNode,
        getNode,
        basePath: contentPath,
      })

      slug = urlResolve(basePath, filePath)
    }
    const fieldData = {
      title: node.frontmatter.title,
      canonical: node.frontmatter.canonical || '',
      description: node.frontmatter.description || '',
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
      twitterCreator: node.frontmatter.twitterCreator || ``,
      headerImage: node.frontmatter.headerImage
    }

    const mdxLandingPageId = createNodeId(`${node.id} >>> mdxLandingPage`)
    await createNode({
      ...fieldData,
      // Required fields.
      id: mdxLandingPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `mdxLandingPage`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the LandingPage interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxLandingPageId) })
  }
}

// These templates are simply data-fetching wrappers that import components
const PageTemplate = require.resolve(`./src/templates/page-template.js`)
const PageListTemplate = require.resolve(`./src/templates/page-list-template.js`)

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  const { basePath, tagsPath } = withDefaults(themeOptions)

  const result = await graphql(`
    {
      allLandingPage(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        distinct(field: tags)
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create Posts and Post pages.
  const { allLandingPage } = result.data
  const pages = allLandingPage.edges
  const uniqueTags = allLandingPage.distinct

  // Create a page for each Post
  pages.forEach(({ node: page }, index) => {
    const previous = index === pages.length - 1 ? null : pages[index + 1]
    const next = index === 0 ? null : pages[index - 1]
    const { slug } = page
    createPage({
      path: slug,
      component: PageTemplate,
      context: {
        id: page.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  //Create the Posts list page
  createPage({
    path: basePath,
    component: PageListTemplate,
    context: {},
  })

  // Create the Tags list page
  // createPage({
  //   path: tagsPath,
  //   component: TagsTemplate,
  //   context: {

  //   },
  // })

  // uniqueTags.forEach((tag) => {
  //   createPage({
  //     path: `${tagsPath}/${tag}`,
  //     component: TagTemplate,
  //     context: {
  //       tag: tag,
  //       basePath: basePath,
  //       tagsPath: tagsPath
  //     },
  //   })
  // })

}