import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue as mode,
  chakra,
} from "@chakra-ui/react";

import Image from "next/image";
import Link from "next/link";

export const FeaturedPost = ({ props, href }) => {
  const { title, description, image, author, category } = props;
  const FeaturedImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <Link href={href} key={href} style={{ textDecoration: "inherit" }}>
      <LinkBox
        as="article"
        bg={{ sm: mode("white", "gray.700") }}
        shadow={{ sm: "base" }}
        rounded={{ sm: "md" }}
        overflow="hidden"
        transition="all 0.2s"
        _hover={{
          shadow: {
            sm: "lg",
            lg: "dark-lg",
          },
        }}
      >
        <Flex direction="column">
          {image && (
            <FeaturedImage
              height="200"
              width="250"
              quality={100}
              objectFit="cover"
              alt={title}
              src={image}
            />
          )}
          <Flex direction="column" px={{ sm: 6 }} py="5">
            <Text
              casing="uppercase"
              letterSpacing="wider"
              fontSize="xs"
              color={mode("gray.800", "gray.400")}
              fontWeight="semibold"
              mb="2"
              textDecoration="none"
            >
              {category}
            </Text>
            <Heading as="h3" size="sm" mb="2" lineHeight="base">
              {title}
            </Heading>
            <Text noOfLines={2} mb="8" color={mode("gray.600", "gray.400")}>
              {description}
            </Text>
            <Flex
              align="baseline"
              justify="space-between"
              fontSize="sm"
              color={mode("gray.600", "gray.400")}
            >
              <Text>
                By <Box textDecor="underline">{author}</Box>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </LinkBox>
    </Link>
  );
};
