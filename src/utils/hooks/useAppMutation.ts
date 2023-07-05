import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

import {
  mutationRejected,
  mutationStarted,
  mutationSuccess,
} from '@/redux/appSlice'
import { useAppDispatch } from '@/redux/hooks'
import { IMutationKeyToTypes } from '@/types'
import { MUTATION_VALUES } from '@/utils/mutations'

/**
 * A custom hook that leverages the 'useMutation' hook from react-query, and enhances it with app-specific behavior.
 *
 * @param key - Key of the mutation, which maps to mutation configuration in MUTATION_VALUES.
 * @param options - Additional options for the mutation. This extends UseMutationOptions and adds an 'invisible' flag to toggle visibility.
 * @param queryKey - Query key to invalidate upon successful mutation.
 *
 * @returns The mutation object returned by the react-query's useMutation hook.
 */
export const useAppMutation = <MutationKey extends keyof IMutationKeyToTypes>(
  key: MutationKey,
  {
    // if invisible is set to true then the mutation won't trigger snackbar & loading overlay
    invisible,
    ...options
  }: Omit<
    UseMutationOptions<
      IMutationKeyToTypes[MutationKey]['response'],
      unknown,
      IMutationKeyToTypes[MutationKey]['request'],
      unknown
    >,
    'mutationFn'
  > & {
    invisible?: boolean
  },
  queryKey?: string,
) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  // Extracting mutation-related values for the specific mutation key.
  const { entityKey, mutationFunction, errorMsg, successMsg } =
    MUTATION_VALUES[key]

  // Handles the success state of mutation, invalidates the related query and dispatches a success action.
  const onMutationSuccess = (msg: string) => {
    queryClient.invalidateQueries([queryKey ? queryKey : entityKey])
    dispatch(mutationSuccess({ message: msg, invisible }))
  }

  // Handles the error state of mutation, dispatches a failure action.
  const onMutationError = (errorMsg: string) => {
    dispatch(mutationRejected(errorMsg))
  }

  // Return the useMutation hook with enhanced behavior.
  return useMutation<
    IMutationKeyToTypes[MutationKey]['response'],
    unknown,
    IMutationKeyToTypes[MutationKey]['request'],
    unknown
  >(
    (request: IMutationKeyToTypes[MutationKey]['request']) =>
      mutationFunction(request),
    {
      // Dispatch a start action when mutation begins.
      onMutate: () => {
        if (invisible) return
        dispatch(mutationStarted())
        return null
      },
      // Handle error.
      onError: () => onMutationError(errorMsg),
      // Handle success.
      onSuccess: () => onMutationSuccess(successMsg),
      ...options,
    },
  )
}
