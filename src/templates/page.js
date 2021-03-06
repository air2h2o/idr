import '../polyfills';
import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import Layout from '../components/Layouts';
import EditLink from '../components/EditLink';

import { FourOhFour, WebsiteBackToTopBtn } from '@carbon/addons-website';

// Components
import PageHeader from '../components/PageHeader';

import NextPrevious from '../components/NextPrevious';

import {
  HomepageHeader,
  HomepageWhyDoIt,
  HomepageTileNav,
} from '../components/Homepage/Homepage';

export default ({ data }) => {
  const post = data.mdx;
  let currentPage = post.fields.currentPage;
  let slug = post.fields.slug;
  let tabs = post.frontmatter.tabs;

  const homepage = (post.frontmatter.title === 'Homepage') == true;

  if (homepage) {
    if (typeof document !== 'undefined') {
      document.body.style.background = '#282828';
    }

    return (
      <Layout>
        <div className="container--homepage">
          <HomepageHeader />
          <HomepageTileNav />
          <HomepageWhyDoIt />
          <main className="page-content ibm--grid" id="maincontent">
            <MDXRenderer>{post.code.body}</MDXRenderer>
          </main>
        </div>
        <WebsiteBackToTopBtn />
      </Layout>
    );
  } else {
    if (typeof document !== 'undefined') {
      document.body.style.background = '#f3f3f3';
    }

    return (
      <Layout>
        <PageHeader
          title={post.frontmatter.title}
          label={post.frontmatter.label}
        />
        <main className="page-content ibm--grid" id="maincontent">
          <MDXRenderer>{post.code.body}</MDXRenderer>
          <EditLink slug={slug} />
        </main>
        <NextPrevious
          slug={slug}
          currentTabs={tabs}
          currentPage={currentPage}
        />
        <WebsiteBackToTopBtn />
      </Layout>
    );
  }
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      fields {
        slug
        currentPage
      }
      frontmatter {
        title
        label
      }
    }
  }
`;
