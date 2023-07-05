import { Control, FieldValues, Path, PathValue } from 'react-hook-form'
import { FailedUppyFile, UploadedUppyFile } from '@uppy/core'

export interface IProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  defaultValue?: PathValue<T, Path<T>> | undefined
}

export interface FileListItemProps {
  file:
    | UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>
    | FailedUppyFile<Record<string, unknown>, Record<string, unknown>>
  removeFile: (file: UploadedUppyFile<unknown, unknown>) => void
}
