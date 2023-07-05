import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

import { isActiveLink } from '@utils'

import {
  SettingsMenuContainer,
  SideMenuContainer,
  SideMenuLinkButton,
} from './styles'
import type { IMenuItem, SideMenuSection } from './types'
import { useMenu } from './utils'

import ConfigurationIcon from '@/components/atoms/ConfigurationIcon'
import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'

const SideMenu = () => {
  const contentMenu = useMenu('CONTENT')
  const settingsMenu = useMenu('SETTING')
  const logoutItem = {
    title: 'Logout',
    onClick: () => signOut({ redirect: true, callbackUrl: '/' }),
  }

  return (
    <SideMenuContainer>
      {contentMenu && (
        <div>
          <SideMenuSection items={contentMenu.items} />
        </div>
      )}
      <SettingsMenuContainer>
        <SideMenuSection
          items={
            settingsMenu ? [...settingsMenu.items, logoutItem] : [logoutItem]
          }
        />
      </SettingsMenuContainer>
    </SideMenuContainer>
  )
}

const SideMenuSection = ({ items }: SideMenuSection) => {
  const router = useRouter()

  const SideMenuItem = ({ title, href, onClick }: IMenuItem) => {
    const buttonProps = {
      className: isActiveLink(router.asPath, href) ? 'active' : '',
      onClick: onClick ? onClick : null,
    }

    const SideMenuButton = () => (
      <SideMenuLinkButton {...buttonProps}>
        {getIcon(title)}
        <FragmentText color={colors.neutrals.x700} variant="bodySmallBold">
          {title}
        </FragmentText>
      </SideMenuLinkButton>
    )

    if (href) {
      return (
        <Link key={title} href={href}>
          <SideMenuButton />
        </Link>
      )
    } else {
      return <SideMenuButton />
    }
  }

  return (
    <>
      {items.map((item: IMenuItem) => (
        <SideMenuItem key={item.title} {...item} />
      ))}
    </>
  )
}

export const getIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case 'logout': {
      return (
        <Image
          src={'/images/logout-icon.svg'}
          width={18}
          height={18}
          alt="Logout"
        />
      )
    }
    case 'configuration': {
      return <ConfigurationIcon />
    }
    default:
      return null
  }
}

export default SideMenu
