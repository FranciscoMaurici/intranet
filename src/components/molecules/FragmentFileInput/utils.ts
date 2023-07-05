import { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import Transloadit from '@uppy/transloadit'

const createUppyInstance = () => {
  const uppyInstance = new Uppy({
    id: 'pdfFiles',
    restrictions: {
      maxNumberOfFiles: 10,
    },
    autoProceed: true,
    allowMultipleUploads: true,
  }).use(Transloadit, {
    params: {
      auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_KEY },
      template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
    },
    waitForEncoding: true,
  })

  return uppyInstance
}

export const useUppyInstance = () => {
  const [uppy, setUppy] = useState<Uppy | null>()
  useEffect(() => {
    const uppyInstance = createUppyInstance()
    setUppy(uppyInstance)
    return () => uppyInstance.close()
  }, [])
  return uppy
}
