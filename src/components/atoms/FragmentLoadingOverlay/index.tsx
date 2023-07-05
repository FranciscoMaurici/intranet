import { Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

const FragmentLoadingOverlay = () => (
  <Backdrop open sx={{ color: '#fff', zIndex: 1500 }}>
    <Stack gap={1} justifyContent="center" alignItems="center">
      <CircularProgress color="inherit" />
      <Typography>Loading...</Typography>
    </Stack>
  </Backdrop>
)

export default FragmentLoadingOverlay
