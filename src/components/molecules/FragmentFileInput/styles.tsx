import { BsCheckCircle, BsFileEarmarkPdf } from 'react-icons/bs'
import { FiUploadCloud } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'

import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'

export const Container = styled.div``

export const DropzoneContainer = styled.div<{ $isDragging: boolean }>`
  height: 8.75em;
  width: 100%;
  background-color: ${props =>
    props.$isDragging ? colors.neutrals.x200 : colors.neutrals.x100};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px dashed
    ${props =>
      props.$isDragging ? colors.neutrals.x400 : colors.neutrals.x300};
  border-radius: 0.25em;
`

export const UploadFileIcon = styled(FiUploadCloud)`
  color: ${colors.neutrals.x800};
  font-size: 3em;
`

export const BrowseText = styled.span`
  color: ${colors.textLink};
`

export const FilesList = styled.ul`
  margin: 1em 0;
  padding: 0;
  list-style: none;
`

export const FileListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5em;
  margin-bottom: 0.75em;
  border: 1px solid ${colors.neutrals.x600};
  border-radius: 0.25em;
  background-color: ${colors.neutrals.x100};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const FileName = styled(FragmentText)`
  flex-grow: 1;
  margin-left: 0.5em;
`

export const FileSize = styled(FragmentText)`
  font-size: 0.8em;
  color: ${colors.grays.heading};
  margin-left: 0.2em;
`

export const RemoveIcon = styled(MdClose)`
  cursor: pointer;
  margin-left: 0.5em;
`
export const FolderIcon = styled(BsFileEarmarkPdf)`
  font-size: 1.3em;
`

export const SuccessCheckmark = styled(BsCheckCircle)`
  font-size: 1.3em;
  color: ${colors.success.x700};
`
