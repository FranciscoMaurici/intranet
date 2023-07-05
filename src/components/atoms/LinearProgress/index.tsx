import MUILinearProgress from '@mui/material/LinearProgress'

import { colors } from '@theme'

const LinearProgress = () => (
  <MUILinearProgress
    style={{
      width: '100%',
      height: 10,
      backgroundColor: colors.grays.editorHover,
      marginBottom: '2em',
      position: 'absolute',
      top: '-4.5em',
      left: '-4.4em',
    }}
    sx={{
      '& .MuiLinearProgress-bar': {
        backgroundColor: colors.brandSun,
      },
    }}
  />
)

export default LinearProgress
