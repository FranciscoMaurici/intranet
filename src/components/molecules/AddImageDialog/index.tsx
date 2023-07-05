import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Uppy from '@uppy/core'
import Transloadit from '@uppy/transloadit'

import FragmentButton from '@components/atoms/FragmentButton'
import FragmentDialog from '@components/molecules/FragmentDialog'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'
import FragmentInput from '@components/molecules/FragmentInput'
import { getErrorMsg, getSuccessMsg } from '@utils/mutations/index'

import type { ImageFormValues, IProps } from './types'

import {
  mutationRejected,
  mutationStarted,
  mutationSuccess,
} from '@/redux/appSlice'
import { useAppDispatch } from '@/redux/hooks'

const AddImageDialog = ({ onClose, onSubmit }: IProps) => {
  const { control, handleSubmit, setValue } = useForm<ImageFormValues>({
    defaultValues: { src: '', alt: '' },
  })
  const [status, setStatus] = useState<'initial' | 'url' | 'file'>('initial')
  const [uppy, setUppy] = useState<Uppy | null>()
  const [isFileSelected, setIsFileSelected] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const uppyInstance = new Uppy({
      id: 'image',
      restrictions: {
        maxNumberOfFiles: 1,
      },
    }).use(Transloadit, {
      params: {
        auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_KEY },
        template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
      },
      waitForEncoding: true,
    })

    setUppy(uppyInstance)
  }, [])

  const onFileUploadChange = ({ target }) => {
    setIsFileSelected(true)
    try {
      if (uppy.getFiles().length > 0) {
        uppy.removeFile(uppy.getFiles()[0].id)
      }

      const data = target.files[0]
      const { name, type } = data

      uppy.addFile({
        data,
        name,
        type,
      })
    } catch (err) {
      dispatch(mutationRejected(getErrorMsg('image', 'load')))
    }
  }

  const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(mutationStarted())
    if (uppy.getFiles().length > 0) {
      return uppy
        .upload()
        .then(result => {
          dispatch(
            mutationSuccess({ message: getSuccessMsg('image', 'uploade') }),
          )
          if (result.failed.length > 0) {
            dispatch(mutationRejected(getErrorMsg('image', 'upload')))
          } else {
            setValue(
              'src',
              result['transloadit'][0].results['convert_image_webp'][0].ssl_url,
            )
            handleSubmit(onSubmit)(e)
          }
        })
        .catch(() => dispatch(mutationRejected(getErrorMsg('image', 'upload'))))
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (status === 'file') {
      handleFileSubmit(e)
    } else {
      e.preventDefault()
      handleSubmit(onSubmit)(e)
      e.stopPropagation()
    }
  }

  const showActions = status !== 'initial'
  let content

  switch (status) {
    case 'initial':
      content = (
        <>
          <FragmentButton
            onClick={e => {
              e.preventDefault()
              setStatus('url')
            }}
          >
            URL
          </FragmentButton>
          <FragmentButton
            onClick={e => {
              e.preventDefault()
              setStatus('file')
            }}
          >
            Upload File
          </FragmentButton>
        </>
      )
      break
    case 'url':
      content = (
        <>
          <FragmentInput
            control={control}
            name="src"
            label={'Image URL'}
            rules="Required field"
          />
          <FragmentInput control={control} name="alt" label={'Alt Text'} />
        </>
      )
      break
    case 'file':
      content = (
        <>
          <input type="file" accept="image/*" onChange={onFileUploadChange} />
          <FragmentInput control={control} name="alt" label={'Alt Text'} />
        </>
      )
      break
  }

  return (
    <>
      <FragmentDialog open fullWidth maxWidth="xs">
        <FragmentDialogTitle onClose={onClose}>
          Insert Image
        </FragmentDialogTitle>
        <FragmentDialogContent fullWidth>
          <form onSubmit={handleFormSubmit} id="image-form">
            {content}
          </form>
        </FragmentDialogContent>
        {showActions && (
          <FragmentDialogActions>
            <FragmentButton onClick={onClose} variant="outlined">
              Cancel
            </FragmentButton>
            <FragmentButton
              disabled={status === 'file' && !isFileSelected}
              type="submit"
              variant="contained"
              form="image-form"
            >
              Confirm
            </FragmentButton>
          </FragmentDialogActions>
        )}
      </FragmentDialog>
    </>
  )
}

export default AddImageDialog
export type { IProps }
