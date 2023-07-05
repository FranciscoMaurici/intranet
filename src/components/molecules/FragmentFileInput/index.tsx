import { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, FieldValues } from 'react-hook-form'
import { CircularProgress as LoadingSpinner } from '@mui/material'
import { SuccessResponse, UploadedUppyFile, UppyFile } from '@uppy/core'

import {
  BrowseText,
  Container,
  DropzoneContainer,
  FileListItem,
  FileName,
  FileSize,
  FilesList,
  FolderIcon,
  RemoveIcon,
  SuccessCheckmark,
  UploadFileIcon,
} from './styles'
import { FileListItemProps, IProps } from './types'
import { useUppyInstance } from './utils'

import FragmentText from '@/components/atoms/FragmentText'

export const FragmentFileInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
}: IProps<T>) => {
  const uppy = useUppyInstance()
  const [isDragging, setIsDragging] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(file =>
        uppy?.addFile({
          name: file.name,
          type: file.type,
          data: file,
        }),
      )
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: { 'application/pdf': ['.pdf'] },
  })

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        // We use a ref for `value` to capture the most recent state in our callback functions.
        // This is because React's functional components use closures, and any function defined in
        // the component will capture the props and state from the render it was defined in. By using
        // a ref, we can ensure our functions always have access to the most recent value.
        const valueRef = useRef(value)

        // Setting up a queue mechanism to handle multiple upload responses. The queue ensures that each
        // file's upload result is processed sequentially. This prevents potential race conditions
        // due to React's setState operations being asynchronous.
        const [uploadQueue, setUploadQueue] = useState([])

        // A flag indicating whether we're currently processing the queue. This is to ensure
        // only one instance of the queue processing effect is running at a time. Without this,
        // multiple instances of the effect could run concurrently, leading to unexpected behavior.
        const [isProcessingQueue, setIsProcessingQueue] = useState(false)

        useEffect(() => {
          valueRef.current = value
        }, [value])

        useEffect(() => {
          if (uploadQueue.length === 0 || isProcessingQueue) return

          setIsProcessingQueue(true)

          // Process the first URL in the queue
          const newUrl = uploadQueue[0]
          const newValue = [...(valueRef.current || []), newUrl]
          onChange(newValue)

          // After processing, remove the processed URL from the queue
          setUploadQueue(prevQueue => prevQueue.slice(1))

          setIsProcessingQueue(false)
        }, [uploadQueue, onChange, isProcessingQueue])

        // When a file upload is successful, add the uploaded URL to the queue
        const onFileUploadSuccess = (
          file: UppyFile,
          result: SuccessResponse,
        ) => {
          setUploadQueue(prevQueue => [...prevQueue, result.uploadURL])
        }

        useEffect(() => {
          uppy?.on('upload-success', onFileUploadSuccess)
          return () => {
            uppy?.off('upload-success', onFileUploadSuccess)
          }
        }, [onChange, uppy])

        const removeFile = (file: UploadedUppyFile<unknown, unknown>) => {
          const newValues = value.filter(url => url !== file.uploadURL)
          onChange(newValues)
          uppy.removeFile(file.id)
        }

        return (
          <Container>
            <DropzoneContainer {...getRootProps()} $isDragging={isDragging}>
              <input {...getInputProps()} />
              <UploadFileIcon />
              <FragmentText variant="bodyRegularBold">
                {isDragging ? (
                  'Drop your file/s here'
                ) : (
                  <>
                    Drag and drop, or <BrowseText>browse</BrowseText> your files
                  </>
                )}
              </FragmentText>
            </DropzoneContainer>
            <FilesList>
              {uppy &&
                Object.values(uppy.getState().files).map(file => (
                  <FileListItemComponent
                    key={file.id}
                    file={file}
                    removeFile={removeFile}
                  />
                ))}
            </FilesList>
          </Container>
        )
      }}
    />
  )
}

const FileListItemComponent = ({ file, removeFile }: FileListItemProps) => (
  <FileListItem>
    <FolderIcon />
    <FileName as="span" variant="bodySmall">
      {file.name}{' '}
      <FileSize as="span" variant="bodyMicroBold">
        ({Math.round(file.size / 1024)} KB)
      </FileSize>
    </FileName>
    {file.progress?.uploadComplete ? (
      <>
        <SuccessCheckmark />
        <RemoveIcon
          onClick={() => removeFile(file as UploadedUppyFile<unknown, unknown>)}
        />
      </>
    ) : (
      <LoadingSpinner size={25} />
    )}
  </FileListItem>
)

export default FragmentFileInput
