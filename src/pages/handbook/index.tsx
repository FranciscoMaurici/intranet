import StickyBox from 'react-sticky-box'
import type { NextPage } from 'next'

import PageLayout from '@components/templates/PageLayout'

import { PageTitle } from '@/components'
import FragmentText from '@/components/atoms/FragmentText'
import HandbookMenu from '@/components/molecules/HandbookMenu'
import HandbookSection from '@/components/molecules/HandbookSection'
import { Content } from '@/components/organisms/Dashboard/styles'
import Handbook from '@/components/organisms/Handbook'
import { Container } from '@/components/organisms/Handbook/styles'
import { useGetEntity } from '@/utils/hooks/useEntity'

const HandbookView: NextPage = () => {
  const { isLoading, data: handbook } = useGetEntity('handbook')

  return (
    <PageLayout pageTitle="Distillery Handbook">
      {isLoading ? (
        <Container>
          <HandbookSection.Skeleton />
          <HandbookSection.Skeleton />
          <HandbookSection.Skeleton />
        </Container>
      ) : (
        handbook && (
          <Content>
            <article>
              <header>
                <PageTitle>Distillery Handbook</PageTitle>
                <FragmentText>
                  Distillery Handbook is a guide that helps any newcomer get
                  familiar with the company and serves as a place for storing
                  materials necessary for work. If you are reading this
                  document, you are either part of the team or preparing to
                  become one. Some of the links you’ll see in this guide lead to
                  documents hosted on the corporate Google Drive. Make sure you
                  are logged into your Gmail to be able to read the
                  documentation. Most of the resources that require a Gmail
                  login are confidential. Such documents can only be shared
                  within Distillery.
                </FragmentText>
              </header>
              <Handbook articles={handbook} />
            </article>
            <div>
              <StickyBox offsetBottom={15}>
                <HandbookMenu articles={handbook} />
              </StickyBox>
            </div>
          </Content>
        )
      )}
    </PageLayout>
  )
}

export default HandbookView
