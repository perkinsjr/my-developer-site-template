import { staticRequest } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/edit-state";
import { Fragment } from "react";
import { Hero } from "../components/Home/Hero";
import { Layout } from "../components/Layout/Layout";
import { Projects } from "../components/Home/Projects";
import { FeaturedArticles } from "../components/Home/FeaturedArticles";
const query = `{
  getPageDocument(relativePath: "home.mdx"){id
  	data{
      blocks{
       __typename
        ... on PageBlocksHero{
          heading
          subheading
          description
          image
        }
        ... on PageBlocksProjects{
          heading,
          subheading,
          items{
            image
            name
            description
            href
          }
        }
        ... on PageBlocksFeatures{
          items{
            image
            title
            author
            category
            description
            href
          }
        }
      }
    }
  }
}`;

export default function Home(props) {
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });

  return (
    <Layout>
      {data && data.getPageDocument.data.blocks
        ? data.getPageDocument.data.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "PageBlocksHero":
                return (
                  <Fragment key={i + block.__typename}>
                    <Hero data={block} />
                  </Fragment>
                );
              case "PageBlocksProjects":
                return (
                  <Fragment key={i + block.__typename}>
                    <Projects data={block} />
                  </Fragment>
                );
              case "PageBlocksFeatures":
                return (
                  <Fragment key={i + block.__typename}>
                    <FeaturedArticles data={block} />
                  </Fragment>
                );
            }
          })
        : null}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const variables = {};
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
    },
  };
};
