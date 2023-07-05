import React from 'react'
import { GrowProps, PopperPlacementType } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

// Check Popper documentation in https://popper.js.org/docs/v2/virtual-elements/

type VirtualElement = {
  getBoundingClientRect: () => ClientRect | DOMRect
  contextElement?: Element
}

export interface IProps {
  children?: (props: {
    placement: PopperPlacementType
    TransitionProps?: TransitionProps
  }) => React.ReactElement<GrowProps>
  open: boolean
  anchorEl: React.RefObject<VirtualElement>
}
