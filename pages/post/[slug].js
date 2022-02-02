import { staticRequest } from "tinacms";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { VideoPlayer } from "../../components/Blog/VideoPlayer";
import {
  Box,
  Heading,
  Code,
  Text,
  chakra,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Seo } from "../../components/Seo";
import Image from "next/image";

const query = `query getPost($relativePath: String!) {
  getPostDocument(relativePath: $relativePath) {
    data {
      title
      date
      image
      author
      category
      tags
      description
      body
    }
  }
}
`;

export default function Slug(props) {
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  const components = {
    h1: (props) => <Heading as="h1" fontSize="6xl" my={2} {...props} />,
    h2: (props) => (
      <Heading
        as="h2"
        color={mode("purple.600", "purple.300")}
        fontSize="5xl"
        my={2}
        {...props}
      />
    ),
    h3: (props) => (
      <Heading
        as="h3"
        color={mode("purple.600", "purple.300")}
        fontSize="4xl"
        my={2}
        {...props}
      />
    ),
    h4: (props) => (
      <Heading
        as="h4"
        color={mode("purple.600", "purple.300")}
        fontSize="3xl"
        my={2}
        {...props}
      />
    ),
    h5: (props) => (
      <Heading
        as="h5"
        color={mode("purple.600", "purple.300")}
        fontSize="2xl"
        my={2}
        {...props}
      />
    ),
    h6: (props) => (
      <Heading
        as="h6"
        color={mode("purple.600", "purple.300")}
        fontSize="xl"
        my={2}
        {...props}
      />
    ),
    li: (props) => <Box as="li" fontSize="xl" my={2} mx={4} {...props} />,
    ul: (props) => <Box as="ul" fontSize="xl" my={2} mx={4} {...props} />,
    ol: (props) => <Box as="ol" fontSize="xl" my={2} mx={4} {...props} />,
    a: (props) => {
      return <Link href={props.href}>{props.children}</Link>;
    },
    code: (props) => {
      return (
        <Code colorScheme="purple" fontSize="xl" my={2}>
          {props.children}
        </Code>
      );
    },
    p: (props) => {
      return <Text fontSize="xl" my={2} {...props} />;
    },
    img: (props) => {
      const BlogImage = chakra(Image, {
        shouldForwardProp: (prop) =>
          ["height", "width", "quality", "src", "alt"].includes(prop),
      });
      return (
        <BlogImage
          mx="auto"
          src={props.url}
          height="500"
          width="1080"
          alt={props.alt}
          objectFit="contain"
          quality="70"
        />
      );
    },
    youtube: (props) => {
      return <VideoPlayer url={props.url} />;
    },
  };
  if (data && data.getPostDocument?.data) {
    return (
      <>
        <Seo
          title={data.getPostDocument.data.title}
          description={data.getPostDocument.data.description}
          image={data.getPostDocument.data.image}
          date={data.getPostDocument.data.date}
        />
        <Box maxWidth="1080px" width="100%" mx="auto" mt={[2, 4]} mb="4" px="4">
          <article>
            <Heading
              as="h1"
              color="purple.300"
              size="3xl"
              textAlign="center"
              my={8}
            >
              {data.getPostDocument.data.title}
            </Heading>
            <TinaMarkdown
              content={data.getPostDocument.data.body}
              components={components}
            />
          </article>
        </Box>
      </>
    );
  }
  return (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const tinaProps = await staticRequest({
    query: `{
        getPostList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  });
  const paths = tinaProps.getPostList.edges.map((x) => {
    return { params: { slug: x.node.sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async (ctx) => {
  const variables = {
    relativePath: ctx.params.slug + ".mdx",
  };
  let data = null;
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch (error) {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      variables,
    },
  };
};
