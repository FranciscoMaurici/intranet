import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;700&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;700&family=Noto+Serif:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/images/distillery-icon.png" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Distillery | Intranet" />
      <meta
        property="og:description"
        content="Stay informed on company news, employee benefits, career learning paths, and new positions via Distillery intranet. Follow the link!"
      />
      <meta property="og:url" content="https://intranet.distillery.com/" />
      <meta property="og:site_name" content="Distillery Intranet" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
