import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { ChakraProvider } from "@chakra-ui/react";
import "../utils/player.css";
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

const branch = "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <TinaEditProvider
        editMode={
          <TinaCMS
            apiURL={apiURL}
            mediaStore={async () => {
              const pack = await import("next-tinacms-cloudinary");
              return pack.TinaCloudCloudinaryMediaStore;
            }}
          >
            <Component {...pageProps} />
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </ChakraProvider>
  );
};

export default App;
