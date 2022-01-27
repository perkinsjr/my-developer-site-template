import { useRouter } from "next/router";
import Head from "next/head";

const Seo = (props) => {
  const { ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: "Your Name - Developer, Writer, Creator",
    description: "Your Name Homepage for blog and content",
    image:
      "https://res.cloudinary.com/dub20ptvt/image/upload/v1642782664/sgbjmezsorrnhqtwnibg.png",
    type: "website",
    ...customMeta,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow,index" />
      <meta content={meta.description} name="description" />
      <meta
        propety="og:url"
        content={`https://jamesperkins.dev${router.asPath}`}
      />
      <link rel="canonical" href={`https://jamesperkins.dev${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="James Perkins" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:image" content={meta.image} />
      <meta property="twitter:card" content="summary_large_card" />
      <meta property="twitter:site" content="@james_r_perkins" />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )}
    </Head>
  );
};

export { Seo };
