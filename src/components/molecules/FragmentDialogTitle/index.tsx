import { MdClose } from 'react-icons/md'
import { IconButton } from '@mui/material'

import { FragmentDialogTitleStyled } from './styles'
import { IProps } from './types'

const FragmentDialogTitle = (props: IProps) => (
  <FragmentDialogTitleStyled
    data-testid={props.children.toString().replace(/,/g, '')}
    {...props}
  >
    {props.children}
    {props.onClose ? (
      <IconButton aria-label="close" onClick={props.onClose}>
        <MdClose />
      </IconButton>
    ) : null}
  </FragmentDialogTitleStyled>
)

export default FragmentDialogTitle
export type { IProps }
