import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useSession } from 'next-auth/react'

import FragmentButton from '@components/atoms/_FragmentButton'
import FragmentDialogActions from '@components/molecules/FragmentDialogActions'
import FragmentDialogContent from '@components/molecules/FragmentDialogContent'
import FragmentDialogTitle from '@components/molecules/FragmentDialogTitle'
import countries from '@data/countries.json'
import states from '@data/states.json'

import ConfirmDialog from '../ConfirmDialog'
import FragmentAutocomplete from '../FragmentAutocomplete'
import FragmentInput from '../FragmentInput'

import { StyledFragmentDialog } from './styles'
import { IProps, LeadFormValues } from './types'

import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  requiredMessage,
} from '@/utils/validations'

const emptyOption = { id: '', name: '' }
const defaultCountry = countries.find(country => country.id === 'US')

const LeadModal = ({ open, handleClose, isLoading }: IProps) => {
  const { data: session } = useSession()

  const {
    control,
    trigger,
    formState: { isDirty, isValid },
    resetField,
  } = useForm<LeadFormValues>({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      title: '',
      email: '',
      company: '',
      mobile: '',
      phone: '',
      url: '',
      city: '',
      country: defaultCountry,
      state: emptyOption,
    },
  })

  const selectedCountry = useWatch({
    control,
    name: 'country',
  })

  const selectedState = useWatch({
    control,
    name: 'state',
  })

  const isUSSelected = useMemo(
    () => selectedCountry?.id === 'US',
    [selectedCountry],
  )

  useEffect(() => {
    resetField('state')
  }, [selectedCountry])

  const [openConfirm, toggleConfirmDialog] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    trigger()
    if (!isValid) {
      e.preventDefault()
    }
  }

  const onClose = (_?, reason?) => {
    if (reason !== 'backdropClick')
      isDirty ? toggleConfirmDialog(true) : handleClose(reason)
  }

  return (
    <>
      <StyledFragmentDialog open={open} onClose={onClose}>
        <FragmentDialogTitle onClose={onClose}>
          Submit a new lead
        </FragmentDialogTitle>
        <FragmentDialogContent>
          <form
            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
            method="POST"
            id="leads-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <FragmentInput
              autoFocus
              control={control}
              name="first_name"
              label="First name"
              rules={requiredMessage('First name')}
              required
            />
            <FragmentInput
              control={control}
              name="last_name"
              label="Last name"
              rules={requiredMessage('Last name')}
              required
            />
            <FragmentInput
              control={control}
              name="title"
              label="Title"
              rules={requiredMessage('Title')}
              required
            />
            <FragmentInput
              control={control}
              name="email"
              label="Email"
              rules={{ validate: (email: string) => isValidEmail(email) }}
              required
            />
            <FragmentInput
              control={control}
              name="company"
              label="Company"
              rules={requiredMessage('Company')}
              required
            />
            <FragmentInput
              control={control}
              name="mobile"
              label="Mobile"
              required
              rules={{
                validate: (mobile: string) => isValidPhone(mobile, 'Mobile'),
              }}
            />
            <FragmentInput
              control={control}
              name="phone"
              label="Phone"
              required
              rules={{ validate: (phone: string) => isValidPhone(phone) }}
            />
            <FragmentAutocomplete
              control={control}
              name="country"
              label="Country"
              options={countries}
              rules={requiredMessage('Country')}
              required
            />
            <FragmentInput
              control={control}
              name="city"
              label="City"
              rules="City is required"
              required
            />
            <FragmentAutocomplete
              control={control}
              name="state"
              label="State"
              emptyOption={emptyOption}
              options={states}
              autocompleteProps={{
                disabled: !isUSSelected,
              }}
              rules={{
                validate: (state: string) =>
                  isUSSelected
                    ? !state
                      ? requiredMessage('State')
                      : true
                    : true,
              }}
              required={isUSSelected ? true : false}
            />
            <FragmentInput
              control={control}
              name="url"
              label="Website"
              rules={{ validate: (url: string) => isValidUrl(url) }}
              required
            />
            {process.env.NEXT_PUBLIC_ENV !== 'prod' && (
              <input type="hidden" name="debug" value="1" />
            )}

            <input
              type="hidden"
              name="debugEmail"
              value={
                process.env.NEXT_PUBLIC_ENV === 'prod'
                  ? 'christin.palmer@distillery.com'
                  : session?.user?.email
              }
            />
            <input type="hidden" name="oid" value="00D61000000YBqu" />
            <input
              type="hidden"
              name="retURL"
              value={`${window.location.origin}/leads/thankyou`}
            />
            <input
              type="hidden"
              name="country_code"
              value={selectedCountry?.id}
            />
            <input type="hidden" name="state_code" value={selectedState?.id} />
            <input
              type="hidden"
              name="00N6100000I5XNS"
              value={session?.user?.email}
            />
          </form>
        </FragmentDialogContent>
        <FragmentDialogActions>
          <FragmentButton
            type="submit"
            variant="primary"
            disabled={isLoading || !isDirty}
            form="leads-form"
          >
            Submit lead
          </FragmentButton>
        </FragmentDialogActions>
      </StyledFragmentDialog>
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          handleClose={() => toggleConfirmDialog(false)}
          handleConfirm={handleClose}
          message={
            'Your changes will be lost, are you sure you want to proceed?'
          }
          title={'Cancel operation'}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default LeadModal
export type { IProps }
