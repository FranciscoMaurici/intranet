import { useState } from 'react'
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid'
import type { NextPage } from 'next'

import FragmentButton from '@components/atoms/FragmentButton'
import FragmentDialog from '@components/molecules/FragmentDialog'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'

import { type reward, rewards } from './data'

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 2 },
  { field: 'points', headerName: 'Points', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 3 },
]

const RewardsList: NextPage = () => {
  const [selectedReward, setSelectedReward] = useState<reward>(null)

  const handleClose = () => {
    setSelectedReward(null)
  }

  const handleExchange = () => {
    alert(`Reward exchanged! ${JSON.stringify(selectedReward)}`)
    handleClose()
  }

  const handleRowClick: GridEventListener<'rowClick'> = params => {
    setSelectedReward(params.row)
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rewards}
        autoHeight
        onRowClick={handleRowClick}
      />
      <FragmentDialog open={!!selectedReward} onClose={handleClose}>
        <FragmentDialogTitle onClose={handleClose}>
          Exchange rewards
        </FragmentDialogTitle>
        <FragmentDialogContent>
          <p>Do you want to exchange this reward?</p>
          <p>Here you can see a full description of the reward</p>
          <p>
            And it&apos;s also intended to show how many points the user will
            have after the exchange
          </p>
          <p>{JSON.stringify(selectedReward)}</p>
        </FragmentDialogContent>
        <FragmentDialogActions>
          <FragmentButton autoFocus onClick={handleClose} variant="outlined">
            Cancel
          </FragmentButton>
          <FragmentButton onClick={handleExchange} variant="contained">
            Exchange reward
          </FragmentButton>
        </FragmentDialogActions>
      </FragmentDialog>
    </>
  )
}

export default RewardsList
