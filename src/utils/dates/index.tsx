import dayjs, { Dayjs } from 'dayjs'

import 'dayjs/locale/en'

export const getDateIncreasedByNDays = (date: Date, days: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export const getFormattedDateString = (
  date: Date | Dayjs = new Date(),
): string => {
  const formattedDate = dayjs(date).toDate().toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })

  return formattedDate
}

export const addSecondsToDate = (seconds: number, date: Date = new Date()) => {
  date.setSeconds(date.getSeconds() + seconds)
  return date
}

export const getTomorrowDateDayjs = () => dayjs().add(1, 'day')
