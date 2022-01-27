import { staticRequest } from "tinacms";
import Link from "next/link";
import { useTina } from "tinacms/dist/edit-state";
import { Heading, SimpleGrid, Box } from "@chakra-ui/react";
import { FeaturedPost } from "../../components/Blog/FeaturedPost/FeaturedPost";
import { Layout } from "../../components/Layout/Layout";
const query = `{
  getPostList{
    edges {
      node {
        id
        data{
          title
          date
          description
          author
          category
          image
        }
        sys {
          filename
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
  const postsList = data.getPostList.edges;
  const sortedPosts = postsList.sort((a, b) => {
    return new Date(b.node.data.date) - new Date(a.node.data.date);
  });
  return (
    <Layout>
      <Box maxWidth="1080px" width="100%" mx="auto" mt={[2, 4]} mb={4} px={4}>
        <Heading as="h1" textAlign="center" fontSize="3xl" m={2}>
          All Posts
        </Heading>
        <SimpleGrid columns={[1, null, 3]} spacing="40px" mt={4}>
          {sortedPosts.map((post) => (
            <FeaturedPost
              key={post.node.id}
              href={`/post/${post.node.sys.filename}`}
              props={post.node.data}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let data = {};
  const variables = {};
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
      //myOtherProp: 'some-other-data',
    },
  };
};
