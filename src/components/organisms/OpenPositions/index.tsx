import { Dispatch, ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import AnimatedContentToggle from '@components/atoms/AnimatedContentToggle'
import CardInputContainer from '@components/molecules/CardInputContainer'
import ConfirmDialog from '@components/molecules/ConfirmDialog'
import FragmentMasonry from '@components/molecules/FragmentMasonry'
import { OpenPosition } from '@prisma/client'

import {
  CardSearchControlsContainer,
  DisclaimerMessage,
  HeaderPositionsBar,
  ResultsNumberContainer,
  SearchBoxContainer,
  SearchSectionContainer,
} from './styles'
import { IProps } from './types'

import OpenPositionCard from '@/components/molecules/OpenPositionCard'
import PositionModal from '@/components/molecules/OpenPositionModal'
import { IOpenPositionPostPutRequest, Mutations } from '@/types'
import { includes } from '@/utils'
import { useAppMutation } from '@/utils/hooks/useAppMutation'

const defaultOpenPosition = {
  client: '',
  title: '',
  openings: 0,
  description: '',
  position_id: '',
}

export const renderResultsCountMessage = (search: string, count: number) =>
  search && (
    <div>
      <p>
        {!count ? (
          <>
            No results for your query: <strong>{search}</strong>
          </>
        ) : (
          <>
            {count} result
            {count !== 1 && 's'} for your query: <strong>{search}</strong>
          </>
        )}
      </p>
    </div>
  )

export const filterOpenPositions = (
  rawTerms: string,
  openPositions: OpenPosition[],
): OpenPosition[] => {
  const terms = rawTerms
    .trim()
    .split(' ')
    .filter(term => !!term)

  const filteredOpenPositions =
    terms.length > 0
      ? openPositions.filter(({ title, description, client }) =>
          terms.some(
            el =>
              includes(el, title) ||
              includes(el, description) ||
              includes(el, client),
          ),
        )
      : openPositions

  return filteredOpenPositions
}

const OpenPositions = ({
  openPositions,
  isLoading,
  open,
  toggleDialog,
}: IProps) => {
  const [openPosition, setOpenPosition] =
    useState<IOpenPositionPostPutRequest>(defaultOpenPosition)
  const [openConfirm, toggleConfirmDialog] = useState(false)
  const [search, setSearch] = useState<string>('')
  const filteredOpenPositions = filterOpenPositions(search, openPositions)

  const deleteMutation = useAppMutation(Mutations.DELETE_POSITION, {
    onSettled: () => handleCloseDeleteDialog(),
  })

  const handleClose = reason => {
    if (reason !== 'backdropClick') {
      setOpenPosition(defaultOpenPosition)
      toggleDialog(false)
    }
  }

  const handleOpenEditDialog = (openPosition: IOpenPositionPostPutRequest) => {
    setOpenPosition(openPosition)
    toggleDialog(true)
  }

  const handleOpenDeleteDialog = (
    openPosition: IOpenPositionPostPutRequest,
  ) => {
    setOpenPosition(openPosition)
    toggleConfirmDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenPosition(defaultOpenPosition)
    toggleConfirmDialog(false)
  }

  const handleConfirmDeletion = () => {
    deleteMutation.mutate(openPosition)
  }

  const renderOpenPositions = () =>
    filteredOpenPositions.map(openPosition => (
      <AnimationWrapper key={openPosition.id}>
        {({ isExpanded, setIsExpanded }) => (
          <OpenPositionCard
            openPosition={openPosition}
            handleOpenEditDialog={() => handleOpenEditDialog(openPosition)}
            handleOpenDeleteDialog={() => handleOpenDeleteDialog(openPosition)}
            onToggle={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
          />
        )}
      </AnimationWrapper>
    ))

  return (
    <>
      <SearchSectionContainer>
        <CardInputContainer key="card-input-container" flexDirection="column">
          <HeaderPositionsBar>
            <SearchBoxContainer>
              <CardSearchControlsContainer>
                <input
                  placeholder="Search..."
                  onChange={({ target: { value } }) => setSearch(value)}
                />
              </CardSearchControlsContainer>
              {search && (
                <ResultsNumberContainer>
                  {renderResultsCountMessage(
                    search,
                    filteredOpenPositions.length,
                  )}
                </ResultsNumberContainer>
              )}
            </SearchBoxContainer>
            <DisclaimerMessage>
              <p>
                <strong>
                  Do you want to refer or apply to any of these opportunities?
                </strong>
              </p>
              <a
                href="https://handbook.distillery.com/refer-a-friend"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Applying Policies
              </a>
            </DisclaimerMessage>
          </HeaderPositionsBar>
        </CardInputContainer>
      </SearchSectionContainer>
      <FragmentMasonry>
        {!!filteredOpenPositions?.length && renderOpenPositions()}
      </FragmentMasonry>
      {open && (
        <PositionModal
          open={open}
          handleClose={reason => handleClose(reason)}
          openPosition={openPosition}
          isLoading={isLoading}
        />
      )}
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          handleClose={handleCloseDeleteDialog}
          handleConfirm={handleConfirmDeletion}
          message={
            'Do you want to continue with the deletion of the open position?'
          }
          title={'Delete open position'}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

interface IArgs {
  isExpanded: boolean
  setIsExpanded: Dispatch<boolean>
}

interface IAnimationWrapperProps {
  children: ({ isExpanded, setIsExpanded }: IArgs) => ReactNode
}

const AnimationWrapper = ({ children }: IAnimationWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [height, setHeight] = useState('100%')
  const ref = useRef(null)

  useLayoutEffect(() => {
    setHeight(ref.current.offsetHeight)
  }, [ref])

  return (
    <AnimatePresence initial={false}>
      <AnimatedContentToggle
        isExpanded={isExpanded}
        initialHeight={height}
        transition={{
          type: 'fade',
          bounce: 1,
          stiffness: 300,
          duration: 0.25,
        }}
      >
        <div ref={ref}>{children({ isExpanded, setIsExpanded })}</div>
      </AnimatedContentToggle>
    </AnimatePresence>
  )
}

export default OpenPositions
