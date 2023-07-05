import { GetStaticProps, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import { createSwaggerSpec } from 'next-swagger-doc'

import swaggerOptions from '../models/swagger.json'

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
    definition: swaggerOptions,
  })

  return {
    props: {
      spec,
    },
  }
}

export default ApiDoc

/**
 *  @swagger
 *  components:
 *    responses:
 *      400:
 *        description: There was an error during the process
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                type: string
 *              example:
 *                message: Error
 *      401:
 *        description: The user who is consulting this API needs to login first
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                type: string
 *              example:
 *                message: The user is not logged in
 *                error: The user is not logged in
 *    parameters:
 *      id:
 *        in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the entity
 *      slug:
 *        in: path
 *        name: slug
 *        schema:
 *          type: string
 *        required: true
 *        description: Slug identifier of the entity
 */
