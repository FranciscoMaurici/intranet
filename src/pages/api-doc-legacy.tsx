import { GetStaticProps, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import { createSwaggerSpec } from 'next-swagger-doc'

import swaggerOptions from '../models/swagger-legacy.json'

import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic<{
  spec: unknown
}>(import('swagger-ui-react'), { ssr: false })

const ApiDoc = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <SwaggerUI spec={spec} />
)

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NEXT_PUBLIC_ENV === 'prod') {
    return {
      notFound: true,
    }
  }
  const spec = createSwaggerSpec({
    // @ts-expect-error The swagger-legacy file contains errors. It will be deleted in the future.
    definition: swaggerOptions,
  })

  return {
    props: {
      spec,
    },
  }
}

export default ApiDoc
