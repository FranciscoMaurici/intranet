import { useEffect, useRef, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import { Grow, IconButton, MenuList, Paper, Stack } from '@mui/material'

import FragmentMenuItem from '@components/atoms/FragmentMenuItem'
import FragmentPopper from '@components/atoms/FragmentPopper'
import { ucfirst } from '@utils'

import {
  CardMenuWrapper,
  DeleteIcon,
  EditIcon,
  ThreeDotsMenuIcon,
} from './styles'
import { IProps } from './types'

const CardMenu = ({ menuItems }: IProps) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = () => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  const MenuItems = menuItems.map(item => {
    if (!item.canView) {
      return null
    }
    return (
      <FragmentMenuItem
        onClick={() => {
          item.onClick()
          handleClose()
        }}
        key={item.type}
        data-testid={item.type}
      >
        {getItemIcon(item.type)}
        {ucfirst(item.type)}
      </FragmentMenuItem>
    )
  })

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    prevOpen.current = open
  }, [open])

  return (
    <Stack direction="row" spacing={2}>
      <CardMenuWrapper>
        <IconButton
          ref={anchorRef}
          onClick={handleToggle}
          id="card-menu-button"
          aria-controls={open ? 'card-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
        >
          <ThreeDotsMenuIcon />
        </IconButton>
        <FragmentPopper open={open} anchorEl={anchorRef}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper elevation={3}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="card-menu-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {MenuItems}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </FragmentPopper>
      </CardMenuWrapper>
    </Stack>
  )
}

export const getItemIcon = (type: string) => {
  switch (type) {
    case 'edit':
      return <EditIcon />
    case 'delete':
      return <DeleteIcon />
    default:
      return null
  }
}

export default CardMenu
export type { IProps }
