import ReactPlayer from "react-player/youtube";
import { Box, Heading } from "@chakra-ui/react";

const VideoPlayer = ({ url }) => {
  return (
    <Box my={8}>
      <Box>
        <Heading as="h3" textAlign="center" mb={4}>
          Prefer Video Content?
        </Heading>
      </Box>
      <Box className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export { VideoPlayer };
