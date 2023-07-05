import React from 'react'
import Image from 'next/image'

import FragmentText from '../FragmentText'

import { Content, Header } from './styles'

const BenefitsHeader = () => (
  <Header>
    <Image
      alt="benefit-header-image"
      src="/images/benefit-header-left.jpg"
      fill
    ></Image>
    <Content>
      <FragmentText variant="subHeadingRegular">KNOW OUR</FragmentText>
      <FragmentText variant="headingLarge">Culture & Benefits</FragmentText>
      <FragmentText>
        We define Distillery as a leading software development company that
        provides elite international talent to the world&apos;s best brands.
        We&apos;ve formulated four BEST values that we translate to our
        customers and to our day-to-day operations:
        <FragmentText variant="bodyRegularBold" as={'span'}>
          {` Best people, Expertise, Service and Teamwork`}
        </FragmentText>
      </FragmentText>
    </Content>
    <Image
      alt="benefit-header-image"
      src="/images/benefit-header-right.jpg"
      fill
    ></Image>
  </Header>
)

export default BenefitsHeader
