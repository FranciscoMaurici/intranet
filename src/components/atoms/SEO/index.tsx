import Head from 'next/head'

import IProps from '@components/atoms/SEO/types'

const SEO = ({ title, canonicalURL, description }: IProps) => (
  <Head>
    <meta charSet="utf-8" />
    <title>{`Distillery Intranet - ${title}`}</title>
    {canonicalURL && <link rel="canonical" href={canonicalURL} />}
    {!!description?.trim() && <meta name="description" content={description} />}
  </Head>
)

export default SEO
