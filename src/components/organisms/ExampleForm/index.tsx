import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Head from 'next/head'

import { FragmentAutocomplete, FragmentInput } from '@components'
import FragmentDateTime from '@components/atoms/FragmentDateTime'
import FragmentText from '@components/atoms/FragmentText'

import {
  countries,
  defaultValues,
  emptyValue,
  genders,
  languages,
} from './constants'
import { Container, StyledForm } from './styles'
import { ExampleFormValues } from './types'
import { generateAddMessageHandler } from './utils'

import FragmentFileInput from '@/components/molecules/FragmentFileInput'
import { useMessages } from '@/utils/hooks/useMessages'
import { isValidEmail, isValidUrl } from '@/utils/validations'

const ExampleForm = () => {
  const { control, handleSubmit } = useForm<ExampleFormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<ExampleFormValues> = data => {
    console.warn(data)
  }

  const onError = (errors: unknown, e: unknown) => {
    console.error(errors, e)
  }

  const { addMessage } = useMessages()

  const handleAddMessage = generateAddMessageHandler(addMessage)

  return (
    <div>
      <Head>
        <title>Fragment Example</title>
      </Head>
      <Container>
        <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={1} direction="row">
              <Grid item xs>
                <FragmentInput
                  autoFocus
                  control={control}
                  name="firstName"
                  label="* First name"
                  rules="First name is required"
                />
              </Grid>
              <Grid item xs>
                <FragmentInput
                  control={control}
                  name="lastName"
                  label="* Last name"
                  rules="Last name is required"
                />
              </Grid>
            </Grid>

            <Grid item>
              <FragmentInput
                control={control}
                name="email"
                label="* Email"
                rules={{ validate: (email: string) => isValidEmail(email) }}
              />
            </Grid>

            <Grid item container spacing={1} direction="row">
              <Grid item xs>
                <FragmentAutocomplete
                  control={control}
                  name="country"
                  label="* Country"
                  options={countries}
                  rules="Required field"
                />
              </Grid>
              <Grid item xs>
                <FragmentInput
                  control={control}
                  name="someUrl"
                  label="Some URL"
                  rules={{
                    validate: (url: string) => isValidUrl(url, 'URL', true),
                  }}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={1} direction="row">
              <Grid item xs>
                <FragmentAutocomplete
                  control={control}
                  name="gender"
                  label="* Gender"
                  options={genders}
                  emptyOption={emptyValue}
                  rules="Required field"
                />
              </Grid>

              <Grid item xs>
                <FragmentAutocomplete
                  control={control}
                  name="language"
                  label="* Preferred language"
                  options={languages}
                  rules="Required field"
                />
              </Grid>
            </Grid>

            <Grid item>
              <FragmentDateTime
                views={['day', 'hours', 'minutes']}
                label="Select date and time"
                name="dateTimePicker"
                control={control}
              />
            </Grid>

            <Grid item>
              <FragmentFileInput
                control={control}
                name="fileUploads"
                defaultValue={defaultValues.fileUploads}
              />
            </Grid>

            <Grid container item justifyContent="flex-end">
              <Button variant="contained" color="secondary" type="submit">
                Send form
              </Button>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ my: 3 }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleAddMessage(1)}
                >
                  Show error message
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleAddMessage(2)}
                >
                  Show warning message
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAddMessage(3)}
                >
                  Show success message
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </StyledForm>
      </Container>
      <div>
        <FragmentText variant="headingLarge">headingLarge</FragmentText>
        <FragmentText variant="headingRegular">headingRegular</FragmentText>
        <FragmentText variant="headingSmall">headingSmall</FragmentText>
        <FragmentText variant="subHeadingRegular">
          subHeadingRegular
        </FragmentText>
        <FragmentText variant="subHeadingSmall">subHeadingSmall</FragmentText>
        <FragmentText variant="bodyRegularBold">bodyRegularBold</FragmentText>
        <FragmentText>bodyRegular</FragmentText>
        <FragmentText variant="bodySmall">bodySmall</FragmentText>
        <FragmentText variant="bodySmallBold">bodySmallBold</FragmentText>
        <FragmentText variant="bodyXSmall">bodyXSmall</FragmentText>
        <FragmentText variant="bodySmallBold">bodyXSmallBold</FragmentText>
        <FragmentText as="button" variant="bodySmallBold">
          bodyXSmallBold variant as button
        </FragmentText>
      </div>
    </div>
  )
}

export default ExampleForm
